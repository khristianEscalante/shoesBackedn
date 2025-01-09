const { Product, Category } = require('../../models');

class ProductRepository {
  async findAll() {
    return await Product.findAll({
      include: [
        {
          model: Category, 
          as: 'category', 
          attributes: ['id','name']
        }
      ],
    });
  }

  async findById(id) {
    return await Product.findByPk(id,{
      include: [
        {
          model: Category, 
          as: 'category', 
          attributes: ['id','name']
        }
      ],
    });
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
