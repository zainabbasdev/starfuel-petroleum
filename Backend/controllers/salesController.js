const Sales = require("../models/Sales");
const Stock = require("../models/Stock");
updateDailyStocks = require("../controllers/updateStocks");

exports.addSale = async (req, res) => {
  try {
    const { fuelType, litersSold, shift, date, pricePerLiter } = req.body;
    let remainingLiters = parseFloat(litersSold);
    let totalCost = 0;

    const stocks = await Stock.find({ fuelType }).sort({ date: 1 });

    if (stocks.length === 1) {
      let stock = stocks[0];
      let stockLiters = parseFloat(stock.litersAdded);
      let stockPrice = parseFloat(stock.pricePerLiter);

      if (stockLiters >= remainingLiters) {
        stock.litersAdded = stockLiters - remainingLiters;
        totalCost = remainingLiters * stockPrice;
        remainingLiters = 0;

        if (parseFloat(stock.litersAdded) === 0) {
          await Stock.deleteOne({ _id: stock._id });
        } else {
          await stock.save();
        }
      } else {
        console.log(
          "Stock liters",
          stockLiters,
          "\nNot enough stock to fulfill the sale"
        );
        return res
          .status(400)
          .json({ error: "Not enough stock to fulfill the sale" });
      }
    } else {
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
          await Stock.deleteOne({ _id: stock._id });
        } else {
          await stock.save();
        }
      }

      if (remainingLiters > 0) {
        console.log("Not enough stock to fulfill the sale");
        return res
          .status(400)
          .json({ error: "Not enough stock to fulfill the sale" });
      }
    }

    const totalSalePrice = parseFloat(litersSold) * parseFloat(pricePerLiter);
    const profit = totalSalePrice - totalCost;

    const newSale = new Sales({
      fuelType,
      litersSold,
      shift,
      date,
      price: totalSalePrice,
      cost: totalCost,
      profit,
    });
    console.log(newSale);
    await newSale.save();

    // Call updateDailyStocks after sale is added for the fuelType
    await updateDailyStocks(fuelType);

    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get total sales of a day
exports.getTotalSalesByDay = async (req, res) => {
  try {
    const { date } = req.params;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const sales = await Sales.aggregate([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: "$fuelType", totalSales: { $sum: "$litersSold" } } },
    ]);
    if (sales.length === 0) {
      return res
        .status(404)
        .json({ message: "No sales found for the specified Date!" });
    }

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get total sales of a month
exports.getTotalSalesByMonth = async (req, res) => {
  try {
    const { year, month } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const sales = await Sales.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: "$fuelType", totalSales: { $sum: "$litersSold" } } },
    ]);

    if (sales.length === 0) {
      return res
        .status(404)
        .json({ message: "No sales found for the specified month!" });
    }

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get total sales of a year
exports.getTotalSalesByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

    const sales = await Sales.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: "$fuelType", totalSales: { $sum: "$litersSold" } } },
    ]);
    if (sales.length === 0) {
      return res
        .status(404)
        .json({ message: "No sales found for the specified Year!" });
    }
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
