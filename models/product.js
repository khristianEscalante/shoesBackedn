'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category,{foreignKey:'category_id', as:'category'})
      Product.hasMany(models.Order_product, {foreignKey:'product_id', as:'orders'})
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    pricing: DataTypes.NUMBER,
    category_id: DataTypes.NUMBER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};