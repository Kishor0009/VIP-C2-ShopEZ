const express = require("express");

const {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

const {
  protect,
  admin,
} = require(
  "../middleware/authMiddleware"
);

router.get("/", protect, admin, getProducts);

router.post("/", protect, admin, createProduct);
router.get("/:id", protect, admin, getProductById);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;