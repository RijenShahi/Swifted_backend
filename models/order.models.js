const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  phone: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Credit/Debit", "E-Sewa/Khalti"],
    required: true,
    default: "COD",
  },
  cartItems: [
    {
      productName: String,
      productImage: String,
      price: Number,
      quantity: Number,
      totalPrice: Number,
    },
  ],
  orderTotalPrice: Number,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
