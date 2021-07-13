const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

//controllers
const { insertProduct, displayProducts } = require("../controllers/products");

//route for vendor who inserts products
Router.post(
  "/insert",
  upload.single("productImage"),
  auth.verifyUser,
  auth.verifyVendor,
  insertProduct
);

//route for showing the products that vendor added
Router.get(
  "/displayProducts",
  auth.verifyUser,
  auth.verifyVendor,
  displayProducts
);

module.exports = Router;
