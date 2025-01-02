const express = require('express');
const router = express.Router();
const mobileOilSaleController = require('../controllers/mobileOilSaleController');

// Route to add a sale
router.post('/add', mobileOilSaleController.addSale);

// Route to get sales by date
router.get('/getByDate/:date', mobileOilSaleController.getTotalSalesByDate);

// Route to get sales by month
router.get('/getByMonth/:year/:month', mobileOilSaleController.getSaleByMonth);

// Route to get sales by year
router.get('/getByYear/:year', mobileOilSaleController.getSaleByYear);

module.exports = router;