const express =require('express');
const router = express.Router();
const RequestVendor = require('../models/requestVendor')
const UserProfile = require('../models/userProfile.models')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const {formatTime} = require('../utils/utils')

router.post('/beAVendor',upload.fields([{"name":"citizenShip",maxCount:1},{"name":"logo",maxCount:1}]),auth.verifyUser,(req,res)=>{
    try
    {
        if(req.files == undefined)
        {
            return res.status(202).json({"success":false,"message":"Inappropriate file format."})
        }
        if(req.user.userType != "Customer")
        {
            return res.status(202).json({"success":false,"message":"Only Customer can become a vendor."})
        }
        else
        {
            let storeName = req.body['storeName'];
            let logo = req.files.logo[0].path;
            let citizenShip = req.files.citizenShip[0].path;
            let currentAddress = req.body['address'];
            let contact = req.body['contact'];
            let today = new Date();
            let requestDate = `${today.getFullYear()}-${formatTime(today.getMonth()+1)}-${formatTime(today.getDate())}`;
            const vendorObj = new RequestVendor({"user_id":req.user._id,"storeName":storeName,"requestDate":requestDate,"citizenShip":citizenShip,"logo":logo,"address":currentAddress,"contact":contact});
            vendorObj.save().then((data)=>{
                return res.status(200).json({"success":true,"message":"Request successful"})
            }).catch((err)=>{
                console.log(err);
                return res.status(401).json({"success":false,"message":err})
        })
        }
        
    }
   catch(err)
   {
       console.log(err)
    return res.status(401).json({"success":false,"message":err})
   }
})


router.get("/show/request",auth.verifyUser,auth.verifyAdmin,(req,res)=>{
    let query = RequestVendor.find({"reviewed":false}).populate({
        path:"user_id"
    });
    query.then((data)=>{
        if(data.length>0)
        {
            return res.status(200).json({"success":true,"data":data,"message":`${data.length} requests found!!`});
        }
        else
        {
            return res.status(202).json({"success":false,"message":"There is no data!!","data":data});
        }
    })
    .catch((err)=>{
        return res.status(404).json({"success":false,"message":err});
    })
})

router.post("/update/request",auth.verifyUser,auth.verifyAdmin,(req,res)=>{
    let id = req.body['req_id'];
    let requestAnswer = req.body['answer']; //Reject or Approve
    let query = RequestVendor.findOne({"_id":id});
    query.then((data)=>{
        if(data!=null)
        {
           
            let query2 = RequestVendor.updateOne({"_id":id},{$set:{"reviewed":true,"reviewedAt":new Date().toLocaleDateString()}});
            query2.then((result)=>{
                if(requestAnswer == "Accept")
                {
                    
                    UserProfile.findOne({"_id":data.user_id}).then((user)=>{
                        if(user!=null)
                        {
                            UserProfile.updateOne({"_id":data.user_id},{$set:{"userType":"Vendor"}}).then((result)=>{

                            }).catch((err)=>{
                                return res.status(404).json({"success":false,"message":err});
                            })
                        }
                        else
                        {
                           console.log("User not found");
                        }
                    })
                }
                else
                {
                    RequestVendor.deleteOne({"_id":id}).then((result)=>{}).catch((err)=>{console.log(err)})
                }
                return res.status(200).json({"success":true,"message":"Updated"});
            }).catch((err)=>{
                return res.status(404).json({"success":false,"message":err});
            })

            
        }
        else
        {
            return res.status(202).json({"success":false,"message":"Invalid request."})
        }
    });
})





module.exports = router;