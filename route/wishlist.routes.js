const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");

//controllers
const { addToWishlist, retrieveWishlist } = require("../controllers/wishlist");

// route to add the product to wishlist
Router.post("/addToWishlist", auth.verifyUser, addToWishlist);

//retrieve booked gadget/s
Router.get("/retrieve/wishlist", auth.verifyUser, retrieveWishlist);

module.exports = Router;
