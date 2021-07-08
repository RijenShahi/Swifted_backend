const jwt = require("jsonwebtoken");
const UserProfile = require("../models/userProfile.models");

//guard for all types of users
module.exports.verifyUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("Token: " + token);

  if (!token) {
    return res.status(401).json({ error: "No token was found!" });
  }

  try {
    const decoded = jwt.verify(token, "random-secret");
    const user = await UserProfile.findById(
      { _id: decoded.id },
      { password: 0 }
    );
    // add user to the request
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Token is invalid!" });
  }
};

//guard for admin
module.exports.verifyAdmin = function (req, res, next) {
  if (!req.UserProfile) {
    return res.status(401).json({ message: "Unauthorized User!" });
  } else if (req.UserProfile.userType !== "Admin") {
    return res.status(401).json({ message: "Unauthorized User!" });
  }
  next();
};

//guard for vendor
module.exports.verifyVendor = function (req, res, next) {
  if (!req.UserProfile) {
    return res.status(401).json({ message: "Unauthorized User!" });
  } else if (req.UserProfile.userType !== "Vendor") {
    return res.status(401).json({ message: "Unauthorized User!" });
  }
  next();
};

//guard for customer
module.exports.verifyCustomer = function (req, res, next) {
  if (!req.UserProfile) {
    return res.status(401).json({ message: "Unauthorized User!" });
  } else if (req.UserProfile.userType !== "Customer") {
    return res.status(401).json({ message: "Unauthorized User!" });
  }
  next();
};
