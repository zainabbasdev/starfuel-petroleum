const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  fuelType: { type: String, required: true },          // Petrol or Diesel
  litersAdded: { type: mongoose.Types.Decimal128, required: true },       // Amount of fuel added to the stock
  pricePerLiter: { type: mongoose.Types.Decimal128, required: true },     // Price per liter at the time of addition
  date: { type: Date, default: Date.now }              // Date when stock was added
});

module.exports = mongoose.model('Stock', stockSchema);
