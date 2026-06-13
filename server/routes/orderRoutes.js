const express = require("express");

const {
  createOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  protect,
  admin,
} = require(
  "../middleware/authMiddleware"
);
const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, admin, getOrders);
router.get("/user/:userId", protect, getUserOrders);
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;