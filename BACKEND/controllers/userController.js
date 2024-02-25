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


let signUp = asyncHandler(async (req, res) => {
    let { username, email, phone, isHosteler, password } = req.body;

    const emailAvailable = await User.findOne({ email });
    const phoneAvailable = await User.findOne({ phone });

    if (phoneAvailable || emailAvailable) {
        req.flash("failure", "User Already Exists");
        return res.redirect("/sign-up"); 
    }

    let hashedPassword = await bcrypt.hash(password, saltRounds);
    let newUsername = generateModifiedUsername(username);

    // Create and save user
    const newUser = await User.create({
        username: newUsername,
        email,
        password: hashedPassword,
        phone,
        isHosteler
    });
    req.session.user = newUser;
    req.session.save();
    console.log('User object in session:', req.session.user);
    res.render('./home/home.ejs' , { user: req.session.user });
    req.flash('success', 'Welcome');
    // req.flash("success", "Sign Up Successful");
    // res.redirect("/home");

    // Use req.login for user authentication
    // req.login(newUser, (err) => {
    //     if (err) {
    //         req.flash("failure", "Error during login");
    //         return res.redirect("/login");
    //     }
    //     console.log("User registration and login successful");
    //     res.redirect("/menu");
    // });
});



let logIn = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        req.flash('failure', 'User Not found');
        return res.redirect('/login');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        req.flash('failure', 'Wrong Password');
        return res.redirect('/login');
    }
    req.session.user = user;
    req.session.save();
    console.log('User object in session:', req.session.user);
    res.render('./home/home.ejs' , { user: req.session.user });
    req.flash('success', 'Welcome');
})



let logOut  = ((req, res) => {
    req.logout(); // Passport method to logout
    req.flash('success', 'Logged out successfully');
    res.redirect('/');
});




// <!-- <% if(newUser){    %> -->
//                 <!-- <%} %> -->


module.exports = { signUp , logIn , logOut};