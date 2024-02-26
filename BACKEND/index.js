const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');
const menuRoute  = require('./routes/menu')
const userRoute = require('./routes/user')
const tokenRoute = require('./routes/token')
const homeRoute = require('./routes/home')
const User = require('./models/userSchema.js')

app.use(methodOverride("_method"));
app.use(express.urlencoded({ urlencoded: true }));
app.set("view engine", "ejs");
app.engine('ejs', ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const sessionOption = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true
    }
};
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.failure = req.flash("failure");
    res.locals.currUser = req.user;
    // req.session.save();
    next();
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Logger
app.use((req,res,next) =>{
    if (req.path !== "/favicon.ico") {
    console.log(req.method,req.path);
    }
    next();
})


const MONGO_URL = "mongodb://127.0.0.1:27017/Hostel-System";
async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then(() => {
        console.log("success");
    })
    .catch(err => console.log(err));
const PORT = 3000;
app.listen(PORT , (req , res) =>{
    try{
        console.log(`Server is Listing on ${PORT} Port`);
    }
    catch(err){
        console.log(err.message);
    }
})



app.get("/", (req, res) => {
    res.render("user/signUp.ejs");
})

app.use("/menu" , menuRoute)
app.use("/" , userRoute)
app.use("/" , tokenRoute);
app.use("/home" , homeRoute);
