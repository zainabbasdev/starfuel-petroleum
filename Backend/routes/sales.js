const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// Route to add a sale
router.post('/add', salesController.addSale);

// Route to get total sales of a day
router.get('/getTotalSalesByDay/:date', salesController.getTotalSalesByDay);

// Route to get total sales of a month
router.get('/getTotalSalesByMonth/:year/:month', salesController.getTotalSalesByMonth);

// Route to get total sales of a year
router.get('/getTotalSalesByYear/:year', salesController.getTotalSalesByYear);

module.exports = router;