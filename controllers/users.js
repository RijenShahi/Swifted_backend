const UserProfile = require("../models/userProfile.models");
const { validationResult } = require("express-validator");
const { hashPassword } = require("../utils/utils");
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
