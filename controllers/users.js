const UserProfile = require("../models/userProfile.models");
const { validationResult } = require("express-validator");
const { hashPassword, verifyPassword, createToken } = require("../utils/utils");
const nodemon = require("nodemon");
const jwt = require('jsonwebtoken')
const {sendMailMessage} = require('../utils/mail')

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

//login into account
module.exports.loginProfile = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await UserProfile.findOne({ username }).select(
      "+password"
    );

    if (userData === null)
      return res.status(400).json({
        success: false,
        error:
          "User unavailable! Consider registering if you're new to this site.",
      });

    const passwordVerification = await verifyPassword(
      password,
      userData.password
    );
    if (passwordVerification) {
      const jwt = createToken(userData);
      return res.status(200).json({
        success: true,
        token: jwt,
        message: "Authentication Succeed!",
        data: userData,
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
      .json({ success: false, error: "Sorry! Couldn't login into account." });
  }
};

//start user profiling
//show currently logged in user profile details
module.exports.getProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await UserProfile.findById(id, { password: 0 });

    if (user === null) {
      return res.status(201).json({ success: false, error: "User not Found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: "No User Found" });
  }
};

//update user profile
module.exports.putUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const id = req.user.id;
      const { firstname, lastname, email, phone, address } = req.body;

      const user = await UserProfile.findById(id, { password: 0 });
      if (user === null) {
        return res
          .status(201)
          .json({ success: false, error: "User not Found" });
      }

      user.firstname = firstname;
      user.lastname = lastname;
      user.email = email;
      user.phone = phone;
      user.address = address;
      const updatedUser = await user.save();

      return res.json({ success: true, user: updatedUser });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: "No User Found" });
    }
  } else {
    console.log(errors.array());
    res.status(400).json({ success: false, error: errors.array() });
  }
};



module.exports.verifyEmail = async(req,res)=>{
  try{
    let email = req.body['email'];
    let user = await UserProfile.findOne({"email":email})
    if(user != null){
       let token = jwt.sign({"email":email},'resetKey',{expiresIn:"15m"})
        let content ={
          "heading":"Password Reset Link",
          "greeting":"Dear Sir/Madam!",
          "link":"http://localhost:3000/reset/"+token,
          "task":"Email Recovery"
        }

        sendMailMessage("Recovery",email,content)

       return res.status(200).json({"success":true,"message":"Recovery mail has been sent to your email address."})
    }
    else
    {
      return res.status(202).json({"success":false,"message":"Email Address doesnot exist."})
    }
  }
  catch(err)
  {
    return res.status(404).json({"success":false,"message":err})
  }
}



//end
