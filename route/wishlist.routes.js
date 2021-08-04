const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");

//controllers
const {
  addToWishlist,
  retrieveWishlist,
  deleteWishlist,
} = require("../controllers/wishlist");

// route to add the product to wishlist
Router.post("/addToWishlist", auth.verifyUser, addToWishlist);

//retrieve booked gadget/s
Router.get("/retrieve/wishlist", auth.verifyUser, retrieveWishlist);

//route to delete the wishlist item
Router.post("/deleteWishlist", auth.verifyUser, deleteWishlist);

module.exports = Router;
