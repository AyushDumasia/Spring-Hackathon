// const express = require('express');
const Menu = require('../models/menuSchema');
const asyncHandler = require('express-async-handler')


//SHOW ROUTE
let getMenu = asyncHandler(async (req ,res) =>{
    // console.log(req.session.user);
    let menuItems = await Menu.find();
    res.render("./home/adminHistory.ejs" , {history : menuItems})
});

let showForm = asyncHandler((req ,res) =>{
    res.render("./menu/menuInput.ejs")
});

//NEW  ROUTE
let createMenu = asyncHandler(async (req, res) => {
    let {time, menuItem, price } = req.body;
    const newMenu = await Menu.create({
        time : time,
        menuItem : menuItem,
        price : price
    });
    req.flash("success" , "Menu added successfully")
    res.status(201).redirect("/home/menu");
});

let getUpdatePage = asyncHandler(async(req , res)=>{
    let { id } = req.params;
    let menu = await Menu.findById(id);
    res.render("./home/updatePage.ejs" , {menu});
})

//UPDATE ROUTE
let updateMenu = asyncHandler( async (req,res) =>{
    let { id }  = req.params;
    let { time, menuItem, price } = req.body;
    const updateMenu = await Menu.findByIdAndUpdate(id,{
        time : time,
        menuItem: menuItem,
        price: price
    },
    {
        runValidators: true,
        new: true,
    });
    res.json(updateMenu);
});

let deleteMenu = asyncHandler(async(req ,res)=>{
    let { id } = req.params;
    console.log(id);
    let result = await Menu.findByIdAndDelete(id);
    res.redirect("/home/menu");
})

module.exports = { getMenu,createMenu ,getUpdatePage, updateMenu , showForm , deleteMenu}