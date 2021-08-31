const mongoose = require('mongoose');
const {ObjectId} = require('bson');
const UserProfile = require('./userProfile.models');

const RequestVendor = mongoose.model('RequestVendor',{
    "user_id":{"type":ObjectId,"required":true,"ref":UserProfile,"unique":true},
    "storeName":{"type":String,"required":true},
    "requestDate":{"type":String,"required":true},
    "reviewed":{"type":Boolean,"required":true,"default":false},
    "reviewedAt":{"type":String,"required":true,"default":new Date().toLocaleDateString()},
    "citizenShip":{"type":String,"required":true},
    "logo":{"type":String,"required":[true,'Insert Photo']},
    "address":{"type":String},
    "contact":{"type":String,"required":true}
})

module.exports = RequestVendor;