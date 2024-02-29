const asyncHandler = require('express-async-handler');
const passport = require('passport');
const nodemailer = require('nodemailer')
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
        let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'dennis.bernier@ethereal.email',
                pass: 'wRTtNZKGhH93Ky1zGz'
            }
        });
        
        const info = await transporter.sendMail({
            from: '"Ayush Dumasia" <dennis.bernier@ethereal.email>', 
            to: email,
            subject: "Welcome..",
            text: `You have successfully create your account in a Hostelly , Here is Your username : ${username} and Password : ${password}` ,
            html: `<b>You have successfully create your account in a Hostelly , Here is Your username : ${username} and Password : ${password}</b>`,
        });

        console.log("Message sent: %s", info.messageId);

        const newUser = new User({ username, email, phone, isHosteler });

        let registerUser = await User.register(newUser, password);

        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "User was Registered");
        });

        // console.log(registerUser);
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