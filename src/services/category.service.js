const CategoryRepository = require('../reposiroties/category.repository');

class CategoryService {
  async getAllCategorys() {
    return await CategoryRepository.findAll();
  }

  async getCategoryById(id) {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async createCategory(data) {
    return await CategoryRepository.create(data);
  }

  async updateCategory(id, data) {
    await this.getCategoryById(id); // Verifica que exista
    return await CategoryRepository.update(id, data);
  }

  async deleteCategory(id) {
    await this.getCategoryById(id); // Verifica que exista
    return await CategoryRepository.delete(id);
  }
}

module.exports = new CategoryService();
