const asyncHandler = require('express-async-handler');
const passport = require('passport');
const User = require('../models/userSchema.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const generateModifiedUsername = (originalUsername) => {
    const uniqueIdentifier = Math.floor(100 + Math.random() * 900);
    return `${originalUsername}_${uniqueIdentifier}`;
};


let signUp = (asyncHandler(async (req, res) => {
    try {
        let { username, email, phone, isHosteler, password } = req.body;

        const newUser = new User({ username, email, phone, isHosteler });

        let registerUser = await User.register(newUser, password);

        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "User was Registered");
        });

        console.log(registerUser);
        req.flash("failure", "User was Registered");
        res.redirect("/home");
    } catch (e) {
        req.flash("failure", e.message);
        res.redirect("/sign-up");
    }
}));


let logOut  = ((req, res) => {
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    }); 
    res.redirect('/home');
    req.flash("failure", 'Logged out successfully');
});



module.exports = { signUp ,  logOut};