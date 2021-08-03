const mongoose = require("mongoose");

//model for wishlist
const cartSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  price: { type: Number },
  addedAt: { type: String },
});

const Wishlist = mongoose.model("Wishlist", cartSchema);
module.exports = Wishlist;
