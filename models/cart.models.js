const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: { type: Number, required: true },
  price: { type: Number },
  addedAt: { type: String },
});

const Cart = mongoose.model("AddToCart", cartSchema);
module.exports = Cart;
