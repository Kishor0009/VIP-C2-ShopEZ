const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    title: String,
    description: String,
    mainImg: String,

    size: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      default: 1,
    },

    price: Number,
    discount: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);