const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const isLoggedIn = require('../middlewares/isLoggedIn');
let Menu = require("../models/menuSchema.js")


router.get("/", async(req, res) => {
    res.render("./home/home.ejs", { user: req.session.user || {}  });
});


router.get("/subscription" , (req ,res) =>{
    res.render("./home/subscription.ejs" , { user: req.session.user || {} })
})

router.get("/menu" , async(req ,res) =>{
    let menu = await Menu.find();
    res.render("./home/menu.ejs" , { user: req.session.user || {} , menu : menu})
})

module.exports = router;