const express = require('express');
const router = express.Router();
const UserProfile = require('../models/userProfileModel');

const nodemon = require('nodemon');

//User Registration
router.post('/register', [
],
    function (req, res) {
       
            const accFirstname = req.body.accFirstname
            const accLastname = req.body.accLastname
            const accUsername = req.body.accUsername
            const accEmail = req.body.accEmail
            const accPhone = req.body.accPhone
            const accAddress = req.body.accAddress
            const accPassword = req.body.accPassword
            const userType = req.body.userType

                const data = new UserProfile({
                    accpFirstname: accFirstname, accLastname: accLastname,
                    accUsername: accUsername, accEmail: accEmail,
                    accPhone: accPhone, accAddress: accAddress,
                    accPassword: accPassword, userType: userType
                })
                
                data.save()
            })

module.exports = router;