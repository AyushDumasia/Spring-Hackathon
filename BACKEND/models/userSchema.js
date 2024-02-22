// const { bool } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    username : {
        type : String,
        required : [true , "Please add the  Username"]
    },
    email : {
        type : String,
        required : [true , "Please add the contact email"],
        unique : [true , "Email already Register"]
    },
    phone : {
        type : String,
        required : [true , "Please add the Phone email"],
        unique : [true , "Phone Number already Register"]
    },
    isHosteler : {
        type : Boolean,
        required : true
    },
    password : {
        type : String,
        required : [true , "Password"],
    },
},
{
    timestamps  : true
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User" , userSchema);