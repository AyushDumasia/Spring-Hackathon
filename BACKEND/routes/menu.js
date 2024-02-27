const express = require('express');
const router = express.Router();
// const Menu = require('../models/menuSchema');
const { getMenu , createMenu , updateMenu , showForm} = require('../controllers/menuController');
const validateToken = require('../middlewares/validateToken');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.use(express.json());

router.get('/' , getMenu)

router.get('/addMenu' ,showForm)

router.post('/', createMenu);

router.put("/:id", updateMenu)


module.exports = router;
