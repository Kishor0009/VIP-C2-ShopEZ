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
router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, admin, createProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;