const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash("failure" , "You must be Logged In");
        return res.redirect("/log-in");
    }
    return next();
};

// module.exports.isLoggedIn = (req , res , next )=>{
//     console.log(req.user);
//     if(!req.isAuthenticated()){
//         req.session.redirectURL = req.originalUrl;
//         console.log(req.session.redirectURL);
//         req.flash("success" , "You must be logged in");
//         return res.redirect("/log-in");
//     }
//     next();
// }




module.exports = isLoggedIn;
