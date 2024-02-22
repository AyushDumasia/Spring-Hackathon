const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/userSchema.js');
const session = require('express-session');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const { signUp, logIn, logOut } = require('../controllers/userController.js');



router.post("/sign-up", signUp);

router.post("/log-in",  logIn )

router.get("/log-out" , logOut )

module.exports = router;