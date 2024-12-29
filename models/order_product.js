'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order_product.belongsTo(models.Order, {foreignKey:'order_id', as:'order'})
      Order_product.belongsTo(models.Product, {foreignKey:'product_id', as: 'product'})
    }
  }
  Order_product.init({
    product_id: DataTypes.NUMBER,
    order_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Order_product',
  });
  return Order_product;
};