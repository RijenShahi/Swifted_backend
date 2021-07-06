const UserProfile = require("../models/userProfile.models");
const nodemon = require("nodemon");

module.exports.profileRegistration = async (req, res) => {
  try {
    const username = req.body.username;
    let user = await UserProfile.findOne({ username });

    if (user)
      return res
        .status(409)
        .json({ success: false, error: "Username is already in use." });

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const password = req.body.password;
    const userType = req.body.userType;

    const userData = new UserProfile({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      phone: phone,
      address: address,
      password: password,
      userType: userType,
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
};
