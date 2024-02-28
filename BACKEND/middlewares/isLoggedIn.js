const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("failure", "You must be logged in");
        console.log(req.session.redirectUrl);
        return res.redirect("/log-in");
    }
    return next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        // Clear the redirectUrl from session after using it
        delete req.session.redirectUrl;
    }
    next();
};


module.exports = isLoggedIn;