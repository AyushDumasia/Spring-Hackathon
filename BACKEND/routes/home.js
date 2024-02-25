const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const isLoggedIn = require('../middlewares/isLoggedIn');


router.get("/", (req, res) => {
    res.render("./home/home.ejs", { user: req.session.user || {} });
});


module.exports = router;