const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionType: {
    type: String,
    enum: ["Amanti", "Wapas Liay", "NIL"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const AmanatBookSchema = new mongoose.Schema({
  personName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  transactions: [transactionSchema],
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("AmanatBook", AmanatBookSchema);
