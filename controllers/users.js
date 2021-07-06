const UserProfile = require("../models/userProfile.models");
const { validationResult } = require("express-validator");
const { hashPassword, verifyPassword, createToken } = require("../utils/utils");
const nodemon = require("nodemon");

//account registration
module.exports.registerProfile = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { firstname, lastname, username, email, phone, address, password } =
      req.body;

    try {
      let user = await UserProfile.findOne({ username });

      if (user)
        return res
          .status(409)
          .json({ success: false, error: "Username is already in use." });

      const userType = req.body.userType;

      const hashedPassword = await hashPassword(password);

      userData = UserProfile({
        firstname,
        lastname,
        username,
        email,
        phone,
        address,
        password: hashedPassword,
        userType,
      });

      await userData.save();
      return res
        .status(200)
        .json({ success: true, userData, message: "Registration Succeeded." });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ success: false, error: "User Registration Unsuccessful!" });
    }
  } else {
    console.log(errors.array());
    res.status(400).json({ success: false, error: errors.array() });
  }
};

//log into account
module.exports.loginProfile = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserProfile.findOne({ username }).select("+password");

    if (user === null)
      return res.status(400).json({
        success: false,
        error:
          "User unavailable! Consider registering if you're new to this site.",
      });

    const passwordVerification = await verifyPassword(password, user.password);
    if (passwordVerification) {
      const jwt = createToken(user);
      return res.status(200).json({
        success: true,
        token: jwt,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials! Please consider trying again.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Sorry! Couldn't log in into account." });
  }
};
