const express = require("express");
const Router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

//controllers
const {
  registerProfile,
  loginProfile,
  getProfile,
  putUpdateProfile,
  verifyEmail,
  resetPassword
} = require("../controllers/users");

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
    check("phone", "Phone number is invalid!").isLength({ min: 10, max: 10 }),
    check("address", "Address cannot be empty!").not().isEmpty(),
    check("password", "Password cannot be empty!").not().isEmpty(),
    check("password", "Password should be between 6-16 characters.)").isLength({
      min: 6,
      max: 16,
    }),
  ],
  registerProfile
);

//route for user login
Router.post("/login", loginProfile);

//start user profile
//show currently logged in user profile details
Router.get("/currentProfile", auth.verifyUser, getProfile);

//update user profile
Router.put(
  "/updateProfile",
  [
    check("firstname", "Firstname cannot be empty!").not().isEmpty(),
    check("lastname", "Lastname cannot be empty!").not().isEmpty(),
    check("email", "Email cannot be empty!").not().isEmpty(),
    check("email", "Email format is incorrect!").isEmail(),
    check("phone", "Phone cannot be empty!").not().isEmpty(),
    check("phone", "Phone number is invalid!").isLength({ min: 10, max: 10 }),
    check("address", "Address cannot be empty!").not().isEmpty(),
  ],
  auth.verifyUser,
  putUpdateProfile
);


Router.post('/verifyEmail',verifyEmail)
Router.post('/reset/Password',
[
    check('newPassword','Please provide your new password.').not().isEmpty(),
    check('confirmPassword',"Re-Enter your pasword.").not().isEmpty(),
    check('newPassword','Password should lie under the range of 8-13').isLength({"min":8,"max":13})
],resetPassword)

//end user profile

module.exports = Router;
