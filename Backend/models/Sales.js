const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    fuelType: { type: String, required: true },          
    litersSold: { type: mongoose.Types.Decimal128, required: true },
    shift: { type: String, enum: ['day', 'night'], required: true }, 
    date: { type: Date, default: Date.now },
    price: { type: mongoose.Types.Decimal128, required: true },  // Total sale price
    cost: { type: mongoose.Types.Decimal128, required: true },   // Cost of stock sold
    profit: { type: mongoose.Types.Decimal128, required: true }  // Profit from the sale
});

module.exports = mongoose.model('Sales', salesSchema);
