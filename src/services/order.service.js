const OrderRepository = require('../reposiroties/order.repository');
const Order_productRepository = require('../reposiroties/order_product.repository')

class OrderService {
  async getAllOrders() {
    return await OrderRepository.findAll();
  }

  async getOrderById(id) {
    const order = await OrderRepository.findById(id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  async createOrder(data) {
    const transaction = await sequelize.transaction(); // Inicia una transacción
    try {
      // Generar código para el pedido
      const cantidad = (await OrderRepository.findAll()).length;
      const codeOrder = `shoes-${cantidad}`;
      const order = {
        code: codeOrder,
        total: data.total,
      };

      // Crear el pedido dentro de la transacción
      const newOrder = await OrderRepository.create(order, { transaction });

      // Relacionar productos con el pedido
      const productRelations = data.products.map(product => ({
        product_id: product,
        order_id: newOrder.id,
      }));
      await Order_productRepository.bulkCreate(productRelations, { transaction });

      // Confirmar la transacción
      await transaction.commit();
      return newOrder;
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();
      throw error;
    }
  }

  async updateOrder(id, data) {
    await this.getOrderById(id); // Verifica que exista
    return await OrderRepository.update(id, data);
  }

  async deleteOrder(id) {
    await this.getOrderById(id); // Verifica que exista
    return await OrderRepository.delete(id);
  }
}

module.exports = new OrderService();



