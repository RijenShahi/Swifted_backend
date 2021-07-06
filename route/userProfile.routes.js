const express = require("express");
const Router = express.Router();
const { check, validationResult } = require("express-validator");

//controllers
const { profileRegistration } = require("../controllers/users");

//route for user registration
Router.post(
  "/register",
  [
    check("firstname", "Firstname cannot be empty!").not().isEmpty(),
    check("lastname", "Lastname cannot be empty!").not().isEmpty(),
    check("username", "Username cannot be empty!").not().isEmpty(),
    check("email", "Email cannot be empty!").not().isEmpty(),
    check("email", "Email format is incorrect!").isEmail(),
    check("phone", "Phone cannot be empty!").not().isEmpty(),
    check("phone", "Phone number is invalid!").isLength({ equalTo: 10 }),
    check("password", "Password cannot be empty!").not().isEmpty(),
    check("passowrd", "Password should be longer than 6 characters.)").isLength(
      { min: 6 }
    ),
  ],
  profileRegistration
);

module.exports = Router;
