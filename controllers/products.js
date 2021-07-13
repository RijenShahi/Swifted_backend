const Product = require("../models/product.models");
const { validationResult } = require("express-validator");
const nodemon = require("nodemon");

//insert product details - vendor
module.exports.insertProduct = async (req, res) => {
  if (req.file == undefined) {
    return res.status(202).json({ message: "Invalid File!", success: false });
  }

  const {
    productName,
    productDescription,
    productVendor,
    productCategory,
    productPrice,
    productStocks,
    productRating,
  } = req.body;
  const productImage = req.file.path;

  try {
    productData = Product({
      productName,
      productDescription,
      productVendor,
      productCategory,
      productPrice,
      productStocks,
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

//displays all the products
module.exports.displayProducts = async (req, res) => {
  try {
    const productData = await Product.find();
    return res.status(200).json({ success: true, data: productData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Product/s not found." });
  }
};

//displays only selected product
module.exports.displaySelectedProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const singleProduct = await Product.findOne({ _id: id });
    return res.status(200).json({ succtss: true, data: singleProduct });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Product not found." });
  }
};
