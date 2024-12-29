const { Product } = require('../../models');

class ProductRepository {
  async findAll() {
    return await Product.findAll();
  }

  async findById(id) {
    return await Product.findByPk(id);
  }

  async create(ProductData) {
    return await Product.create(ProductData);
  }

  async update(id, ProductData) {
    return await Product.update(ProductData, { where: { id } });
  }

  async delete(id) {
    return await Product.destroy({ where: { id } });
  }
}

module.exports = new ProductRepository();
