const { sequelize } = require('../models');

class ReviewRepository {
  //가게 존재여부 확인
  findStore = async (query) => {
    try {
      const store = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      return store;
    } catch (error) {
      throw error;
    }
  };

  //주문 내역 존재여부 확인
  findOrder = async (query) => {
    try {
      const order = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      return order;
    } catch (error) {
      throw error;
    }
  };

  //리뷰 조회
  findReview = async (query) => {
    try {
      const review = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      return review;
    } catch (error) {
      throw error;
    }
  };

  //리뷰 작성
  createReview = async (query, t) => {
    try {
      await sequelize.query(query, {
        type: sequelize.QueryTypes.INSERT,
        transaction: t,
      });

      await t.commit();

      return;
    } catch (error) {
      await t.rollback();

      throw error;
    }
  };

  ratingSet = async (query2, t) => {
    try {
      await sequelize.query(query2, {
        type: sequelize.QueryTypes.UPDATE,
      });

      return;
    } catch (error) {
      throw error;
    }
  };

  //가게별 리뷰 조회
  findReviews = async (query) => {
    try {
      const reviews = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      return reviews;
    } catch (error) {
      throw error;
    }
  };

  //리뷰 수정
  updateReview = async (query, t) => {
    try {
      await sequelize.query(query, {
        type: sequelize.QueryTypes.UPDATE,
        transaction: t,
      });

      await t.commit();

      return;
    } catch (error) {
      await t.rollback();

      throw error;
    }
  };

  //리뷰 삭제
  deleteReview = async (query, t) => {
    try {
      await sequelize.query(query, {
        type: sequelize.QueryTypes.DELETE,
        transaction: t,
      });

      await t.commit();

      return;
    } catch (error) {
      await t.rollback();

      throw error;
    }
  };

  //내가 작성한 리뷰 조회
  findMyReviews = async (query) => {
    try {
      const reviews = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      return reviews;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = ReviewRepository;
