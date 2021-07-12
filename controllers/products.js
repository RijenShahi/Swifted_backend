const Product = require("../models/product.models");
const { validationResult } = require("express-validator");
const nodemon = require("nodemon");

module.exports.insertProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    productVendor,
    productCategory,
    productPrice,
    productImage,
    productRating,
  } = req.body;

  try {
    productData = Product({
      productName,
      productDescription,
      productVendor,
      productCategory,
      productPrice,
      productImage,
      productRating,
    });

    await productData.save();
    return res.status(200).json({
      success: true,
      productData,
      message: "Product added successfully.",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error: "Could not add product." });
  }
};
