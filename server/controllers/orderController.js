const Order = require("../models/Order");

// Create Order
const createOrder = async (req, res) => {
  try {

    const order = await Order.create(req.body);

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Orders
const getOrders = async (req, res) => {
  try {

    const orders = await Order.find();

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get orders by user
const getUserOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      userId: req.params.userId,
    });

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getUserOrders,
};