const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.directUrl = req.originalUrl;
        req.flash("failure" , "You must be Logged In");
        return res.redirect("/directUrl");
    }
    return next();
};

const saveRedirectUrl = (req , res ,next) =>{
    if(req.session.directUrl){
        res.locals.directUrl = req.session.directUrl
    }
    next();
}


module.exports = { isLoggedIn  , saveRedirectUrl }
