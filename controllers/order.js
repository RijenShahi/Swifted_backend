const Order = require("../models/order.models");
const Cart = require("../models/cart.models");
const { validationResult } = require("express-validator");
const nodemon = require("nodemon");

//For making order
module.exports.order = async (req, res) => {
  try {
    console.log("Ordering the cart items");
    const { firstName, lastName, email, address, phone } = req.body;
    const userID = req.user._id;

    const cartItems = await Cart.find({ userID }).populate("productID");

    // reformatting the cart items
    let orderTotalPrice = 0;
    const formattedCart = cartItems.map((item) => {
      console.log(item.productID.productName);
      const product = item.productID;
      const obj = {
        productName: product.productName,
        productImage: product.productImage,
        price: product.price,
        quantity: item.quantity,
        totalPrice: item.quantity * item.price,
      };
      orderTotalPrice += obj.totalPrice;
      return obj;
    });
    console.log(formattedCart);

    const orderData = new Order({
      firstName,
      lastName,
      email,
      address,
      phone,
      cartItems: formattedCart,
      orderTotalPrice,
    });
    console.log(orderData);

    const order = await orderData.save();
    const tst = await Cart.deleteMany({ userID });
    return res.status(200).json({
      success: true,

      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
