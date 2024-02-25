const express = require('express');
const router = express.Router();
// const Menu = require('../models/menuSchema');
const { getMenu , createMenu , updateMenu} = require('../controllers/menuController');
const validateToken = require('../middlewares/validateToken');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.use(express.json());

router.get('/' ,isLoggedIn, getMenu)

router.get('/addMenu' , isLoggedIn ,(req ,res) =>{
    res.render("./menu/menuInput.ejs")
})
router.post('/',isLoggedIn, createMenu);

router.put("/:id",isLoggedIn, updateMenu)

module.exports = router;
