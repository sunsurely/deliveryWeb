const express = require('express');

const { authorizated } = require('../middleware/userState_middleware');

const UserController = require('../controllers/user_controller');
const userController = new UserController();

const router = express.Router();

//유저 정보 조회
router.get('/user', authorizated, userController.findUser);

//유저 정보 조회
router.get('/userPoint', authorizated, userController.findUserForOrder);

//유저 정보 수정
router.put('/user/put', authorizated, userController.updateUser);

//유저 탈퇴
router.delete('/user/delete', authorizated, userController.deleteUser);

module.exports = router;
