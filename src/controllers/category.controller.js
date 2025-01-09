const CategoryService = require('../services/category.service');

class CategoryController {
  async getAll(req, res) {
    try {
      const Categorys = await CategoryService.getAllCategorys();
      res.status(200).json(Categorys);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const Category = await CategoryService.getCategoryById(req.params.id);
      res.status(200).json(Category);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      console.log(req.body);
      const Category = await CategoryService.createCategory(req.body);
      res.status(201).json(Category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const Category = await CategoryService.updateCategory(req.params.id, req.body);
      res.status(200).json(Category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await CategoryService.deleteCategory(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CategoryController();
