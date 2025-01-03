const MobileOilSale = require("../models/MobileOilSale");
const MobileOilStock = require("../models/MobileOilStock");

// Add a new mobile oil sale
exports.addSale = async (req, res) => {
  try {
    const { oilType, quantitySold, pricePerLiter } = req.body;
    let remainingLiters = parseFloat(quantitySold);
    let totalCost = 0;

    // Find stock entries for the given oil type, sorted by date
    const stocks = await MobileOilStock.find({ oilType }).sort({ date: 1 });

    // Calculate total available stock
    let totalAvailableStock = stocks.reduce(
      (total, stock) => total + parseFloat(stock.litersAdded),
      0
    );

    if (totalAvailableStock < remainingLiters) {
      return res
        .status(400)
        .json({ error: "Not enough stock to fulfill the sale" });
    }

    for (let stock of stocks) {
      if (remainingLiters <= 0) break;

      let stockLiters = parseFloat(stock.litersAdded);
      let stockPrice = parseFloat(stock.pricePerLiter);
      let soldFromStock = 0;

      if (stockLiters >= remainingLiters) {
        soldFromStock = remainingLiters;
        stock.litersAdded = stockLiters - remainingLiters;
        remainingLiters = 0;
      } else {
        soldFromStock = stockLiters;
        remainingLiters -= stockLiters;
        stock.litersAdded = 0;
      }

      totalCost += soldFromStock * stockPrice;

      if (parseFloat(stock.litersAdded) === 0) {
        await MobileOilStock.deleteOne({ _id: stock._id });
      } else {
        await stock.save();
      }
    }

    const totalSalePrice = parseFloat(quantitySold) * parseFloat(pricePerLiter);
    const profit = totalSalePrice - totalCost;

    const newSale = new MobileOilSale({
      oilType,
      quantitySold,
      price: totalSalePrice,
      cost: totalCost,
      profit,
    });

    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get total sales by date
exports.getTotalSalesByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const totalSales = await MobileOilSale.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: "$oilType",
          totalQuantitySold: { $sum: "$quantitySold" },
          totalRevenue: { $sum: "$price" },
        },
      },
    ]);

    if (totalSales.length === 0) {
      return res
        .status(404)
        .json({ message: "No Mobile Oil sales found for the specified Date!" });
    }

    res.status(200).json(totalSales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get sales by month
exports.getSaleByMonth = async (req, res) => {
  try {
    const { year, month } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const totalSales = await MobileOilSale.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: "$oilType",
          totalQuantitySold: { $sum: "$quantitySold" },
          totalRevenue: { $sum: { $multiply: "$price" } },
        },
      },
    ]);

    if (totalSales.length === 0) {
      return res
        .status(404)
        .json({
          message: "No Mobile Oil sales found for the specified month!",
        });
    }

    res.status(200).json(totalSales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get sales by year
exports.getSaleByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

    const totalSales = await MobileOilSale.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: "$oilType",
          totalQuantitySold: { $sum: "$quantitySold" },
          totalRevenue: { $sum: "$price" },
        },
      },
    ]);

    if (totalSales.length === 0) {
      return res
        .status(404)
        .json({ message: "No Mobile Oil sales found for the specified Year!" });
    }

    res.status(200).json(totalSales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
