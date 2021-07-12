const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
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
  productImage: {
    type: String,
  },
  productRating: {
    type: Number,
  },
});

module.exports = Product;
