const ProductService = require('../services/product.service');

class ProductController {
  async getAll(req, res) {
    try {
      const Products = await ProductService.getAllProducts();
      res.status(200).json(Products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const Product = await ProductService.getProductById(req.params.id);
      res.status(200).json(Product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const Product = await ProductService.createProduct(req.body, req.file);
      res.status(201).json(Product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const Product = await ProductService.updateProduct(req.params.id, req.body, req.file);
      res.status(200).json(Product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ProductController();
