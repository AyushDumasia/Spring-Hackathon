const asyncHandler = require('express-async-handler');
const passport = require('passport');
const User = require('../models/userSchema.js');

const generateModifiedUsername = (originalUsername) => {
    const uniqueIdentifier = Math.floor(100 + Math.random() * 900);
    return `${originalUsername}_${uniqueIdentifier}`;
};

let signUp = asyncHandler(async (req,res) =>{
    let { username , email , phone , isHosteler , password } = req.body;
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.json("User Already Exists");
    }
    const modifiedUsername = generateModifiedUsername(username);

    const newUser = new User({email , username: modifiedUsername , phone , isHosteler  });
    const registerUser = await User.register(newUser , password);
    console.log(req.body);
    res.json(registerUser);
});


// let  logIn = (passport.authenticate('local', { failureRedirect: '/log-in-failed' }), async(req, res) => {
//     res.json("Welcome");
//     console.log(`current User is ${JSON.stringify(res.locals.currUser)}`);
// });

let logIn = (passport.authenticate("local" , {failureRedirect : '/log-in'}) ,  async (req,res)=>{
    try{
        req.flash("success" , "Log In Successfully");
        // res.redirect(res.locals.redirectURL);
        res.redirect("/listing");

    }
    catch(err){
        res.send(err.message);  
    }
    
})

// let logIn = (asyncHandler (async(req , res)=>{
//     let {username , password} = req.body;
//     if(!username || !password){
//         res.json("All fields are compulsory")
//     }
//     const user = await User.findOne({username});
//     console.log(user);
//     if(user){
//         res.json(user);
//     }
//     else{
//         return;
//     }
// } ))

let logOut  = (req , res ,next )=>{
    req.logout((err) =>{
        if(err){
            next();
        }
        else{
            req.flash("success" , "User logged Out");
            res.redirect("/listing");
        }
    })
}
module.exports = { signUp , logIn , logOut};