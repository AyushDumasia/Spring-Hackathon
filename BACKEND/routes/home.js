const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const { getHome , postHome , subscription , menuPage , historyPage , addItem , addFeedback , getFeedback, getAttendance} = require('../controllers/homeController.js');
const { adminValidation } = require('../middlewares/adminValidation.js');
let Menu = require("../models/menuSchema.js")

router.get("/", getHome);

router.post("/" , postHome)

router.get("/subscription" , subscription)

router.get("/menu" , menuPage)

router.get("/history" , isLoggedIn,historyPage );

router.patch("/menu/:id", isLoggedIn,addItem );

router.get("/feedback" ,getFeedback )

router.post("/feedback" ,isLoggedIn, addFeedback)

router.get("/attendance/:id",adminValidation, getAttendance);

// router.get('/chef-history', async (req, res) => {
//     try {
//         let currentHour = new Date().getHours();
//         console.log('Current Hour:', currentHour);
//         let menu = await Menu.find({
//             $expr: {
//                 $eq: [
//                     { $hour: '$Created_At' },
//                     currentHour
//                 ]
//             }
//         });
//         console.log('Menu:', menu);
//         res.status(200).json(menu);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });
module.exports = router;