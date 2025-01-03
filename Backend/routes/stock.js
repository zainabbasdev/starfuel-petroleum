const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Route to add stock
router.post('/add', stockController.addStock);

// Route to get all stock
router.get('/get', stockController.getTotalStock);

router.get('/get-all', stockController.getAllStock);

router.get('/total-stock/month/:year/:month', stockController.getTotalStockByMonth);
router.get('/total-stock/year/:year', stockController.getTotalStockByYear);
router.get('/daily-stock/day/:date', stockController.getDailyStockByDate);


module.exports = router;