const asyncHandler = require('express-async-handler');
const passport = require('passport');


let signUp = asyncHandler(async (req,res) =>{
    let { username , email , phone , isHosteler , password } = req.body;
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.json("User Already Exists");
    }
    const newUser = new User({email , username , phone , isHosteler  });
    const registerUser = await User.register(newUser , password);
    console.log(req.body);
    res.json(registerUser);
});


let  logIn = (passport.authenticate('local', { failureRedirect: '/log-in-failed' }), asyncHandler(async(req, res) => {
    res.json("Welcome");
}));

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