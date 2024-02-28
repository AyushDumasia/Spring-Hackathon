const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        // req.session.redirectUrl = req.originalUrl;
        req.flash("failure" , "You must be Logged In");
        return res.redirect("/log-in");
    }
    return next();
};
module.exports = isLoggedIn;

// module.exports.saveRedirectUrl = (req , res , next) =>{
//     if(req.session.redirectUrl){
//         res.locals.redirectUrl  = req.session.redirectUrl
//     }
//     next();
// }




