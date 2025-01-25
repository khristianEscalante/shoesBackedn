const OrderRepository = require('../reposiroties/order.repository');
const Order_productRepository = require('../reposiroties/order_product.repository')
const { sequelize } = require('../../models/index');
const order_productRepository = require('../reposiroties/order_product.repository');
const orderDto = require('../dtos/order.dto')

class OrderService {
  async getAllOrders() {
    return await OrderRepository.findAll();
  }

  async getOrderById(id) {
    const order = await OrderRepository.findById(id);
    if (!order) {
      throw new Error('Order not found');
    }
    const orders_products = await order_productRepository.findAllByOrder(id)
    return new orderDto(order, orders_products);
  }

  async createOrder(data) {
    const transaction = await sequelize.transaction(); // Inicia una transacción
    try {
      // Obtener la cantidad actual de órdenes para generar un código único
      const orderCount = await OrderRepository.findAll(); // Cuenta las órdenes existentes en la tabla
      const nextOrderNumber = orderCount.length + 1;
      const codeOrder = `shoes-${String(nextOrderNumber).padStart(3, '0')}`; // Genera el código
  
      const order = {
        code: codeOrder,
        total: data.total,
        name: data.name,
        phone: data.phone,
        address: data.address,
        paymentMethod: data.paymentMethod,
      };
  
      // Crear el pedido dentro de la transacción
      const newOrder = await OrderRepository.create(order, { transaction });
  
      // Relacionar productos con el pedido
      for (const product of data.products) {
        const productOrder = {
          product_id: product,
          order_id: newOrder.id,
        };
        await Order_productRepository.create(productOrder, { transaction });
      }
  
      // Confirmar la transacción
      await transaction.commit();
      return this.getOrderById(newOrder.id);
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



