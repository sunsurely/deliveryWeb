const express = require('express');
const router = express.Router();

const StoresController = require('../controllers/store_controller');
const storesController = new StoresController();
const {
  authorizated,
  isLoggedIn,
} = require('../middleware/userState_middleware');

const { upload } = require('../middleware/upload_middleware');

router.post('/stores', authorizated, upload.single('img_url'), storesController.createStore);
router.put('/stores/:store_id', authorizated, upload.single('img_url'), storesController.updateStore);
router.delete('/stores/:store_id', authorizated, storesController.deleteStore);
router.get('/stores', storesController.readStore);
router.get('/stores/detail', isLoggedIn, storesController.readDetailStore);
router.get('/keyword', storesController.readStoreByKeyword);

router.get('/getStoreId', authorizated, storesController.readStoreId)

router.get('/getStoreIdToPost', authorizated, storesController.readStoreByUser)

router.post(
  '/stores/:store_id/menu',
  authorizated, upload.single('img_url'),
  storesController.createMenu
);
router.put(
  '/stores/:store_id/menu/:menu_id',
  authorizated, upload.single('img_url'),
  storesController.updateMenu
);
router.delete(
  '/stores/:store_id/menu/:menu_id',
  authorizated,
  storesController.deleteMenu
);

router.get('/getStoreUpdate', authorizated, storesController.readStoreUpdate);
router.get('/getMenuUpdate/:menu_id', storesController.findOneMenu);

//메뉴 상세화면
router.get('/stores/menusDetail', storesController.findMenuDetail);

module.exports = router;
