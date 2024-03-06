// const { bool } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const Menu = require('./menuSchema.js')

const userSchema = new Schema({
    email : {
        type : String,
        required : [true , "Please add email contact email"],
        unique : [true , "Email already Register"],
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Email is Invalid")
        //     }
        // }
    },
    phone : {
        type : String,
        required : [true , "Please add the Phone email"],
        unique : [true , "Phone Number already Register"],
        validate: {
            validator: function(value) {
                return value && value.length === 10;
            },
            message: 'Phone number must be exactly 10 characters long',
        },
    },
    // isHosteler : {
    //     type : Boolean,
    //     required : true
    // },
    history: [
        {
            type: Schema.Types.ObjectId,
            ref: "Menu"
        }
    ]
    
},
{
    timestamps  : true
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User" , userSchema);;