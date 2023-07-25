const { Op } = require('sequelize');
const { Cart, sequelize } = require('../models');

class cartRepository {
  findAllUserCart = async (user_id) => {
    const findAllUserCart = await sequelize.query(
      `SELECT cart.cart_id, store.name as store, menu.name as menu, SUM(menu.price * cart.ea) AS price, cart.ea FROM carts cart
      INNER JOIN stores store ON store.store_id = cart.store_id
      INNER JOIN menus menu ON menu.menu_id = cart.menu_id 
      WHERE cart.user_id = ${user_id}
      GROUP BY cart.cart_id`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return findAllUserCart;
  };

  findCartPrice = async (user_id) => {
    const findOneCart = await sequelize.query(
      `SELECT SUM(price * ea) AS price FROM carts cart INNER JOIN menus menu ON cart.menu_id = menu.menu_id WHERE cart.user_id = ${user_id}`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return findOneCart;
  };

  findOneCart = async (user_id) => {
    const findOneCart = await sequelize.query(
      `SELECT DISTINCT store_id FROM carts WHERE user_id = ${user_id}`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return findOneCart;
  };

  findCartMenu = async (user_id, menu_id) => {
    const findCartMenu = await sequelize.query(
      `SELECT cart_id, menu_id, ea FROM carts WHERE user_id = ${user_id} AND menu_id = ${menu_id}`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return findCartMenu;
  };

  //cart테이블 status 업데이트
  updateCartEa = async (cart_id, ea) => {
    return await Cart.update({ ea }, { where: { cart_id } });
  };

  createCart = async (user_id, menu_id, store_id, ea) => {
    return await Cart.create({
      user_id,
      menu_id,
      store_id,
      ea,
    });
  };

  deleteCart = async (cart_id) => {
    await Cart.destroy({ where: { cart_id } });
  };
}

module.exports = cartRepository;
