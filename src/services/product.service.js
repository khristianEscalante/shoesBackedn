const ProductRepository = require('../reposiroties/product.repository');

class ProductService {
  async getAllProducts() {
    return await ProductRepository.findAll();
  }

  async getProductById(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async createProduct(data, image) {
    const productData = {
      ...data,
      image: image.path,
    };
    return await ProductRepository.create(productData);
  }

  async updateProduct(id, data, image) {
    await this.getProductById(id);
    const updates = { ...data };
    if (image) {
      updates.image = image.path;
    }
    return await ProductRepository.update(id, updates);
  }

  async deleteProduct(id) {
    await this.getProductById(id); 
    return await ProductRepository.delete(id);
  }
}

module.exports = new ProductService();
