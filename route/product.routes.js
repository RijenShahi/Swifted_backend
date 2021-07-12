const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");

//controllers
const { insertProduct } = require("../controllers/products");

//route for product insertion from vendor
Router.post("/insert", auth.verifyUser, auth.verifyVendor, insertProduct);

module.exports = Router;
