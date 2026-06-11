const express = require("express");

const {
  createOrder,
  getOrders,
    getUserOrders,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/user/:userId", getUserOrders);

module.exports = router;