const express = require("express");
const router = express.Router();
const factoryController = require("../controllers/factoryController");

// Route to add a transaction
router.post("/transaction", factoryController.addTransaction);

// Route to get all "Aamdni" transactions for a month
router.get(
  "/transactions/aamdni/:month/:year",
  factoryController.getAamdniTransactionsForMonth
);

// Route to get all "Expenditure" transactions for a month
router.get(
  "/transactions/expenditure/:month/:year",
  factoryController.getExpenditureTransactionsForMonth
);

// Route to get all transactions
router.get("/transactions", factoryController.getAllTransactions);

module.exports = router;
