const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    Created_At : {
        type : Date,
        default : () => new Date().toISOString().slice(0, 10)
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    rating : {
        type : String,
        required : true
    },
    comment : {
        type : String , 
        required : true
    }
},
{
    timestamps : true
})

module.exports = mongoose.model("Feedback" , feedbackSchema);