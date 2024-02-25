const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const menuSchema = new Schema({
    Created_At : {
        type : Date,
        default : () => new Date().toISOString().slice(0, 10)
    },
    time : {
        type : String,
        required : true
    },
    menuItem : {
        type : String, 
        required : true
    },
    reminder : {
        type : String
    },
    saved : {
        type : Boolean,
        default : false
    }
},
{
    timestamps : true
}
)

module.exports = mongoose.model("Menu" , menuSchema);