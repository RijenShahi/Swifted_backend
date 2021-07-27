const Order = require("../models/order.modals");
const Cart = require("../models/cart.models");
const { validationResult } = require("express-validator");
const nodemon = require("nodemon");

//For making order
module.exports.order = async (req, res) => {
  try {
    const { firstname, lastname, email, address, phone } = req.body;
    const cid = req.body["cartID"];

    Cart.findOne({ _id: pid }).then((data2) => {
      const orderData = new Order({
        firstname,
        lastname,
        email,
        address,
        phone,
        cartID: cid,
      });

      await orderData.save();
      return res.status(200).json({
        success: true,
        productData,
        message: "Order placed successfully.",
      });
    });
  } catch (error) {}
};
