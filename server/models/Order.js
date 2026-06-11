const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    title: String,
    description: String,
    image: String,

    quantity: Number,
    size: String,

    price: Number,
    discount: Number,

    paymentMethod: {
      type: String,
      default: "COD",
    },

    status: {
      type: String,
      default: "Placed",
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);