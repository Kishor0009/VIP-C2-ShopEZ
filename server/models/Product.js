const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    mainImg: {
      type: String,
      required: true,
    },

    carousel: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      default: "Unisex",
    },

    sizes: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);