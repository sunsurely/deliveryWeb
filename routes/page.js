const express = require('express');
const AddressController = require('../controllers/address_controller');
const {
  renderMain,
  renderLoading,
  renderOrderComplete,
  renderRegistor,
  renderAdminpage,
  renderCreateMenuPage,
  renderJoin,
  renderSignIn,
  renderProfile,
  renderSelectedMenu,
  renderReview,
} = require('../controllers/page_controller');
const addressController = new AddressController();

const {
  isLoggedIn,
  authorizated,
} = require('../middleware/userState_middleware');

const router = express.Router();

//메인 접속시 렌더링되는 ' 유저가 설정한 최근주소'와 '유저가 등록한 모든 주소들 조회'
router.get('/main', isLoggedIn, addressController.findCurrentAddress);
router.get('/', renderLoading);
router.get('/orderComplete', renderOrderComplete);
router.get('/store_create', renderRegistor);
router.get('/adminpage', renderAdminpage);
router.get('/menu_create', renderCreateMenuPage);
router.get('/join', renderJoin);
router.get('/signin', renderSignIn);
router.get('/review', renderReview);
// router.get('/profile', renderProfile);

//메뉴 선택시 넘어가는 화면
router.get('/selectedMenus', authorizated, renderSelectedMenu);

module.exports = router;
