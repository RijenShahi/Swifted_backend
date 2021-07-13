const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  productVendor: {
    type: String,
  },
  productCategory: {
    type: String,
    enum: ["Sportswear", "Traditional", "Formal", "Fashion", "Costumes"],
  },
  productPrice: {
    type: String,
  },
  productStocks: {
    type: Number,
  },
  productImage: {
    type: String,
  },
  productRating: {
    type: Number,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
  },
});

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
