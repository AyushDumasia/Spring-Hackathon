const express = require('express');
const router = express.Router();
const { getInventory, postInventory, inventoryHistory } = require('../controllers/inventory');
const { adminValidation } = require('../middlewares/adminValidation.js');

router.get('/inventory' ,adminValidation , getInventory )

router.post('/inventory' ,adminValidation, postInventory )

router.get('/inventory-history' , adminValidation ,inventoryHistory )

module.exports = router;