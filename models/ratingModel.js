const mongoose = require('mongoose');
const {ObjectId}  = require('bson'); 
const Product = require('./product.models');
const UserProfile = require('./userProfile.models');
 

const ProductRating = mongoose.model('ProductRating',{
    "productId":{"type":ObjectId,"required":true,"ref":Product},
    "userId":{"type":ObjectId,"required":true,"ref":UserProfile},
    "rating":{"type":Number,"required":true},
    "ratedAt":{"type":String,"required":true},
    "status":{"type":String,"required":true,"enum":['Added','Updated']}
})
 
module.exports = ProductRating;