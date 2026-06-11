const express = require("express");

const {
  createOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/user/:userId", getUserOrders);
router.put("/:id", updateOrderStatus);

module.exports = router;