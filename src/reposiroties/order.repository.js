const { Order } = require('../../models');

class OrderRepository {
  async findAll() {
    return await Order.findAll();
  }

  async findById(id) {
    return await Order.findByPk(id);
  }

  async create(OrderData) {
    return await Order.create(OrderData);
  }

  async update(id, OrderData) {
    return await Order.update(OrderData, { where: { id } });
  }

  async delete(id) {
    return await Order.destroy({ where: { id } });
  }
}

module.exports = new OrderRepository();
