const express = require('express');
const passport = require('passport');
const signupController = require('../controllers/signup_controller');
const {
  loginController,
  logoutController,
  isLogin,
} = require('../controllers/auth_controller');

const { kakaoAuth, kakaoCallback } = require('../controllers/auth_controller');
const { isLoggedIn } = require('../middleware/userState_middleware');

const router = express.Router();

router.post('/join', signupController);

router.post('/login', isLoggedIn, loginController);

router.post('/logout', isLoggedIn, logoutController);

router.post('/kakao', kakaoAuth);

router.post('/kakao/callback', kakaoCallback);

router.get('/isLogin', isLoggedIn, isLogin);

module.exports = router;
