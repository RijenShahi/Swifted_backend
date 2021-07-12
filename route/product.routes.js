const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

//controllers
const { insertProduct } = require("../controllers/products");

//route for vendor who inserts products
Router.post(
  "/insert",
  upload.single("productImage"),
  auth.verifyUser,
  auth.verifyVendor,
  insertProduct
);

module.exports = Router;
