const Expenditure = require("../models/Expenditure");

// Add a new expenditure
exports.addExpenditure = async (req, res) => {
  try {
    const { description, amount } = req.body;
    const newExpenditure = new Expenditure({ description, amount });
    await newExpenditure.save();
    res.status(201).json(newExpenditure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all expenditures
exports.getExpenditure = async (req, res) => {
  try {
    const expenditures = await Expenditure.find();
    res.status(200).json(expenditures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an expenditure
exports.updateExpenditure = async (req, res) => {
  try {
    const { id, description, amount } = req.body;
    const updatedExpenditure = await Expenditure.findByIdAndUpdate(
      id,
      { description, amount },
      { new: true }
    );
    res.status(200).json(updatedExpenditure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get expenditure by date
exports.getExpenditureByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const expenditures = await Expenditure.find({
      date: { $gte: startDate, $lt: endDate },
    });

    if (expenditures.length === 0) {
      return res.status(404).json({
        message: "No Expenditure found for the specified Date!",
      });
    }

    res.status(200).json(expenditures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get expenditure by month
exports.getExpenditureByMonth = async (req, res) => {
  try {
    const { year, month } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const expenditures = await Expenditure.find({
      date: { $gte: startDate, $lte: endDate },
    });
    if (expenditures.length === 0) {
      return res
        .status(404)
        .json({ message: "No Expenditure found for the specified Month!" });
    }
    res.status(200).json(expenditures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get expenditure by year
exports.getExpenditureByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

    const expenditures = await Expenditure.find({
      date: { $gte: startDate, $lte: endDate },
    });

    if (expenditures.length === 0) {
      return res
        .status(404)
        .json({ message: "No Expenditure found for the specified Year!" });
    }
    res.status(200).json(expenditures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get total expenditure by month
exports.getTotalExpenditureByMonth = async (req, res) => {
  try {
    const { year, month } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const totalExpenditure = await Expenditure.aggregate([
      {
        $match: { date: { $gte: startDate, $lte: endDate } },
      },
      {
        $group: {
          _id: null,
          totalExpenditure: { $sum: "$amount" },
        },
      },
    ]);

    if (totalExpenditure.length === 0) {
      return res
        .status(404)
        .json({ message: "No Expenditure found for the specified Month!" });
    }

    res.status(200).json(totalExpenditure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get total expenditure by year
exports.getTotalExpenditureByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

    const totalExpenditure = await Expenditure.aggregate([
      {
        $match: { date: { $gte: startDate, $lte: endDate } },
      },
      {
        $group: {
          _id: null,
          totalExpenditure: { $sum: "$amount" },
        },
      },
    ]);

    if (totalExpenditure.length === 0) {
      return res
        .status(404)
        .json({ message: "No Expenditure found for the specified Year!" });
    }

    res.status(200).json(totalExpenditure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
