const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");

//controllers
const { order } = require("../controllers/order");

// route for ordering
Router.post("/order", auth.verifyUser, order);

module.exports = Router;
