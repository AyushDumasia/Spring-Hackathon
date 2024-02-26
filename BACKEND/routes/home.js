const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const isLoggedIn = require('../middlewares/isLoggedIn');
let Menu = require("../models/menuSchema.js");
let User = require("../models/userSchema.js");
const qrcode = require('qrcode');
const uuid = require('uuid')
const { getHome, postHome, subscription, menuPage } = require('../controllers/homeController.js');


router.get("/", getHome);

router.post("/" , postHome)

router.get("/subscription" ,  subscription)

router.get("/menu" , menuPage)


router.get("/history", isLoggedIn, asyncHandler(async (req, res) => {
    const user = req.user;
    const populatedUser = await User.findById(user._id).populate('history');
    res.render("./home/history.ejs" , {history : populatedUser})
}));


router.patch("/menu/:id", isLoggedIn, asyncHandler(async (req, res) => {
    try {
        let { id } = req.params;
        let item = await Menu.findOne({ _id: id });

        const user = req.user;

        const preHistory = user.history.find(historyItem => historyItem._id.equals(item._id));

        if (!preHistory) {
            user.history.push(item);
            await user.save();
            console.log(`Item ${item.menuItem} added to user's history.`);
            let newToken = uuid.v4();
            let newData = {
                token: newToken,
                username: user.username,
                isHosteler: user.isHosteler,
                foodItem : item.menuItem,
                time : item.time,
                price : item.price
            };
            let Message = 
                `Token: ${newData.token}
                Username: ${newData.username}
                Hostel Student: ${newData.isHosteler}
                foodItem : ${newData.foodItem}
                Time : ${newData.time}
                Price : ${newData.price}`;
            const qrCodeUrl = await qrcode.toDataURL(Message);
            res.render("./home/QRtoken.ejs" , {qrCodeUrl});
        } else {
            req.flash("success", "Already Added");
        }

        res.redirect("/home/menu");
    } catch (error) {
        console.error(error);
        req.flash("failure", "Error adding item to history");
        res.redirect("/home/menu");
    }
}));

module.exports = router;