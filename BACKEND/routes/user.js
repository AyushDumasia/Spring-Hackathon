const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { signUp ,logIn , logOut } = require('../controllers/userController.js');
const passport = require('passport');
const  saveRedirectUrl  = require('../middlewares/isLoggedIn.js');



router.get("/sign-up" ,asyncHandler((req ,res) =>{
    res.render("./user/signUp.ejs")
}));

router.post("/sign-up", signUp);


router.get("/log-in" ,asyncHandler( (req ,res) =>{
    res.render("./user/logIn.ejs")
}))

// Login route/controller
router.post("/log-in", passport.authenticate("local", { failureRedirect: "/log-in", failureFlash: true }),
    asyncHandler(async (req, res) => {
        req.flash("success", "Welcome to Hostelly");
        return res.redirect("/home");
    })
);


router.get("/log-out" , logOut )

module.exports = router;

