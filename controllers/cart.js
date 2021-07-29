const Cart = require("../models/cart.models");
const Product = require("../models/product.models");
const { validationResult } = require("express-validator");
const nodemon = require("nodemon");

// add the product/s to cart
module.exports.addToCart = async (req, res) => {
  try {
    const pid = req.body["productID"];
    let quantity = parseInt(req.body["quantity"]);
    let addedAt = new Date();
    console.log("Product ID extracted.");
    const product = await Cart.findOne({
      productID: pid,
      userID: req.user._id,
    });
    if (product == null) {
      Cart.find({}).then((data) => {
        Product.findOne({ _id: pid }).then((data2) => {
          if (data2 != null) {
            let totalPrice;

            totalPrice = quantity * data2.productPrice;

            const userCart = new Cart({
              productID: pid,
              quantity: quantity,
              price: data2.productPrice,
              totalPrice: totalPrice,
              addedAt: addedAt,
              userID: req.user._id,
            });
            userCart
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
            return res.status(202).json({
              success: false,
              message: `This product is not available!`,
            });
          }
        });
      });
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

//update product/s on cart
module.exports.updateCart = async (req, res) => {
  try {
    let pid = req.body["productID"];
    let qty = req.body["quantity"];
    const cartData = await Cart.findOne({
      productID: pid,
      userID: req.user._id,
    });

    if (cartData != null) {
      // newline
      const productData = await Product.findOne({ _id: pid });
      if (productData != null) {
        // there is product data
        // check if stock is available
        if (productData.productStocks > qty) {
          let totalPrice = qty * productData.productPrice;
          cartData.totalPrice = totalPrice;
          cartData.productID = pid;
          cartData.quantity = qty;
          const updatedItem = await cartData.save();
          // updating product stock
          const currentStock = productData.productStocks - qty;
          productData.productStocks = currentStock;
          await productData.save();
          return res
            .status(200)
            .json({ success: true, message: "Product Item Updated." });
        } else {
          // Quantity not sufficient.
          return res
            .status(202)
            .json({ success: false, message: "Quantity not sufficient." });
        }
      } else {
        return res
          .status(202)
          .json({ success: false, message: "Product unavailable!" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error: "Could update the cart item!" });
  }
};
