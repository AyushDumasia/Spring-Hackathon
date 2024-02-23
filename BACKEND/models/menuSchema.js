const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const menuSchema = new Schema({
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
    }
},
{
    timestamps : true
}
)

module.exports = mongoose.model("Menu" , menuSchema);