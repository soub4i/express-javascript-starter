const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({

    firstName: String,
    lastName: String,
    nickName: String,
    gender: String,
    email: { type : String , unique : true, required : true},
    phoneNumber: String,
    nationality: String,
    countryOfBirth: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    zipCode: String,
    country: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deletedAt: Date,

});

module.exports = mongoose.model('User', userSchema);
