const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");

//controllers
const { addToCart } = require("../controllers/cart");

// route to add the product to cart
Router.post("/addToCart", auth.verifyUser, addToCart);

module.exports = Router;
