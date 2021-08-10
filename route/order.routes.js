const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");

//controllers
const { order,bill } = require("../controllers/order");

// route for ordering
Router.post("/order", auth.verifyUser, order);
Router.get('/myCartBill',auth.verifyUser,bill)

module.exports = Router;
