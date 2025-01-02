const MobileOilStock = require('../models/MobileOilStock');

// Add a new mobile oil stock
exports.addMobileOilStock = async (req, res) => {
  try {
    const { oilType, litersAdded, pricePerLiter, date } = req.body;
    let stock = await MobileOilStock.findOne({ oilType, pricePerLiter });

    if (stock) {
      stock.litersAdded = parseFloat(stock.litersAdded) + parseFloat(litersAdded);
      stock.date = date;
      await stock.save();
      res.status(200).json(stock);
    } else {
      const newMobileOilStock = new MobileOilStock({ oilType, litersAdded, pricePerLiter, date });
      await newMobileOilStock.save();
      res.status(201).json(newMobileOilStock);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all mobile oil stock
exports.getMobileOilStock = async (req, res) => {
  try {
    const mobileOilStocks = await MobileOilStock.find();
    res.status(200).json(mobileOilStocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};