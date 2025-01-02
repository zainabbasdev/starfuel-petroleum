// models/DipMeasurement.js
const mongoose = require("mongoose");

const DipMeasurementSchema = new mongoose.Schema({
  fuelType: {
    type: String,
    required: true,
    enum: ["Petrol", "Diesel"],
  },
  mmValue: {
    type: Number,
    required: true,
  },
  litres: {
    type: mongoose.Types.Decimal128, // Use Decimal128 for floating point numbers
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically store the current date when saved
  },
});

module.exports = mongoose.model("DipMeasurement", DipMeasurementSchema);
