const express = require('express');
const router = express.Router();
const mobileOilStockController = require('../controllers/mobileOilStockController');

// Route to add mobile oil stock
router.post('/add', mobileOilStockController.addMobileOilStock);

// Route to get all mobile oil stock
router.get('/get', mobileOilStockController.getMobileOilStock);

module.exports = router;