const mongoose = require('mongoose');
const {ObjectId} = require('bson');
const Comment = require('./commentModel');
const User = require('./userProfile.models');
 
const Reply = mongoose.model('Reply',{
    "commentId":{"type":ObjectId,'required':true,"ref":Comment},
    "userId":{"type":ObjectId,"required":true,"ref":User},
    "reply":{"type":String,"required":true},
    "replyAt":{"type":Date,"required":true},
    "fancyDate":{"type":String,"required":true}
})
 
module.exports = Reply;