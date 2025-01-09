const { Order_product, Order, Product } = require('../../models');

class Order_productRepository {
  async findAll() {
    return await Order_product.findAll();
  }

  async findAllByOrder(orderId) {
    return await Order_product.findAll({
      where: {
        order_id: orderId, // Filtra por el ID de la orden
      },
      include: [
        {
          model: Product, // Incluye el modelo de Producto
          as: 'product', // Alias que definimos en la relación
          attributes: ['id','name', 'image', 'description'], // Los atributos que quieres de Product
        }
      ],
    });
  }

  async findById(id) {
    return await Order_product.findByPk(id);
  }

  async create(Order_productData) {
    return await Order_product.create(Order_productData);
  }

  async update(id, Order_productData) {
    return await Order_product.update(Order_productData, { where: { id } });
  }

  async delete(id) {
    return await Order_product.destroy({ where: { id } });
  }
}

module.exports = new Order_productRepository();
