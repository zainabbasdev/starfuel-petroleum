const mongoose = require('mongoose');

const expenditureSchema = new mongoose.Schema({
  description: { type: String, required: true },       // Description of the expenditure (e.g., utility bills)
  amount: { type: mongoose.Types.Decimal128, required: true },            // Amount spent
  date: { type: Date, default: Date.now }              // Date of the expenditure
});

module.exports = mongoose.model('Expenditure', expenditureSchema);
