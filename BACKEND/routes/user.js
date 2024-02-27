const express = require('express');
const router = express.Router();
// const User = require('../models/userSchema.js');
// const session = require('express-session');
// const passport = require('passport');
const asyncHandler = require('express-async-handler');
const { signUp ,logIn , logOut } = require('../controllers/userController.js');

const passport = require('passport');
const { saveRedirectUrl } = require('../middlewares/isLoggedIn.js');



router.get("/sign-up" ,asyncHandler((req ,res) =>{
    res.render("./user/signUp.ejs")
}));

router.post("/sign-up", signUp);


router.get("/log-in" ,asyncHandler( (req ,res) =>{
    res.render("./user/logIn.ejs")
}))

router.post("/log-in", saveRedirectUrl, passport.authenticate("local" , {failureRedirect : "/log-in" , failureFlash : true}), asyncHandler (async (req ,res)=>{
    req.flash("success" , "Welcome To Hostelly")
    res.redirect("res.locals.directUrl");
}));

router.get("/log-out" , logOut )

module.exports = router;

