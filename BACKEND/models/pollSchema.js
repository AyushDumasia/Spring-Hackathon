const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userSchema.js');

const pollSchema = new Schema({
    time: {
        type: String,
        required: true
    },
    category_1: {
        type: String,
        required: true
    },
    category_2: {
        type: String,
        required: true
    },
    category_3: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Poll" ,pollSchema);