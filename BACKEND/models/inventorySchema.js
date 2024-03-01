const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    product : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    perPrice : {
        type : Number,
        required : true
    }
},
{
    timestamps : true
})


module.exports = mongoose.model("Inventory" ,inventorySchema );
