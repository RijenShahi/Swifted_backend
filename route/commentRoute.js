const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Comment = require('../models/commentModel')
const Product = require('../models/product.models')
const {getFancyDate}  = require('../utils/utils')



router.post('/addComment',auth.verifyUser,async(req,res)=>{
    try{
        console.log(req.body)
        let productId = req.body['productId'];
        let comment = req.body['comment'].trim()
        let product = await Product.findOne({"_id":productId});
        if(product != null){
            let myComment = new Comment({
                "productId":productId,
                "userId":req.user._id,
                "comment":comment,
                "commentAt":new Date(),
                "fancyDate":getFancyDate(new Date())
            })

            myComment.save()
            .then((data)=>{
                return res.status(200).json({"success":true,"message":"Comment Added!!"})
            })
            .catch((err)=>{
                return res.status(404).json({"success":false,"message":err})
            })
        }
        else
        {
            return res.status(202).json({"success":false,"message":"Product Unavailable!!"})
        }
    }
    catch(err){
        return res.status(404).json({"success":false,"message":err})
    }
})


router.get('/fetchComments/:productId',async(req,res)=>{
    try{
        let product = await Product.findOne({"_id":req.params.productId});
        if(product != null)
        {
            let comments = await Comment.find({"productId":req.params.productId}).sort({"commentAt":1})
            .populate({
                "path":"userId"
            })
            if(comments.length > 0)
            {
                return res.status(200).json({"success":true,"message":`${comments.length} comments.`,"data":comments})
            }
            else
            {
                return res.status(202).json({"success":false,"message":"0 comments."})
            }
        }
        else
        {
            return res.status(202).json({"success":false,"message":"Product Unavailable!!"})
        }
      
    }
    catch(err)
    {
        return res.status(404).json({"success":false,"message":err})
    }
}) 



router.put('/updateComment',auth.verifyUser,async(req,res)=>{
    try
    {
        let commentId = req.body['commentId'];
        let comment = req.body['comment'];
        let comments = await Comment.findOne({"_id":commentId});
        if(comments != null)
        {
            Comment.updateOne({"_id":commentId},{
                $set:{
                    "comment":comment
                }
            })
            .then((result)=>{
                return res.status(200).json({"success":true,"message":"Comment Edited!!"})
            })
            .catch((err)=>{
                return res.status(404).json({"success":false,"message":err})
            })
        }
        else
        {
            return res.status(202).json({"success":false,"message":"Comment Unavailable!!"})
        }
    }
    catch(err)
    {
        return res.status(404).json({"success":false,"message":err})
    }
})


router.delete('/deleteComment',auth.verifyUser,async(req,res)=>{
    try
    {
        let commentId = req.body['commentId'];
        let comment = req.body['comment'];
        let comments = await Comment.findOne({"_id":commentId});
        if(comments != null)
        {
            Comment.deleteOne({"_id":commentId}
            )
            .then((result)=>{
                return res.status(200).json({"success":true,"message":"Comment Deleted!!"})
            })
            .catch((err)=>{
                return res.status(404).json({"success":false,"message":err})
            })
        }
        else
        {
            return res.status(202).json({"success":false,"message":"Comment Unavailable!!"})
        }
    }
    catch(err)
    {
        return res.status(404).json({"success":false,"message":err})
    }
})


module.exports = router;