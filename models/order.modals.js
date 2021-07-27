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
    enum: ["Cash On Delivery, Credit/Debit, E-Sewa/Khalti"],
    required: true,
  },
  cartID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddToCart",
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
