const mongoose = require('mongoose');
const {ObjectId} = require('bson');
const Product = require('./product.models');
const UserProfile = require('./userProfile.models');



const Comment = mongoose.model('Comment',{
    "productId":{"type":ObjectId,"required":true,"ref":Product},
    "userId":{"type":ObjectId,"required":true,"ref":UserProfile},
    "comment":{"type":String,"required":true},
    "commentAt":{"type":Date,"required":true},
    "fancyDate":{"type":String,"required":true}
})

module.exports = Comment;