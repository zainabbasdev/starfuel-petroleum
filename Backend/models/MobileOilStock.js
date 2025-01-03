const mongoose = require('mongoose');

const mobileOilStockSchema = new mongoose.Schema({
    oilType: { type: String, required: true },          // Type of mobile oil (e.g., 2T, 4T, etc.)
  litersAdded: { type: mongoose.Types.Decimal128, required: true },       // Amount of mobile oil added in liters (floating point)
  pricePerLiter: { type: mongoose.Types.Decimal128, required: true },     // Price per liter in floating point
  date: { type: Date, default: Date.now }              // Date when stock was added
});

module.exports = mongoose.model('MobileOilStock', mobileOilStockSchema);
