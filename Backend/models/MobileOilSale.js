const mongoose = require('mongoose');

const mobileOilSaleSchema = new mongoose.Schema({
  oilType: { type: String, required: true },          // Type of mobile oil (e.g., 2T, 4T, etc.)
  quantitySold: { type: mongoose.Types.Decimal128, required: true },      // Amount of mobile oil sold in liters
  price: { type: mongoose.Types.Decimal128, required: true },             // Total price of the sale
  cost: { type: mongoose.Types.Decimal128, required: true },              // Total cost of the sale
  profit: { type: mongoose.Types.Decimal128, required: true },            // Profit from the sale
  date: { type: Date, default: Date.now }              // Date of the sale
});

module.exports = mongoose.model('MobileOilSale', mobileOilSaleSchema);