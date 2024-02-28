module.exports.adminValidation = (req , res , next) =>{
    if(res.locals.currUser.username && res.locals.currUser.username != "admin"){
        req.flash("failure","You have no permission to access this page");
        return res.redirect("/home");
    }
    next();
}