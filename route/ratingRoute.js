const express = require('express');
const router = express.Router();
const ProductRating = require('../models/ratingModel');
const auth = require('../middleware/auth');
const Product = require('../models/product.models');
const {getFormattedToday,mapToRating} = require('../utils/utils')
 

router.post('/rateAProduct',auth.verifyUser,async(req,res)=>{
   try{
      let productId = req.body['productId']
      let rating = parseInt(req.body['rating'])
      let product = await Product.findOne({"_id":productId});
      if(product != null)
      {
         let myRating = await ProductRating.findOne({"productId":productId,"userId":req.user._id});
         if(myRating != null)
         {
        ProductRating.updateOne({"_id":myRating._id},{
                  $set:{"rating":rating,"status":"Updated"}
            })
            .then(async (result)=>{
        let mergeRate = await mapToRating(req,res,productId);
                return res.status(200).json({"success":true,"message":"Thank you for your Rating:)"})
             })
            .catch((err)=>{
                console.log(err)
               return res.status(404).json({"success":false,"message":err});
            })
         }
         else
         {
            const rateProduct = new ProductRating({
                                    "productId":productId,
                                    "userId":req.user._id,
                                    "rating":rating,
                                    "ratedAt":getFormattedToday(new Date()),
                                    "status":"Added"
                                 });
           rateProduct.save()
           .then(async (data)=>{
               let mergeRate = await mapToRating(req,res,data.productId);
               return res.status(200).json({"success":true,"message":"Thank you for your Rating:)"})
           })
           .catch((err)=>{
              return res.status(404).json({"success":false,"message":err})
           }) 
         }
      }
      else
      {
        return res.status(202).json({"success":false,"message":"Product Unavailable."})
      }
  }
  catch(err)
  {
     return res.status(404).json({"success":false,"message":err});
  }
})
 

router.get('/getMyRating/:productId',auth.verifyUser,async(req,res)=>{
    try
    {
       let myRating = await ProductRating.findOne({"productId":req.params.productId,"userId":req.user._id});
       if(myRating != null)
       {
          return res.status(200).json({"success":true,"message":"Found","data":myRating})
       } 
       else
       {
     return res.status(202).json({"success":false,"message":"Not Rated"}) 
       }
    }
    catch(err)
    {
       return res.status(404).json({"success":false,"message":err});
    }
})
 
router.delete('/removeRating/:productId',auth.verifyUser,async(req,res)=>{
  try
    {
       let myRating = await ProductRating.findOne({"productId":req.params.productId,"userId":req.user._id});
       if(myRating != null)
       {
           mapToRating(req,res,req.params.productId)
          ProductRating.deleteOne({"_id":myRating._id})
          .then((result)=>{
        return res.status(200).json({"success":true,"message":"Unrated!!"})
          })
          .catch((err)=>{
          return res.status(404).json({"success":false,"message":err});
          }) 
       } 
       else
       {
     return res.status(202).json({"success":false,"message":"Unable to unrate."}) 
       }
    }
    catch(err)
    {
       return res.status(404).json({"success":false,"message":err});
    }
})
 
 
module.exports = router;