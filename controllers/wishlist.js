const Wishlist = require("../models/wishlist.models");
const Product = require("../models/product.models");
const { validationResult } = require("express-validator");
const nodemon = require("nodemon");

// add the product/s to wishlist
module.exports.addToWishlist = async (req, res) => {
  try {
    const pid = req.body["productID"];
    let addedAt = new Date().toLocaleDateString();
    console.log("Product ID extracted.");
    const product = await Wishlist.findOne({
      productID: pid,
      userID: req.user._id,
    });
    if (product == null) {
      const wishlistData = await Wishlist.find({});
      const productData = await Product.findOne({ _id: pid });
      if (productData != null) {
        const userWishlist = new Wishlist({
          productID: pid,
          price: productData.productPrice,
          addedAt: addedAt,
          userID: req.user._id,
        });

        await userWishlist
          .save()
          .then((result) => {
            return res.status(200).json({
              success: true,
              message: "Product has been added to your wishlist.",
            });
          })
          .catch((err) => {
            return res.status(404).json({ success: true, message: err });
          });
      } else {
        return res.status(202).json({
          success: false,
          message: `This product is not available!`,
        });
      }
    } else {
      return res.status(202).json({
        success: false,
        message: "Product already exist in wishlist!",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error: "Could not add product to wishlist!" });
  }
};

//retrieve product/s on wishlist
module.exports.retrieveWishlist = async (req, res) => {
  let query = Wishlist.find({ userID: req.user._id })
    .sort({ addedDate: -1 })
    .populate({
      path: "productID",
    });
  query
    .then((data) => {
      if (data.length > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Data found", data: data });
      } else {
        return res
          .status(200)
          .json({ success: false, message: "No Data Found", data: data });
      }
    })
    .catch((err) => {
      return res.status(404).json({ success: false, message: err });
    });
};

//delete item on wishlist
module.exports.deleteWishlist = async (req, res) => {
  try {
    let wid = req.body["wid"];

    const wishlistData = await Wishlist.findOne({
      userID: req.user._id,
      _id: wid,
    });
    if (wishlistData != null) {
      const wishlistDelete = await Wishlist.deleteOne({ _id: wid });
      if (wishlistDelete != null) {
        return res.status(201).json({
          message: "Wishist Item Deleted Successfully.",
          success: true,
        });
      } else {
        return res
          .status(202)
          .json({ message: "Couldn't delete Wishlist Item!", success: true });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error: "Couldn't find Item!" });
  }
};
