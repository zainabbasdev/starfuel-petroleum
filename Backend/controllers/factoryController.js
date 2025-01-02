const FactoryKhata = require("../models/Factory");

// Add a transaction
exports.addTransaction = async (req, res) => {
  try {
    const { transactionType, description, amount } = req.body;
    const transaction = { transactionType, description, amount };

    let factoryKhata = await FactoryKhata.findOne();
    if (!factoryKhata) {
      factoryKhata = new FactoryKhata({ transactions: [], balance: 0 });
      factoryKhata.transactions.push(transaction);
      if (transactionType === "Aamdni") {
        factoryKhata.balance += amount;
      } else if (transactionType === "Expenditure") {
        factoryKhata.balance -= amount;
      }
      await factoryKhata.save();

      return res
        .status(200)
        .json({ message: "New Factory Khata Added", factoryKhata });
    }

    factoryKhata.transactions.push(transaction);
    if (transactionType === "Aamdni") {
      factoryKhata.balance += amount;
    } else if (transactionType === "Expenditure") {
      factoryKhata.balance -= amount;
    }

    await factoryKhata.save();
    res.status(201).json(factoryKhata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all "Aamdni" transactions for a month
exports.getAamdniTransactionsForMonth = async (req, res) => {
  try {
    const { month, year } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const factoryKhata = await FactoryKhata.findOne({
      "transactions.transactionType": "Aamdni",
      "transactions.createdAt": { $gte: startDate, $lt: endDate },
    });

    if (!factoryKhata) {
      return res.status(404).json({ message: "No Aamdni transactions found" });
    }

    const aamdniTransactions = factoryKhata.transactions.filter(
      (transaction) =>
        transaction.transactionType === "Aamdni" &&
        transaction.createdAt >= startDate &&
        transaction.createdAt < endDate
    );

    res.status(200).json(aamdniTransactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all "Expenditure" transactions for a month
exports.getExpenditureTransactionsForMonth = async (req, res) => {
  try {
    const { month, year } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const factoryKhata = await FactoryKhata.findOne({
      "transactions.transactionType": "Expenditure",
      "transactions.createdAt": { $gte: startDate, $lt: endDate },
    });

    if (!factoryKhata) {
      return res
        .status(404)
        .json({ message: "No Expenditure transactions found" });
    }

    const expenditureTransactions = factoryKhata.transactions.filter(
      (transaction) =>
        transaction.transactionType === "Expenditure" &&
        transaction.createdAt >= startDate &&
        transaction.createdAt < endDate
    );

    res.status(200).json(expenditureTransactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const factoryKhata = await FactoryKhata.findOne();
    if (!factoryKhata) {
      return res.status(404).json({ message: "FactoryKhata not found" });
    }

    res.status(200).json(factoryKhata.transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
