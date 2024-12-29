const { Category } = require('../../models');

class CategoryRepository {
  async findAll() {
    return await Category.findAll();
  }

  async findById(id) {
    return await Category.findByPk(id);
  }

  async create(CategoryData) {
    return await Category.create(CategoryData);
  }

  async update(id, CategoryData) {
    return await Category.update(CategoryData, { where: { id } });
  }

  async delete(id) {
    return await Category.destroy({ where: { id } });
  }
}

module.exports = new CategoryRepository();
