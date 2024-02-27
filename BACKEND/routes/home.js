const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const { getHome , postHome , subscription , menuPage , historyPage , addItem , addFeedback , getFeedback} = require('../controllers/homeController.js');

router.get("/", getHome);

router.post("/" , postHome)

router.get("/subscription" , subscription)

router.get("/menu" , menuPage)

router.get("/history" , isLoggedIn,historyPage );

router.patch("/menu/:id", isLoggedIn,addItem );

router.get("/feedback" ,getFeedback )

router.post("/feedback" ,isLoggedIn, addFeedback)

module.exports = router;