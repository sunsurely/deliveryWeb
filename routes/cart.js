const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cart_controller');
const cartController = new CartController();
const { authorizated } = require('../middleware/userState_middleware');

//유저 장바구니
router.get('/usercarts', authorizated, cartController.findAllUserCart);

//유저 장바구니
router.get('/orderCheck', authorizated, cartController.findAllUserCartOrder);

//유저가 장바구니 추가
router.post('/carts', authorizated, cartController.createCart);

//유저가 장바구니 개수 수정
router.put('/carts', authorizated, cartController.updateCartEa);

//유저 장바구니 삭제
router.delete('/carts', authorizated, cartController.deleteCart);

module.exports = router;
