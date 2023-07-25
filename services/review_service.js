const ReviewRepository = require('../repositories/review_repository');

const { sequelize } = require('../models');
const { Transaction } = require('sequelize');

class ReviewService {
  reviewRepository = new ReviewRepository();

  //리뷰 작성
  createReview = async (orderId, storeId, userId, review, rating, imgUrl) => {
    try {
      if (!review) {
        //리뷰를 작성하지 않았을 때
        throw { status: 412, errorMessage: '리뷰를 작성해주세요.' };
      } else if (!+rating) {
        //별점을 입력하지 않았을 때
        throw { status: 412, errorMessage: '별점을 매겨주세요' };
      }

      const store = await this.reviewRepository.findStore(
        `select * from stores where store_id=${storeId}`
      );

      //리뷰를 작성할 가게가 존재하지 않을 때
      if (!store.length) {
        throw { status: 404, errorMessage: '가게가 존재하지 않습니다.' };
      }

      const order = await this.reviewRepository.findOrder(
        `select * from orders where order_id=${orderId}`
      );

      //주문내역이 존재하여야 리뷰를 작성할 수 있다.
      if (!order.length) {
        throw { status: 404, errorMessage: '주문 내역이 존재하지 않습니다.' };
      }

      if (order[0].user_id !== userId) {
        throw {
          status: 403,
          errorMessage: '리뷰를 작성할 권한이 존재하지 않습니다.',
        };
      }

      const query = `insert into reviews (order_id, store_id, user_id, review, rating, img_url)
                    values (${orderId}, ${storeId}, ${userId}, '${review}', ${rating}, '${imgUrl}')`;

      const query2 = `UPDATE stores set rating = (SELECT AVG(rating) FROM reviews WHERE store_id = ${storeId}) WHERE store_id = ${storeId}`;

      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });

      await this.reviewRepository.createReview(query, t);
      await this.reviewRepository.ratingSet(query2, t);
      return;
    } catch (error) {
      console.error(error);

      throw !error.status
        ? { status: 400, errorMessage: '이미 리뷰를 작성하였습니다.' }
        : error;
    }
  };

  //가게별 리뷰 조회
  findReviews = async (storeId) => {
    try {
      const store = await this.reviewRepository.findStore(
        `select * from stores where store_id=${storeId}`
      );

      //리뷰를 조회할 가게가 존재하지 않을 때
      if (!store.length) {
        throw { status: 404, errorMessage: '가게가 존재하지 않습니다.' };
      }

      const query = `select r.order_id, u.nickname, r.review, r.rating, r.img_url from reviews r 
                    inner join users u on r.user_id = u.user_id
                    where r.store_id = ${storeId}
                    order by r.createdAt desc`;

      const reviews = await this.reviewRepository.findReviews(query);

      return reviews;
    } catch (error) {
      console.error(error);

      throw !error.status
        ? { status: 400, errorMessage: '리뷰 조회에 실파해였습니다.' }
        : error;
    }
  };

  //리뷰 수정
  updateReview = async (userId, storeId, orderId, review, rating, imgUrl) => {
    try {
      if (!review) {
        //리뷰를 작성하지 않았을 때
        throw { status: 412, errorMessage: '리뷰를 작성해주세요.' };
      } else if (!+rating) {
        //별점을 입력하지 않았을 때
        throw { status: 412, errorMessage: '별점을 매겨주세요' };
      }

      const store = await this.reviewRepository.findStore(
        `select * from stores where store_id=${storeId}`
      );

      //리뷰를 수정할 가게가 존재하지 않을 때
      if (!store.length) {
        throw { status: 404, errorMessage: '가게가 존재하지 않습니다.' };
      }

      const order = await this.reviewRepository.findOrder(
        `select * from orders where order_id=${orderId}`
      );

      //주문내역이 존재하여야 리뷰를 수정할 수 있다.
      if (!order.length) {
        throw { status: 404, errorMessage: '주문 내역이 존재하지 않습니다.' };
      }

      const isExistReview = await this.reviewRepository.findReview(
        `select * from reviews where order_id=${orderId} and store_id=${storeId}`
      );

      //리뷰가 존재하지 않을 때
      if (!isExistReview.length) {
        throw { status: 404, errorMessage: '리뷰가 존재하지 않습니다.' };
      }

      //로그인한 userId와 리뷰의 userId가 일치하지 않을 때
      if (isExistReview[0].user_id !== userId) {
        throw {
          status: 403,
          errorMessage: '리뷰를 수정할 권한이 존재하지 않습니다.',
        };
      }

      const query = `update reviews set review='${review}', rating=${rating}, img_url='${imgUrl}'
                    where order_id = ${orderId} and user_id = ${userId}`;

      const query2 = `UPDATE stores set rating = (SELECT AVG(rating) FROM reviews WHERE store_id = ${storeId}) WHERE store_id = ${storeId}`;

      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });

      await this.reviewRepository.updateReview(query, t);

      await this.reviewRepository.ratingSet(query2, t);

      return;
    } catch (error) {
      console.error(error);

      throw !error.status
        ? { status: 400, errorMessage: '리뷰 수정에 실파해였습니다.' }
        : error;
    }
  };

  //리뷰 삭제
  deleteReview = async (userId, storeId, orderId) => {
    try {
      const store = await this.reviewRepository.findStore(
        `select * from stores where store_id=${storeId}`
      );

      //리뷰를 삭제할 가게가 존재하지 않을 때
      if (!store.length) {
        throw { status: 404, errorMessage: '가게가 존재하지 않습니다.' };
      }

      const order = await this.reviewRepository.findOrder(
        `select * from orders where order_id=${orderId}`
      );

      //주문내역이 존재하여야 리뷰를 삭제할 수 있다.
      if (!order.length) {
        throw { status: 404, errorMessage: '주문 내역이 존재하지 않습니다.' };
      }

      const isExistReview = await this.reviewRepository.findReview(
        `select * from reviews where order_id=${orderId} and store_id=${storeId}`
      );

      //리뷰가 존재하지 않을 때
      if (!isExistReview.length) {
        throw { status: 404, errorMessage: '리뷰가 존재하지 않습니다.' };
      }

      //로그인한 userId와 리뷰의 userId가 일치하지 않을 때
      if (isExistReview[0].user_id !== userId) {
        throw {
          status: 403,
          errorMessage: '리뷰를 삭제할 권한이 존재하지 않습니다.',
        };
      }
      const query = `delete from reviews where order_id = ${orderId} and user_id = ${userId};`;

      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });

      await this.reviewRepository.deleteReview(query, t);

      return;
    } catch (error) {
      console.error(error);

      throw !error.status
        ? { status: 400, errorMessage: '리뷰 삭제에 실파해였습니다.' }
        : error;
    }
  };

  //내가 작성한 리뷰 조회
  findMyReviews = async (userId) => {
    try {
      const query = `select r.store_id, r.order_id, s.name, r.review, r.rating, r.img_url from reviews r
                    inner join stores s on r.store_id = s.store_id
                    where r.user_id = ${userId}
                    order by r.createdAt desc`;

      const reviews = await this.reviewRepository.findMyReviews(query);

      return reviews;
    } catch (error) {
      console.error(error);

      throw !error.status
        ? { status: 400, errorMessage: '리뷰 조회에 실파해였습니다.' }
        : error;
    }
  };
}

module.exports = ReviewService;
