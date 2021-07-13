const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

//controllers
const {
  insertProduct,
  displayProducts,
  displaySelectedProduct,
} = require("../controllers/products");

//route for vendor who inserts products
Router.post(
  "/insert",
  upload.single("productImage"),
  auth.verifyUser,
  insertProduct
);

//route for showing the products according to the userType
Router.get("/displayProducts", auth.verifyUser, displayProducts);

//route for displaying only selected product
Router.get("/selectedProduct/:id", auth.verifyUser, displaySelectedProduct);

module.exports = Router;
