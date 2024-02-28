const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pollResultSchema = new Schema({
    Users : [{
        type : Schema.Types.ObjectId,
        ref : "User",
    },],
    items : {
        type : String, 
        ref : "Poll"
    }
},
{
    timestamps : true
}
)


module.exports = mongoose.model("PollResult" , pollResultSchema );