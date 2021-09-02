const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Product = require('../models/product.models');
const ProductRating = require('../models/ratingModel')


const month =["January", "February", "March", "April","May","June","July","August","September","October","November","December"]
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) reject(err);

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    "random-secret"
  );
};


const digitizer = (n)=>{
  let num = n;
  if(num < 10)
  {
    num ="0"+num
  }
  return num;
}


const getFormattedToday = (date)=>{
  return `${date.getFullYear()}-${digitizer(date.getMonth()+1)}-${digitizer(date.getDate())}`
}


 
const mapToRating = async (req,res,productId)=>{
  try{
     let ratings = await ProductRating.find({"productId":productId});
     let rating = ratings.map((val)=>{return val.rating});
     let average = 0;
     if(rating.length > 0)
     {
        average = rating.reduce((acc,i)=>{return acc+i});
     }
     let averaging = parseInt(average / ratings.length);
     if(!isFinite(averaging))
     {
        averaging = 0;
     } 
 
     Product.updateOne({"_id":productId},{$set:{"productRating":averaging}})
     .then((result)=>{})
     .catch((err)=>{
       console.log(err)
     })
 }
 catch(err)
 {
     console.log(err);
 } 
}


const verifyToken = (token, tokenKey) => {
  return new Promise((resolve, reject) => {
      jwt.verify(token, tokenKey, (err, decoded) => {
          err ? resolve("Token Expired!!") : resolve(decoded)
      })
  })
}


const getFancyDate = (date)=>{
  return `${date.getDate()} ${month[date.getMonth()]},${date.getFullYear()}`
}


const formatTime = (n)=>{
  let num = n;
  if(num < 10)
  {
    num = "0"+n
  }
  return num

}

module.exports = {
  hashPassword,
  verifyPassword,
  createToken,
  getFormattedToday,
  mapToRating,
  getFancyDate,
  formatTime,
  verifyToken
}
