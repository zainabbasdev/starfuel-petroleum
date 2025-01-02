const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionType: {
    type: String,
    enum: ["Udhar", "Wapsi", "NIL"],
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
  netBalance: {
    type: Number,
    required: true,
  },
});

const khataBookSchema = new mongoose.Schema({
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

module.exports = mongoose.model("KhataBook", khataBookSchema);
