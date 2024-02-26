const mongoose = require('mongoose');
const Feedback = require('../../models/feedbackSchema.js');
const feedData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Hostel-System";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(err => console.log(err));

const initData = async () => {
    try {
        await Feedback.deleteMany({});
        await Feedback.insertMany(feedData.data);
        console.log("Data inserted successfully");
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        mongoose.connection.close();
        console.log("Database connection closed");
    }
};

initData();