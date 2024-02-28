const express = require('express');
const router = express.Router();
const Poll = require('../models/pollSchema.js');
const { adminValidation } = require('../middlewares/adminValidation.js');
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const { getPollMenu, postPollMenu, pollMenu, sendPoll } = require('../controllers/pollController.js');

router.get("/poll",adminValidation, getPollMenu )

router.post("/poll" ,adminValidation, postPollMenu )

router.get("/getPoll" , pollMenu )

router.post("/getPoll",isLoggedIn , sendPoll );


module.exports = router;