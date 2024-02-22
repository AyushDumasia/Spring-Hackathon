const express = require('express');
const Menu = require('../models/menuSchema');
const asyncHandler = require('express-async-handler')


//SHOW ROUTE
let getMenu = asyncHandler(async (req ,res) =>{
    let menuItems = await Menu.find();
    res.json(menuItems);
});


//NEW  ROUTE
let createMenu = asyncHandler(async (req, res) => {
    let { menuItem, reminder } = req.body;
    const newMenu = await Menu.create({
        menuItem: menuItem,
        reminder: reminder
    });
    console.log("New menu created:", newMenu);
    res.status(201).json(newMenu);
});

//UPDATE ROUTE
let updateMenu = asyncHandler( async (req,res) =>{
    let { id }  = req.params;
    let { menuItem, reminder } = req.body;
    const updateMenu = await Menu.findByIdAndUpdate(id,{
        menuItem: menuItem,
        reminder: reminder
    },
    {
        runValidators: true,
        new: true,
    });
    res.json(updateMenu);
});


module.exports = {getMenu ,createMenu , updateMenu}