const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userSchema');

const menuSchema = new Schema({
    Created_At : {
        type : Date,
        default : () => new Date()
    },
    time : {
        type : String,
        required : true
    },
    menuItem : {
        type : String, 
        required : true
    },
    price : {
        type : String,
        required : true
    },
    attendance : [
        {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    ]

},
{
    timestamps : true
}
)

module.exports = mongoose.model("Menu" , menuSchema);