const asyncHandler = require('express-async-handler');
let Menu = require("../models/menuSchema.js")
let User = require("../models/userSchema.js");
const { v4: uuid } = require('uuid');
const qrcode = require('qrcode');
const crypto = require('crypto');
const Feedback = require('../models/feedbackSchema.js')
const axios = require('axios');
const braintree = require('braintree');
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

let getHome = asyncHandler(async (req, res) => {
    let feedback = await Feedback.find().populate('author');
    res.render("./home/home.ejs", { feedback });
});

let postHome = asyncHandler(async (req, res) => {
    res.render("./home/home.ejs");
});

let subscription = asyncHandler((req, res) => {
    res.render("./home/subscription.ejs")
});


let menuPage = asyncHandler(async (req, res) => {
    let menu = await Menu.find();
    res.render("./home/menu.ejs", { menu: menu })
});

let historyPage = asyncHandler(async (req, res) => {
    const user = req.user;
    const populatedUser = await User.findById(user._id).populate('history');
    if (!populatedUser.history || populatedUser.history.length === 0) {
        res.render("./home/Empty.ejs");
    } else {
        const prices = populatedUser.history.map(historyItem => +historyItem.price);

        const sumOfPrices = prices.reduce((accumulator, currentPrice) => accumulator + currentPrice, 0);
        res.render("./home/history.ejs", { history: populatedUser, total: sumOfPrices });
    }
});


// const redirectToPaymentApp = async (res, amount) => {
//     try {
//       // Replace these values with your actual Paytm merchant ID and other credentials
//       const merchantId = 'your_merchant_id';
//       const orderId = uuid(); // Generate a unique order ID for each transaction
//       const callbackUrl = 'your_callback_url'; // Replace with your callback URL
  
//       // Construct the Paytm Deep Link URL
//       const paytmDeepLink = `paytm://wallet/txn?mid=${merchantId}&orderId=${orderId}&txnToken=${uuid()}&amount=${amount}&callbackUrl=${callbackUrl}`;
  
//       // Redirect the user to the Paytm app
//       res.redirect(paytmDeepLink);
//     } catch (error) {
//       console.error('Error generating Paytm Deep Link:', error);
//       // Handle the error or redirect to an error page
//       res.status(500).send('Error generating Paytm Deep Link');
//     }
//   };

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
            item.attendance.push(user);
            await user.save();
            await item.save();
            let newData = {
                username: user.username,
                foodItem : item.menuItem,
                time : item.time,
                price : item.price,
                created_at : item.Created_At
            };
            let Message = 
                `Username: ${newData.username}
                foodItem : ${newData.foodItem}
                Meal-Time : ${newData.time}
                Price : ${newData.price}
                Time : ${newData.created_at}`;
            let newQrcode = `upi://pay?pa=9054493282417@paytm&pn=ayushdumasia&cu=INR&am=${newData.price}`
            const qrCodeUrl = await qrcode.toDataURL(newQrcode);
            res.render("./home/QRtoken.ejs" , {qrCodeUrl , newData});
        }
        else{
            req.flash("success", "Already Added");
            let newData = {
                username: user.username,
                foodItem : item.menuItem,
                time : item.time,
                price : item.price,
                created_at : item.Created_At
            };
            let Message = 
                `Username: ${newData.username}
                foodItem : ${newData.foodItem}
                Time : ${newData.time}
                Price : ${newData.price}
                Time : ${newData.created_at}`;
                let newQrcode = `upi://pay?pa=9054493282417@paytm&pn=ayushdumasia&cu=INR&am=${newData.price}`
            const qrCodeUrl = await qrcode.toDataURL(newQrcode);
            // const qrCodeUrl = await qrcode.toDataURL(Message);
            res.render("./home/QRtoken.ejs" , {qrCodeUrl , newData});
        }
    } catch (error) {
        console.error(error);
        req.flash("failure", "Error adding item to history");
        res.redirect("/home/menu");
    }
});


let getFeedback = async (req, res) => {
    let feedback = await Feedback.find().populate('author');
    res.render("./feedback/form.ejs", { feedback });
}

let addFeedback = async (req, res) => {
    let user = req.user;
    let { rating, comment } = req.body;
    let result = await Feedback.create({ author: user, rating, comment });
    // console.log(result);
    req.flash("success", "feedback submit");
    res.redirect("/home/feedback")
};


let getAttendance = async (req, res) => {
    let { id } = req.params;
    let item = await Menu.findOne({ _id: id }).populate('attendance');
    const totalAttendance = item.attendance.length;
    res.render("./home/adminAttendance.ejs", { items: item, dataItem: item, total: totalAttendance });
    // res.send(item.attendance.username);
}

module.exports = { getHome, postHome, subscription, menuPage, historyPage, addItem, addFeedback, getFeedback, getAttendance }