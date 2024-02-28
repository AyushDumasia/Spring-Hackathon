const express = require('express');
const router = express.Router();
const { getMenu, createMenu , updateMenu , showForm, deleteMenu , getUpdatePage} = require('../controllers/menuController');
const { adminValidation } = require('../middlewares/adminValidation');

router.use(express.json());

router.get('/' ,adminValidation, getMenu)

router.get('/addMenu' , adminValidation,showForm)

router.get('/edit/:id' ,adminValidation, getUpdatePage)

router.post('/',adminValidation, createMenu)

router.put("/:id", adminValidation ,updateMenu)

router.delete("/:id" ,adminValidation, deleteMenu)

module.exports = router;
