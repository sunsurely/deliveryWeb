const express = require('express');
const router = express.Router();

const AddressController = require('../controllers/address_controller');
const addressController = new AddressController();
const { authorizated } = require('../middleware/userState_middleware');

// 유저 주소 전체
router.get('/addresses', authorizated, addressController.findUserAddress);

// 유저 마지막 사용 주소
router.get('/addressOne', authorizated, addressController.findUserAddressOne);

// 유저 주소 생성
router.post('/addresses', authorizated, addressController.createAddress);

// 유저 마지막 사용 주소 변경
router.put(
  '/currentAddresses/:address_id',
  authorizated,
  addressController.updateIsCurren
);

//유저 등록주소 삭제
router.delete(
  '/addresses/:address_id',
  authorizated,
  addressController.deleteAddress
);

module.exports = router;
