const express = require("express");

const {
  addToCart,
  getCartItems,
  removeCartItem,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addToCart);

router.get("/", getCartItems);

router.delete("/:id", removeCartItem);

module.exports = router;
