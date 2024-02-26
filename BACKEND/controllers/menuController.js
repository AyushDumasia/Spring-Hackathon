// const express = require('express');
const Menu = require('../models/menuSchema');
const asyncHandler = require('express-async-handler')


//SHOW ROUTE
let getMenu = asyncHandler(async (req ,res) =>{
    console.log(req.session.user);
    let menuItems = await Menu.find();
});


//NEW  ROUTE
let createMenu = asyncHandler(async (req, res) => {
    let {time, menuItem, price } = req.body;
    const newMenu = await Menu.create({
        time : time,
        menuItem : menuItem,
        price : price
    });
    console.log("New menu created:", newMenu);
    res.status(201).redirect("/home/menu");
});

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


module.exports = {getMenu ,createMenu , updateMenu}