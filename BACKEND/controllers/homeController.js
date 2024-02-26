const asyncHandler = require('express-async-handler');
let Menu = require("../models/menuSchema.js")
let User = require("../models/userSchema.js");
const qrcode = require('qrcode');
const Feedback = require('../models/feedbackSchema.js')



let getHome = asyncHandler(async(req, res) => {
    res.render("./home/home.ejs");
});

let postHome = asyncHandler(async(req ,res)=>{
    res.render("./home/home.ejs" );
});

let subscription =asyncHandler( (req ,res) =>{   
    res.render("./home/subscription.ejs" )
});


let menuPage = asyncHandler(async(req ,res) =>{
    let menu = await Menu.find();
    res.render("./home/menu.ejs" , { menu : menu})
});

let historyPage = asyncHandler(async (req, res) => {
    const user = req.user;
    const populatedUser = await User.findById(user._id).populate('history');
    
    if (!populatedUser.history || populatedUser.history.length === 0) {
        res.render("./home/Empty.ejs");
    } else {
        res.render("./home/history.ejs", { history: populatedUser });
    }
});

let addItem = asyncHandler(async (req, res) => {
    try {
        let { id } = req.params;
        let item = await Menu.findOne({ _id: id });
        if(!item){
            req.flash("failure" , "Menu is not Upload")
            return res.redirect("/home/history");
        }
        const user = req.user;

        const preHistory = user.history.find(historyItem => historyItem._id.equals(item._id));
        
        if (!preHistory) {
            user.history.push(item);
            // let newToken = uuid.v4();
            await user.save();
            let newData = {
                username: user.username,
                isHosteler: user.isHosteler,
                foodItem : item.menuItem,
                time : item.time,
                price : item.price,
                created_at : item.Created_At
            };
            let Message = 
                `Username: ${newData.username}
                Hostel Student: ${newData.isHosteler}
                foodItem : ${newData.foodItem}
                Meal-Time : ${newData.time}
                Price : ${newData.price}
                Time : ${newData.created_at}`;
            const qrCodeUrl = await qrcode.toDataURL(Message);
            res.render("./home/QRtoken.ejs" , {qrCodeUrl});
        }
        else{
            req.flash("success", "Already Added");
            let newData = {
                username: user.username,
                isHosteler: user.isHosteler,
                foodItem : item.menuItem,
                time : item.time,
                price : item.price,
                created_at : item.Created_At
            };
            let Message = 
                `Username: ${newData.username}
                Hostel Student: ${newData.isHosteler}
                foodItem : ${newData.foodItem}
                Time : ${newData.time}
                Price : ${newData.price}
                Time : ${newData.created_at}`;
            const qrCodeUrl = await qrcode.toDataURL(Message);
            res.render("./home/QRtoken.ejs" , {qrCodeUrl});
        }
    } catch (error) {
        console.error(error);
        req.flash("failure", "Error adding item to history");
        res.redirect("/home/menu");
    }
});

let getFeedback = async(req , res)=>{
    let feedback = await Feedback.find().populate('author');
    res.render("./feedback/form.ejs" , {feedback});
}

let addFeedback = async(req , res) =>{
    let user = req.user;
    let { rating , comment } = req.body;
    let result = await Feedback.create({author : user ,rating , comment});
    // console.log(result);
    req.flash("success" , "feedback submit");
    res.redirect("/home/feedback")
};

module.exports = { getHome , postHome , subscription , menuPage , historyPage , addItem , addFeedback , getFeedback}