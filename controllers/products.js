const Product = require("../models/product.models");
const { validationResult } = require("express-validator");
const nodemon = require("nodemon");

//insert product details - vendor
module.exports.insertProduct = async (req, res) => {
  try {
    const user = req.user;
    if (req.file == undefined) {
      return res.status(202).json({ message: "Invalid File!", success: false });
    }

    if (user.userType === "Admin" || user.userType === "Vendor") {
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

      const productData = new Product({
        productName,
        productDescription,
        productVendor,
        productCategory,
        productPrice,
        productStocks,
        productImage,
        productRating,
        userID: req.user._id,
      });

      await productData.save();
      return res.status(200).json({
        success: true,
        productData,
        message: "Product added successfully.",
      });
    } else {
      return res
        .status(500)
        .json({
          success: false,
          error: "User not compatible for adding product.",
        });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error: "Could not add product." });
  }
};

//displays all the products according to the user type
module.exports.displayProducts = async (req, res) => {
  try {
    // check if admin or vendor
    // shows all the added products to admin
    const user = req.user;
    if (user.userType === "Admin") {
      const productData = await Product.find();
      return res.status(200).json({ success: true, data: productData });
    } // shows all the products which the vendor added themselves
    else {
      const productData = await Product.find({ userID: user._id });
      return res.status(200).json({ success: true, data: productData });
    }
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
