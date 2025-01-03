const mongoose = require('mongoose');

const stockHistorySchema = new mongoose.Schema({
  fuelType: { type: String, required: true },
  litersAdded: { type: mongoose.Types.Decimal128, required: true },
  pricePerLiter: { type: mongoose.Types.Decimal128, required: true },
  date: { type: Date, default: Date.now }, // When the stock was added
});

module.exports = mongoose.model('StockHistory', stockHistorySchema);
