const OrderService = require('../services/order.service');

class OrderController {
  async getAll(req, res) {
    try {
      const Orders = await OrderService.getAllOrders();
      res.status(200).json(Orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const Order = await OrderService.getOrderById(req.params.id);
      res.status(200).json(Order);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const Order = await OrderService.createOrder(req.body);
      res.status(201).json(Order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const Order = await OrderService.updateOrder(req.params.id, req.body);
      res.status(200).json(Order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await OrderService.deleteOrder(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new OrderController();
