const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");

//controllers
const { addToCart, updateCart, deleteCart } = require("../controllers/cart");

// route to add the product to cart
Router.post("/addToCart", auth.verifyUser, addToCart);

//route to update the cart item
Router.put("/updateCart", auth.verifyUser, updateCart);

//route to delete the cart item
Router.post("/deleteCart", auth.verifyUser, deleteCart);

module.exports = Router;
