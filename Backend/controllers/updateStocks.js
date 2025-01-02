const mongoose = require("mongoose");
const Stock = require("../models/Stock");
const DailyStock = require("../models/DailyStock");

const updateDailyStocks = async (fuelType) => {
  try {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(0, 0, 0, 0);

    // Get the total stock for the specific fuel type
    const stock = await Stock.aggregate([
      { $match: { fuelType } },
      { $group: { _id: "$fuelType", totalStock: { $sum: "$litersAdded" } } },
    ]);

    if (stock.length === 0) {
      console.log(`No stock found for fuel type ${fuelType}`);
      return;
    }

    const totalStock = mongoose.Types.Decimal128.fromString(
      stock[0].totalStock.toString()
    );

    // Check if a record already exists for today and this fuelType
    const existingRecord = await DailyStock.findOne({
      date: { $eq: today },
      fuelType,
    });

    if (existingRecord) {
      // Update the existing record
      existingRecord.totalStock = totalStock;
      await existingRecord.save();
    } else {
      // Create a new record
      const newRecord = new DailyStock({
        fuelType: stock[0]._id,
        totalStock: totalStock,
        date: today,
      });
      await newRecord.save();
      console.log(
        `Inserted daily stock for ${fuelType} on ${
          today.toISOString().split("T")[0]
        }`
      );
    }
  } catch (error) {
    console.error("Error updating daily stocks:", error);
  }
};

module.exports = updateDailyStocks;
