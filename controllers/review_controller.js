const ReviewService = require('../services/review_service');

class ReviewController {
  reviewService = new ReviewService();

  //리뷰 작성
  createReview = async (req, res) => {
    const userId = res.locals.user_id;
    const { storeId, orderId } = req.params;
    const { review, rating } = req.body;
    let imgUrl;

    if (!req.file) {
      imgUrl = null;
    } else {
      imgUrl = req.file.filename;
    }

    await this.reviewService
      .createReview(orderId, storeId, userId, review, rating, imgUrl)
      .then(() => {
        return res.status(200).json({ message: '리뷰가 등록되었습니다.' });
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ errorMessage: error.errorMessage });
      });
  };

  //가게별 리뷰 조회
  findReviews = async (req, res) => {
    const { storeId } = req.params;

    await this.reviewService
      .findReviews(storeId)
      .then((reviews) => {
        // return res.status(200).json({ reviews });
        console.log(reviews);
        res.render('store_reviews', { reviews });
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ errorMessage: error.errorMessage });
      });
  };

  //리뷰 수정
  updateReview = async (req, res) => {
    const userId = res.locals.user_id;
    const { storeId, orderId } = req.params;
    const { review, rating } = req.body;
    let imgUrl;

    if (!req.file) {
      imgUrl = null;
    } else {
      imgUrl = req.file.filename;
    }

    await this.reviewService
      .updateReview(userId, storeId, orderId, review, rating, imgUrl)
      .then(() => {
        return res.status(200).json({ message: '리뷰가 수정되었습니다' });
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ errorMessage: error.errorMessage });
      });
  };

  //리뷰 삭제
  deleteReview = async (req, res) => {
    const userId = res.locals.user_id;
    const { storeId, orderId } = req.params;

    await this.reviewService
      .deleteReview(userId, storeId, orderId)
      .then(() => {
        return res.status(200).json({ message: '리뷰가 삭제되었습니다' });
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ errorMessage: error.errorMessage });
      });
  };

  //유저 리뷰 조회
  findMyReviews = async (req, res) => {
    const userId = res.locals.user_id;

    await this.reviewService
      .findMyReviews(userId)
      .then((reviews) => {
        // return res.status(200).json({ reviews });
        res.render('my_reviews', { reviews });
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ errorMessage: error.errorMessage });
      });
  };
}

module.exports = ReviewController;
