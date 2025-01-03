const mongoose = require('mongoose');

const dailyStockSchema = new mongoose.Schema({
    fuelType: { type: String, required: true },
    totalStock: { type: mongoose.Types.Decimal128, required: true },
    date: { type: Date, required: true }
});

// Create a compound index to ensure uniqueness for fuelType + date combo
dailyStockSchema.index({ date: 1, fuelType: 1 }, { unique: true });

module.exports = mongoose.model('DailyStock', dailyStockSchema);
