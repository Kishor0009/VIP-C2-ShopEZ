const express = require("express");

const {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

module.exports = router;