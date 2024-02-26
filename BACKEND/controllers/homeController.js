const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const isLoggedIn = require('../middlewares/isLoggedIn');
let Menu = require("../models/menuSchema.js")


let getHome = async(req, res) => {
    console.log(res.locals.currUser);
    res.render("./home/home.ejs");
};

let postHome = async(req ,res)=>{
    res.render("./home/home.ejs" );
};

let subscription = (req ,res) =>{   
    res.render("./home/subscription.ejs" )
};


let menuPage = async(req ,res) =>{
    let menu = await Menu.find();
    res.render("./home/menu.ejs" , { menu : menu})
};


module.exports = { getHome , postHome , subscription , menuPage}