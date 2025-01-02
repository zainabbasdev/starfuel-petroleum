const mongoose = require("mongoose");
const Sales = require("../models/Sales");
const MobileOilSale = require("../models/MobileOilSale");
const Expenditure = require("../models/Expenditure");
const KhataBook = require("../models/KhataBook");
const DipMeasurement = require("../models/DailyDIP");

exports.fetchReportByDate = async (req, res) => {
  const date = req.params.date;

  if (!date) {
    return res.status(400).json({ error: "Date parameter is required" });
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate)) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  // Set the start and end of the day
  const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

  let dipDate = new Date(parsedDate);
  dipDate.setDate(dipDate.getDate() + 1);
  dipDate.setHours(0, 0, 0, 0);

  try {
    const sales = await Sales.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    const mobileOilSales = await MobileOilSale.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    const expenditures = await Expenditure.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    const dipMeasurements = await DipMeasurement.find({
      date: dipDate,
    });
    const khataBooks = await KhataBook.find({
      "transactions.date": { $gte: startOfDay, $lte: endOfDay },
    });

    const udharTransactions = [];
    const wapsiTransactions = [];
    let udharTotal = 0;
    let wapsiTotal = 0;

    khataBooks.forEach((khata) => {
      khata.transactions.forEach((transaction) => {
        if (transaction.date >= startOfDay && transaction.date <= endOfDay) {
          const transactionWithOwner = {
            ...transaction.toObject(),
            personName: khata.personName,
          };
          if (transaction.transactionType === "Udhar") {
            udharTransactions.push(transactionWithOwner);
            udharTotal += transaction.amount;
          } else if (transaction.transactionType === "Wapsi") {
            wapsiTransactions.push(transactionWithOwner);
            wapsiTotal += parseFloat(transaction.amount) || 0;
          }
        }
      });
    });

    const totalSales = sales.reduce(
      (totals, sale) => {
        totals.price += parseFloat(sale.price) || 0;
        totals.cost += parseFloat(sale.cost) || 0;
        totals.profit += parseFloat(sale.profit) || 0;
        return totals;
      },
      { price: 0, cost: 0, profit: 0 }
    );

    const totalMobileOilSales = mobileOilSales.reduce(
      (totals, sale) => {
        totals.price += parseFloat(sale.price) || 0;
        totals.cost += parseFloat(sale.cost) || 0;
        totals.profit += parseFloat(sale.profit) || 0;
        return totals;
      },
      { price: 0, cost: 0, profit: 0 }
    );

    const totalNetPrice = totalSales.price + totalMobileOilSales.price;
    const totalNetProfit = totalSales.profit + totalMobileOilSales.profit;
    const totalExpenditure = expenditures.reduce(
      (total, expense) => total + (parseFloat(expense.amount) || 0),
      0
    );
    const remainingAmount =
      totalNetPrice -
        totalExpenditure -
        parseFloat(udharTotal) +
        parseFloat(wapsiTotal) || 0;

    res.json({
      date: date,
      dipMeasurements: dipMeasurements,
      sales: sales,
      mobileOilSales: mobileOilSales,
      expenditures: expenditures,
      udharTransactions: udharTransactions,
      wapsiTransactions: wapsiTransactions,
      udharTotal: parseFloat(udharTotal) || 0,
      wapsiTotal: parseFloat(wapsiTotal) || 0,
      totalSales: totalSales,
      totalMobileOilSales: totalMobileOilSales,
      totalNetPrice: totalNetPrice,
      totalNetProfit: totalNetProfit,
      totalExpenditure: totalExpenditure,
      remainingAmount: remainingAmount,
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.fetchReportByMonth = async (req, res) => {
  const { year, month } = req.params;

  if (!year || !month) {
    return res
      .status(400)
      .json({ error: "Year and month parameters are required" });
  }

  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

  try {
    const sales = await Sales.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });
    const mobileOilSales = await MobileOilSale.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });
    const expenditures = await Expenditure.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });
    const khataBooks = await KhataBook.find({
      "transactions.date": { $gte: startOfMonth, $lte: endOfMonth },
    });

    const saleTotals = {};
    sales.forEach((sale) => {
      if (!saleTotals[sale.fuelType]) {
        saleTotals[sale.fuelType] = {
          litersSold: 0,
          price: 0,
          cost: 0,
          profit: 0,
        };
      }
      saleTotals[sale.fuelType].litersSold += parseFloat(sale.litersSold) || 0;
      saleTotals[sale.fuelType].price += parseFloat(sale.price) || 0;
      saleTotals[sale.fuelType].cost += parseFloat(sale.cost) || 0;
      saleTotals[sale.fuelType].profit += parseFloat(sale.profit) || 0;
    });

    const mobileOilSalesTotals = {};
    mobileOilSales.forEach((sale) => {
      if (!mobileOilSalesTotals[sale.oilType]) {
        mobileOilSalesTotals[sale.oilType] = {
          quantitySold: 0,
          price: 0,
          cost: 0,
          profit: 0,
        };
      }
      mobileOilSalesTotals[sale.oilType].quantitySold +=
        parseFloat(sale.quantitySold) || 0;
      mobileOilSalesTotals[sale.oilType].price += parseFloat(sale.price) || 0;
      mobileOilSalesTotals[sale.oilType].cost += parseFloat(sale.cost) || 0;
      mobileOilSalesTotals[sale.oilType].profit += parseFloat(sale.profit) || 0;
    });

    const totalExpenditures = expenditures.reduce(
      (total, expenditure) => total + (parseFloat(expenditure.amount) || 0),
      0
    );

    const udharTotals = {};
    const wapsiTotals = {};
    khataBooks.forEach((khata) => {
      khata.transactions.forEach((transaction) => {
        if (
          transaction.date >= startOfMonth &&
          transaction.date <= endOfMonth
        ) {
          if (transaction.transactionType === "Udhar") {
            if (!udharTotals[khata.personName]) {
              udharTotals[khata.personName] = 0;
            }
            udharTotals[khata.personName] += transaction.amount || 0;
          } else if (transaction.transactionType === "Wapsi") {
            if (!wapsiTotals[khata.personName]) {
              wapsiTotals[khata.personName] = 0;
            }
            wapsiTotals[khata.personName] += transaction.amount || 0;
          }
        }
      });
    });

    const totalMobileOilProfit = Object.values(mobileOilSalesTotals).reduce(
      (total, oilType) => total + oilType.profit,
      0
    );

    const totalNetProfit =
      parseFloat(
        Object.values(saleTotals).reduce(
          (total, fuelType) => total + fuelType.profit,
          0
        )
      ) + parseFloat(totalMobileOilProfit);

    const totalUdhar = Object.values(udharTotals).reduce(
      (total, amount) => total + amount,
      0
    );
    const totalWapsi = Object.values(wapsiTotals).reduce(
      (total, amount) => total + amount,
      0
    );

    const totalAmount =
      totalNetProfit + totalWapsi - totalUdhar - parseFloat(totalExpenditures);

    res.json({
      year: year,
      month: month,
      saleTotals: saleTotals,
      mobileOilSalesTotals: mobileOilSalesTotals,
      totalExpenditures: totalExpenditures,
      udharTotals: udharTotals,
      wapsiTotals: wapsiTotals,
      totalNetProfit: totalNetProfit,
      totalUdhar: totalUdhar,
      totalWapsi: totalWapsi,
      totalAmount: totalAmount,
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.fetchReportByCustomDates = async (req, res) => {
  const { startDate, endDate } = req.params;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Start date and end date parameters are required" });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) {
    return res.status(400).json({ error: "Invalid date format provided" });
  }

  // Ensure the end date includes the entire day
  end.setHours(23, 59, 59, 999);

  try {
    const sales = await Sales.find({
      date: { $gte: start, $lte: end },
    });
    const mobileOilSales = await MobileOilSale.find({
      date: { $gte: start, $lte: end },
    });
    const expenditures = await Expenditure.find({
      date: { $gte: start, $lte: end },
    });
    const khataBooks = await KhataBook.find({
      "transactions.date": { $gte: start, $lte: end },
    });

    const saleTotals = {};
    sales.forEach((sale) => {
      if (!saleTotals[sale.fuelType]) {
        saleTotals[sale.fuelType] = {
          litersSold: 0,
          price: 0,
          cost: 0,
          profit: 0,
        };
      }
      saleTotals[sale.fuelType].litersSold += parseFloat(sale.litersSold);
      saleTotals[sale.fuelType].price += parseFloat(sale.price);
      saleTotals[sale.fuelType].cost += parseFloat(sale.cost);
      saleTotals[sale.fuelType].profit += parseFloat(sale.profit);
    });

    const mobileOilSalesTotals = {};
    mobileOilSales.forEach((sale) => {
      if (!mobileOilSalesTotals[sale.oilType]) {
        mobileOilSalesTotals[sale.oilType] = {
          quantitySold: 0,
          price: 0,
          cost: 0,
          profit: 0,
        };
      }
      mobileOilSalesTotals[sale.oilType].quantitySold += parseFloat(
        sale.quantitySold
      );
      mobileOilSalesTotals[sale.oilType].price += parseFloat(sale.price);
      mobileOilSalesTotals[sale.oilType].cost += parseFloat(sale.cost);
      mobileOilSalesTotals[sale.oilType].profit += parseFloat(sale.profit);
    });

    const totalExpenditures = expenditures.reduce(
      (total, expenditure) => total + (parseFloat(expenditure.amount) || 0),
      0
    );

    const udharTotals = {};
    const wapsiTotals = {};
    khataBooks.forEach((khata) => {
      khata.transactions.forEach((transaction) => {
        if (transaction.date >= start && transaction.date <= end) {
          if (transaction.transactionType === "Udhar") {
            if (!udharTotals[khata.personName]) {
              udharTotals[khata.personName] = 0;
            }
            udharTotals[khata.personName] += transaction.amount;
          } else if (transaction.transactionType === "Wapsi") {
            if (!wapsiTotals[khata.personName]) {
              wapsiTotals[khata.personName] = 0;
            }
            wapsiTotals[khata.personName] += transaction.amount;
          }
        }
      });
    });

    const totalMobileOilProfit = Object.values(mobileOilSalesTotals).reduce(
      (total, oilType) => total + oilType.profit,
      0
    );

    const totalNetProfit =
      parseFloat(
        Object.values(saleTotals).reduce(
          (total, fuelType) => total + fuelType.profit,
          0
        )
      ) + parseFloat(totalMobileOilProfit);

    const totalUdhar = Object.values(udharTotals).reduce(
      (total, amount) => total + amount,
      0
    );
    const totalWapsi = Object.values(wapsiTotals).reduce(
      (total, amount) => total + amount,
      0
    );

    const totalAmount =
      totalNetProfit + totalWapsi - totalUdhar - parseFloat(totalExpenditures);

    res.json({
      startDate: startDate,
      endDate: endDate,
      saleTotals: saleTotals,
      mobileOilSalesTotals: mobileOilSalesTotals,
      totalExpenditures: totalExpenditures,
      udharTotals: udharTotals,
      wapsiTotals: wapsiTotals,
      totalNetProfit: totalNetProfit,
      totalUdhar: totalUdhar,
      totalWapsi: totalWapsi,
      totalAmount: totalAmount,
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
