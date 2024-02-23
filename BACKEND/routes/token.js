const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const uuid = require('uuid')
const qrcode = require('qrcode');


router.post("/token" , asyncHandler(async (req , res) =>{
    let newToken = uuid.v4();
    let newData = {
        token: newToken,
        username: res.locals.currUser.username,
        isHosteler: res.locals.currUser.isHosteler
    };
    
    let Message = `
    Token: ${newData.token}
    Username: ${newData.username}
    Hostel Student: ${newData.isHosteler}`;
    
    const qrCodeUrl = await qrcode.toDataURL(Message);

    res.json({
        token: newData.token,
        userData: {
            username: newData.username,
            isHosteler: newData.isHosteler
        },
        qrCodeUrl: qrCodeUrl
    });
}));


module.exports = router;