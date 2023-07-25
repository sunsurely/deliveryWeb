const StoreRepository = require('../repositories/store_repository');

class StoreService {
  storeRepository = new StoreRepository();

  //가게 등록
  createStore = async (
    user_id,
    name,
    call,
    category_id,
    address,
    content,
    img_url
  ) => {
    const userStatus = await this.storeRepository.findOneStatus(user_id);
    if (userStatus.status === 'admin' && !userStatus.store_id) {
      const createStoreData = await this.storeRepository.createStore(
        user_id,
        name,
        call,
        category_id,
        address,
        content,
        img_url
      );

      return createStoreData;
    }
  };

  readStoreId = async (user_id) => {
    const userStoreId = await this.storeRepository.findOneStatus(user_id);
    if (userStoreId.status !== 'admin' && !userStoreId.store_id) {
      return false;
    }

    return userStoreId.store_id;
  };

  readStoreByUser = async (user_id) => {
    const store = await this.storeRepository.findStoreByUser(user_id);

    if (!store) return { store };

    const menu = await this.storeRepository.findStoreMenuByUser(store.store_id);

    return { store, menu };
  };

  //카테고리별 가게조회
  readStore = async (category_id) => {
    let readAllfindStoreData;
    if (parseInt(category_id) === 1) {
      readAllfindStoreData = await this.storeRepository.readStoreAll();
    } else {
      readAllfindStoreData = await this.storeRepository.readStore(category_id);
    }
    return readAllfindStoreData;
  };

  readStoreByKeyword = async (keyword) => {
    const menuStoreIds = await this.storeRepository.readStoreByKeywordInMenu(
      keyword
    );

    const storeStoreIds = await this.storeRepository.readStoreByKeywordInStore(
      keyword
    );

    const storeIdSet = new Set();

    menuStoreIds.forEach((element) => {
      storeIdSet.add(element.store_id);
    });

    storeStoreIds.forEach((element) => {
      storeIdSet.add(element.store_id);
    });

    return await this.storeRepository.readStoreById(storeIdSet);
  };

  readDetailStore = async (store_id, user_id) => {
    const readDetailStoreData = await this.storeRepository.readDetailStore(
      store_id
    );

    const data = {
      store: {
        store_id: readDetailStoreData.store_id,
        name: readDetailStoreData.name,
        img_url: readDetailStoreData.img_url,
        call: readDetailStoreData.call,
        content: readDetailStoreData.content,
        rating: readDetailStoreData.rating,

        menu: readDetailStoreData.Menus.map((menu) => ({
          name: menu.name,
          desc: menu.desc,
          price: menu.price,
          img_url: menu.img_url,
          menu_id: menu.menu_id,
        })),
        dibs: readDetailStoreData.Dibs.map((dibs) => {
          return dibs.user_id;
        }),
      },
    };

    return data;
  };

  //가게 수정
  updateStore = async (
    store_id,
    name,
    call,
    category_id,
    address,
    content,
    img_url
  ) => {
    const updateStoreData = await this.storeRepository.updateStore(
      store_id,
      name,
      call,
      category_id,
      address,
      content,
      img_url
    );

    return updateStoreData;
  };

  //가게 삭제
  deleteStore = async (store_id) => {
    const deleteStoreData = await this.storeRepository.deleteStore(store_id);

    return deleteStoreData;
  };

  //메뉴 등록
  createMenu = async (store_id, name, price, img_url, desc) => {
    const createMenuData = await this.storeRepository.createMenu(
      store_id,
      name,
      price,
      img_url,
      desc
    );

    return createMenuData;
  };

  //메뉴 상세조회
  selectedMenu = async (menu_id) => {
    const selectedMenu = await this.storeRepository.selectedMenu(menu_id);

    return selectedMenu;
  };

  //메뉴 수정
  updateMenu = async (menu_id, name, price, img_url) => {
    const updateMenuData = await this.storeRepository.updateMenu(
      menu_id,
      name,
      price,
      img_url
    );

    return updateMenuData;
  };

  //메뉴 삭제
  deleteMenu = async (menu_id) => {
    const deleteMenuData = await this.storeRepository.deleteMenu(menu_id);

    return deleteMenuData;
  };

  getStoreId = async (user_id) => {
    const userStoreId = await this.storeRepository.findOneStatus(user_id);

    return userStoreId.store_id;
  };

  findOneMenu = async (menu_id) => {
    const adminMenu = await this.storeRepository.findOneMenu(menu_id);

    return adminMenu;
  };
}

module.exports = StoreService;
