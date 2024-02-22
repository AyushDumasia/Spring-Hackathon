const express = require('express');
const router = express.Router();
const Menu = require('../models/menuSchema');
const { getMenu , createMenu , updateMenu} = require('../controllers/menuController');

router.use(express.json());

//SHOW ROUTE
router.get('/' , getMenu)

//NEW  ROUTE
router.post('/', createMenu);

//UPDATE ROUTE
router.put("/:id" , updateMenu)

module.exports = router;
