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
const menuRoute  =require('./routes/menu')

app.use(methodOverride("_method"));
// app.use(express.urlencoded({ urlencoded: true }));
app.set("view engine", "ejs");
app.engine('ejs', ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
    secret : "mysupersecretstring",
    resave : false,
    saveUninitialized : true,
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


//Logger
app.use((req,res,next) =>{
    if (req.path !== "/favicon.ico") {
    // req.time = new Date( Date.now() ).toString();
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
        console.log("Server is Listing on 3030 Port");
    }
    catch(err){
        console.log(err.message);
    }
})

app.get("/", (req, res) => {
    res.send("Working");
})

app.use("/api/menu" , menuRoute)