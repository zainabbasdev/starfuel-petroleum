const mongoose = require("mongoose");
const Stock = require("../models/Stock");
const StockHistory = require("../models/StockHistory");
const DailyStock = require("../models/DailyStock");
const { end } = require("pdfkit");

// Helper function to normalize date (set time to 00:00:00)
const normalizeDate = (date) => {
  const normalized = new Date(date);
  normalized.setDate(normalized.getDate() + 1);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

// Get all current stocks
exports.getAllStock = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get total stock of each fuel type
exports.getTotalStock = async (req, res) => {
  try {
    const totalStock = await Stock.aggregate([
      {
        $group: {
          _id: "$fuelType",
          totalLiters: { $sum: "$litersAdded" },
        },
      },
    ]);
    res.status(200).json(totalStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new stock or update existing one
exports.addStock = async (req, res) => {
  try {
    const { fuelType, litersAdded, pricePerLiter, date } = req.body;

    // Record stock addition in StockHistory
    const stockHistoryEntry = new StockHistory({
      fuelType,
      litersAdded,
      pricePerLiter,
      date,
    });
    await stockHistoryEntry.save();

    let stock = await Stock.findOne({ fuelType, pricePerLiter });
    if (stock) {
      stock.litersAdded =
        parseFloat(stock.litersAdded) + parseFloat(litersAdded);
      stock.date = date;
      await stock.save();
      res.status(200).json(stock);
    } else {
      const newStock = new Stock({
        fuelType,
        litersAdded,
        pricePerLiter,
        date,
      });
      await newStock.save();
      res.status(201).json(newStock);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalStockByMonth = async (req, res) => {
  const { year, month } = req.params;

  if (!year || !month) {
    return res
      .status(400)
      .json({ error: "Year and month parameters are required" });
  }

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  try {
    // Get the opening stock on the first date of the given month
    const openingStock = await DailyStock.aggregate([
      { $match: { date: startDate } },
      {
        $group: {
          _id: "$fuelType",
          openingStock: { $sum: "$totalStock" }, // Ensure this matches the field name in DailyStock
        },
      },
    ]);
    // Get the added stock during the given month
    const addedStock = await StockHistory.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: "$fuelType", totalAdded: { $sum: "$litersAdded" } } },
    ]);

    // Merge results
    const result = {};
    openingStock.forEach((stock) => {
      result[stock._id] = {
        fuelType: stock._id,
        totalStock: parseFloat(stock.openingStock),
      };
    });

    addedStock.forEach((stock) => {
      if (result[stock._id]) {
        result[stock._id].totalStock += parseFloat(stock.totalAdded);
      } else {
        result[stock._id] = {
          fuelType: stock._id,
          totalStock: parseFloat(stock.totalAdded),
        };
      }
    });

    if (Object.keys(result).length === 0) {
      return res
        .status(404)
        .json({ error: "No stock found for the selected month" });
    }

    res.status(200).json(Object.values(result));
  } catch (error) {
    console.error("Error fetching total stock by month:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTotalStockByYear = async (req, res) => {
  try {
    const { year } = req.params; // Example: year=2024
    const startDate = new Date(year - 1, 11, 31, 23, 59, 59, 999);
    startDate.setDate(startDate.getDate() + 1); // December 31st of the previous year
    startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const endDate = new Date(year, 11, 31, 23, 59, 59, 999); // December 31st
    endDate.setHours(23, 59, 59, 999); // Set time to the last millisecond of the day

    const openingStock = await DailyStock.aggregate([
      { $match: { date: startDate } },
      {
        $group: {
          _id: "$fuelType",
          openingStock: { $sum: "$totalStock" }, // Ensure this matches the field name in DailyStock
        },
      },
    ]);
    // Get all stock added during the year
    const addedStock = await StockHistory.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: "$fuelType",
          totalAdded: { $sum: "$litersAdded" },
        },
      },
    ]);

    // Merge results
    const result = {};
    openingStock.forEach((stock) => {
      result[stock._id] = {
        fuelType: stock._id,
        totalStock: parseFloat(stock.openingStock.toString()), // Convert Decimal128 to number
      };
    });

    addedStock.forEach((stock) => {
      if (result[stock._id]) {
        result[stock._id].totalStock += parseFloat(stock.totalAdded.toString()); // Convert Decimal128 to number
      } else {
        result[stock._id] = {
          fuelType: stock._id,
          totalStock: parseFloat(stock.totalAdded.toString()), // Convert Decimal128 to number
        };
      }
    });
    if (Object.keys(result).length === 0) {
      return res
        .status(404)
        .json({ error: "No stock found for the selected Year" });
    }

    res.status(200).json(Object.values(result));
  } catch (error) {
    console.error("Error fetching total stock by year:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get daily stock by date
exports.getDailyStockByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const normalizedDate = normalizeDate(date);
    console.log(normalizedDate);

    const dailyStock = await DailyStock.find({
      date: normalizedDate,
    });
    if (dailyStock.length === 0) {
      return res
        .status(404)
        .json({ message: "No stock found for the specified Date!" });
    }

    console.log(dailyStock);

    res.status(200).json(dailyStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
