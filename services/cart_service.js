const CartRepository = require('../repositories/cart_repository');

class CartService {
  cartRepository = new CartRepository();

  findAllUserCart = async (user_id) => {
    const cart = await this.cartRepository.findAllUserCart(user_id);
    const price = await this.cartRepository.findCartPrice(user_id);

    return { cart, price };
  };

  createCart = async (user_id, menu_id, store_id, ea) => {
    const [store] = await this.cartRepository.findOneCart(user_id);

    if (store && store.store_id !== parseInt(store_id)) return false;

    const [menu] = await this.cartRepository.findCartMenu(user_id, menu_id);

    if (menu)
      return await this.cartRepository.updateCartEa(
        menu.cart_id,
        parseInt(ea) + menu.ea
      );

    return this.cartRepository.createCart(user_id, menu_id, store_id, ea);
  };

  updateCartEa = async (cart_id, ea) => {
    return await this.cartRepository.updateCartEa(cart_id, ea);
  };

  deleteCart = async (cart_id) => {
    return await this.cartRepository.deleteCart(cart_id);
  };
}

module.exports = CartService;
