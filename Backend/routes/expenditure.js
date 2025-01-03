// routes for adding expenditure, getting expenditure for a specific date, updateing expenditure

const express = require('express');
const router = express.Router();
const expenditureController = require('../controllers/expenditureController');

router.post('/add', expenditureController.addExpenditure);
router.get('/get', expenditureController.getExpenditure);
router.put('/update', expenditureController.updateExpenditure);
router.get('/getByDate/:date', expenditureController.getExpenditureByDate);
router.get('/getByMonth/:year/:month', expenditureController.getExpenditureByMonth);
router.get('/getByYear/:year', expenditureController.getExpenditureByYear);
router.get('/get-total/month/:year/:month', expenditureController.getTotalExpenditureByMonth);
router.get('/get-total/year/:year', expenditureController.getTotalExpenditureByYear);

module.exports = router;