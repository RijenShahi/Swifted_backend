const Cart = require("../models/cart.models");
const Product = require("../models/product.models");
const { validationResult } = require("express-validator");
const nodemon = require("nodemon");

// add the product/s to cart
module.exports.addToCart = async (req, res) => {
  try {
    const pid = req.body["productID"];
    let quantity = parseInt(req.body["quantity"]);
    let addedAt = new Date().toLocaleDateString();
    console.log("Product ID extracted.");
    const product = await Cart.findOne({
      productID: pid,
      userID: req.user._id,
    });
    if (product == null) {
      const cartData = await Cart.find({});
      const productData = await Product.findOne({ _id: pid });
      if (productData != null) {
        if (productData.productStocks > quantity) {
          let totalPrice;

          totalPrice = quantity * productData.productPrice;

          const userCart = new Cart({
            productID: pid,
            quantity: quantity,
            price: productData.productPrice,
            totalPrice: totalPrice,
            addedAt: addedAt,
            userID: req.user._id,
          });

          // quantity of product will be calculated
          const currentStock = productData.productStocks - quantity;
          productData.productStocks = currentStock;
          await productData.save();

          await userCart
            .save()
            .then((result) => {
              return res.status(200).json({
                success: true,
                message: "Product has been added to your cart.",
              });
            })
            .catch((err) => {
              return res.status(404).json({ success: true, message: err });
            });
        } else {
          // Quantity not sufficient.
          return res
            .status(202)
            .json({ success: false, message: "Quantity out of stock!" });
        }
      } else {
        return res.status(202).json({
          success: false,
          message: `This product is not available!`,
        });
      }
    } else {
      return res
        .status(202)
        .json({ success: false, message: "Product already exist in cart!" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error: "Could not add product to cart!" });
  }
};

//retrieve product/s on cart
module.exports.retrieveCart = async (req, res) => {
  let query = Cart.find({ userID: req.user._id })
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

//update product/s on cart
module.exports.updateCart = async (req, res) => {
  try {
    let pid = req.body["productID"];
    let qty = parseInt(req.body["quantity"]);
    const cartData = await Cart.findOne({
      _id: pid,
      userID: req.user._id,
    });

    if (cartData != null) {
      const productData = await Product.findOne({ _id: cartData.productID });
      if (productData != null) {
        // there is product data
        // check if stock is available
        if (productData.productStocks > 0) {
          let myStock = cartData.quantity;
          let totalPrice = qty * productData.productPrice;
          cartData.totalPrice = totalPrice;
          cartData.quantity = qty;
          const updatedItem = await cartData.save();
          // updating product stock
          const currentStock = productData.productStocks + myStock - qty;
          productData.productStocks = currentStock;
          await productData.save();
          return res
            .status(200)
            .json({ success: true, message: "Product Item Updated." });
        } else {
          // Quantity not sufficient.
          return res
            .status(202)
            .json({ success: false, message: "Quantity out of stock!" });
        }
      } else {
        return res
          .status(202)
          .json({ success: false, message: "Product unavailable!" });
      }
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Could update the cart item!" });
  }
};

//delete product/s on cart
module.exports.deleteCart = async (req, res) => {
  try {
    let cid = req.body["cid"];

    const cartData = await Cart.findOne({
      userID: req.user._id,
      _id: cid,
    }).populate({
      path: "productID",
    });
    if (cartData != null) {
      Product.updateOne(
        { _id: cartData.productID._id },
        {
          $set: {
            productStocks: cartData.productID.productStocks + cartData.quantity,
          },
        }
      )
        .then(async (result) => {
          const cartDelete = await Cart.deleteOne({ _id: cid });
          if (cartDelete != null) {
            return res.status(201).json({
              message: "Cart Item Deleted Successfully.",
              success: true,
            });
          } else {
            return res
              .status(202)
              .json({ message: "Couldn't delete Cart Item!", success: true });
          }
        })
        .catch((err) => {
          return res.status(400).json({ success: false, error: err });
        });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error: "Couldn't find Item!" });
  }
};
