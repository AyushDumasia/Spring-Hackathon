const mongoose = require('mongoose');
const menuData = require("./data.js");
const Menu = require('../../models/menuSchema.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/Hostel-System";
async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then(()=>{
        console.log("success");
    })
    .catch(err => console.log(err));


const initDB = async () =>{
    await Menu.deleteMany({});
    // initData.data = initData.data.map((obj) =>({...obj , owner : "65d04e845845bbb645c4dc8f"}));
    await Menu.insertMany(menuData.Data);
    console.log("data insert");
}
    
initDB();