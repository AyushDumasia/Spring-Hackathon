const Poll = require('../models/pollSchema.js');
const { adminValidation } = require('../middlewares/adminValidation.js');
const asyncHandler = require('express-async-handler')
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const PollResult = require('../models/pollResultSchema.js');

let seePoll = (asyncHandler(async(req , res) =>{
    let pollResults = await PollResult.find();
    console.log(pollResults);
}))



let getPollMenu = (asyncHandler(async(req , res) => {
    res.render("./poll/pollMenu.ejs");
}));

let postPollMenu = (asyncHandler(async(req , res ) => {
    let { time , category_1 ,category_2 , category_3} = req.body;
    let user = req.user;
    let result = await Poll.create({time , category_1   , category_2 , category_3 , user });
    // console.log(result);
    req.flash("success" , "Poll created Successfully");
    res.redirect("/menu/getPoll");
}));


let pollMenu = (asyncHandler(async(req , res)=>{
    const latestPoll = await Poll.findOne().sort({ createdAt:-1 });
    res.render("./poll/menuPoll.ejs" , {pollItem : latestPoll})
}));


const sendPoll = asyncHandler(async (req, res) => {
    const latestPoll = await Poll.findOne().sort({ createdAt: -1 });
    const user = req.user;
    const { menu } = req.body;
    if (!latestPoll) {
        return res.status(404).json({ message: "No poll found" });
    }
    const pollResult = new PollResult({
        Users: user._id,
        items: menu,
    });
    await pollResult.save();
    res.status(200).json({ message: "Poll submitted successfully" });
});


module.exports = { seePoll ,getPollMenu , postPollMenu , pollMenu , sendPoll};