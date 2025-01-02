const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transactionType: { type: String, required: true }, // "Aamdni" or "Expenditure"
    description: { type: String },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const factoryKhataSchema = new mongoose.Schema(
  {
    balance: { type: Number, default: 0 }, // Factory's current balance
    transactions: [transactionSchema], // List of all transactions
  },
  { timestamps: true }
);

module.exports = mongoose.model("FactoryKhata", factoryKhataSchema);
