const express = require('express');

const { authorizated } = require('../middleware/userState_middleware');

const ReviewController = require('../controllers/review_controller');
const reviewController = new ReviewController();

const { upload } = require('../middleware/upload_middleware');

const router = express.Router();

//리뷰 작성
router.post(
  '/stores/:storeId/review/:orderId',
  authorizated,
  upload.single('img_url'),
  reviewController.createReview
);

//가게별 리뷰 조회
router.get('/stores/:storeId/review', reviewController.findReviews);

//리뷰 수정
router.put(
  '/stores/:storeId/review/:orderId',
  authorizated,
  upload.single('img_url'),
  reviewController.updateReview
);

//리뷰 삭제
router.delete(
  '/stores/:storeId/review/:orderId',
  authorizated,
  reviewController.deleteReview
);

//유저 리뷰 조회
router.get('/review/user', authorizated, reviewController.findMyReviews);

module.exports = router;
