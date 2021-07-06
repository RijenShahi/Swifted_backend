const mongoose = require('mongoose');

const UserProfile = mongoose.model('UserProfile', {
    accFirstname: {
        type: String
    },
    accLastname: {
        type: String
    },
    accUsername: {
        type: String
    },
    accEmail: {
        type: String
    },
    accPhone: {
        type: String
    },
    accAddress: {
        type: String,
    },
    accPassword: {
        type: String
    }    ,
    userType: {
        type: String,
        enum: ['Admin', 'Vendor', 'Customer']
    }
})

module.exports = UserProfile