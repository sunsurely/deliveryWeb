const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order_controller');
const orderController = new OrderController();
const { authorizated } = require('../middleware/userState_middleware');

//유저 주문내역
router.get('/userOrders', authorizated, orderController.findAllUserOrder);

//사장님 가게 주문내역
router.get(
  '/adminOrders/:store_id',
  authorizated,
  orderController.findAllAdminOrder
);

//유저가 오더 상세 조회
router.get('/orders/:order_id', authorizated, orderController.findOneOrder);

// 사장님 주문상태 업데이트
router.put(
  '/orders/:order_id',
  authorizated,
  orderController.updateOrderStatus
);

//주문하기
router.post('/orders', authorizated, orderController.createOrder);

//주문취소일 경우 유저가 확인 시 삭제
router.delete('/orders/:order_id', authorizated, orderController.deleteOrder);


//사장 오더 상세 조회
router.get('/order/:order_id', authorizated, orderController.findOneAdminOrder);

//가게에서 메뉴 선택시 이동페이지
router.get('/');


module.exports = router;
