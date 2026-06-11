const Cart = require("../models/Cart");


// Add item to cart
const addToCart = async (req, res) => {
  try {

    const cartItem = await Cart.create(req.body);

    res.status(201).json(cartItem);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// Get cart items
const getCartItems = async (req, res) => {
  try {

    const cartItems = await Cart.find();

    res.status(200).json(cartItems);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// Delete cart item
const removeCartItem = async (req, res) => {
  try {

    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Item removed",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem,
};