const CartService = require('../services/cart_service');

class CartController {
  cartService = new CartService();

  findAllUserCart = async (req, res, next) => {
    try {
      const user_id = res.locals.user_id;
      const carts = await this.cartService.findAllUserCart(user_id);
      console.log(carts);
      res.render('carts', { carts: carts.cart, total: carts.price[0] });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        errorMessage: '주문 목록 조회에 실패하였습니다.',
      });
    }
  };

  findAllUserCartOrder = async (req, res, next) => {
    try {
      const user_id = res.locals.user_id;
      const carts = await this.cartService.findAllUserCart(user_id);

      console.log(carts);
      res.render('ordercheck', { carts });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        errorMessage: '주문 목록 조회에 실패하였습니다.',
      });
    }
  };

  createCart = async (req, res, next) => {
    try {
      if (!req.query) {
        return res.status(412).json({
          success: false,
          errorMessage: '데이터 형식이 올바르지 않습니다.',
        });
      }

      const menu_id = parseInt(req.query.menu_id);
      const store_id = parseInt(req.query.store_id);
      const ea = parseInt(req.query.ea);
      const user_id = res.locals.user_id;
      const cart = await this.cartService.createCart(
        user_id,
        menu_id,
        store_id,
        ea
      );

      return res.status(201).json({ cart });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        errorMessage: '장바구니 추가에 실패하였습니다.',
      });
    }
  };

  updateCartEa = async (req, res, next) => {
    try {
      if (!req.query) {
        return res.status(412).json({
          success: false,
          errorMessage: '데이터 형식이 올바르지 않습니다.',
        });
      }

      const cart_id = parseInt(req.query.cart_id);
      const ea = parseInt(req.query.ea);
      console.log(cart_id, ea);
      if (!cart_id) {
        return res.status(412).json({
          success: false,
          errorMessage: 'cart_id의 형식이 올바르지 않습니다.',
        });
      }

      if (!ea) {
        return res.status(412).json({
          success: false,
          errorMessage: 'status의 형식이 올바르지 않습니다.',
        });
      }

      const updateCartEa = await this.cartService.updateCartEa(cart_id, ea);

      if (!updateCartEa) {
        return res
          .status(400)
          .json({ message: '장바구니 수정에 실패했습니다.' });
      }
      return res.status(201).json({ message: '장바구니 수정에 성공했습니다.' });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: '장바구니 수정에 실패했습니다.' });
    }
  };

  deleteCart = async (req, res, next) => {
    try {
      if (!req.query) {
        return res.status(400).json({
          success: false,
          errorMessage: "'데이터 형식이 올바르지 않습니다.'",
        });
      }

      const { cart_id } = req.query;
      await this.cartService.deleteCart(parseInt(cart_id));

      return res.status(201).json({ message: '장바구니 삭제에 성공했습니다.' });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: '장바구니 삭제에 실패했습니다.' });
    }
  };
}

module.exports = CartController;
