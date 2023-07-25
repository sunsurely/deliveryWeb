const OrderRepository = require('../repositories/order_repository');

class OrderService {
  orderRepository = new OrderRepository();

  findAllUserOrder = async (user_id) => {
    return await this.orderRepository.findAllUserOrder(user_id);
  };

  findAllAdminOrder = async (store_id) => {
    return await this.orderRepository.findAllAdminOrder(store_id);
  };

  findOneOrder = async (order_id) => {
    const order = await this.orderRepository.findOneOrder(order_id);
    const menus = await this.orderRepository.findOneOrderMenu(order_id);
    return { order, menus };
  };

  updateOrderStatus = async (order_id, status, user_id) => {
    return await this.orderRepository.updateOrderStatus(
      order_id,
      status,
      user_id
    );
  };

  createOrder = async (user_id, address_id, store_id, price, request) => {
    return await this.orderRepository.createOrder(
      user_id,
      address_id,
      store_id,
      price,
      request
    );
  };

  deleteOrder = async (order_id) => {
    return await this.orderRepository.deleteOrder(order_id);
  };
}

module.exports = OrderService;
