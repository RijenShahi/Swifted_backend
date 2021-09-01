const express = require('express');
const router = express.Router();
const Reply = require('../models/replyModel');
const auth = require('../middleware/auth');
const Comment = require('../models/commentModel');
const Product = require('../models/product.models')
 
router.post('/addReply',auth.verifyUser,async(req,res)=>{
    try
    {
        let commentId = req.body['commentId'];
        let reply = req.body['reply'].trim();
 
        //comment
        let comment = await Comment.findOne({"_id":commentId})
        if(comment != null)
        {
            let myReply = new Reply({
                "fancyDate":new Date().toLocaleDateString(),
                "replyAt":new Date(),
                "reply":reply,
                "userId":req.user._id,
                "commentId":comment._id
            })
 
            myReply.save()
            .then((data)=>{
                return res.status(200).json({"success":true,"message":"Reply Added"});
            })
            .catch((err)=>{
                console.log(err)
                return res.status(404).json({"success":false,"message":err});
            })
        }
        else
        {
            return res.status(202).json({"success":false,"message":"Comment Unavailable."});
        }
    }
    catch(err)
    {
        console.log(err)
        return res.status(404).json({"success":false,"message":err});
    }
})


 
//get replies
router.get('/fetchAllReplies/:futsalId',async(req,res)=>{
    try
    {
        
        let productId = req.params.futsalId;
        let futsal = await Product.findOne({"_id":productId});
        if(futsal != null)
        {
            let replies = await Reply.find({})
            .populate({
                "path":"commentId",
                "match":{"productId":productId}
            })
            .populate({
                "path":"userId"   
            })
            .sort({
                "replyAt":1
            })
 
            let filteredReplies = replies.filter((val)=>{return val.commentId != null});
 
            return res.status(200).json({"success":true,"message":`${filteredReplies.length} replies found.`,"data":filteredReplies});
        }
        else
        {
            return res.status(202).json({"success":false,"message":"Futsal Unavailable."})
        }
    }
    catch(err)
    {
        console.log(err)
        return res.status(404).json({"success":false,"message":err});
    }
})



 
module.exports = router;