// controllers/dipController.js
const DipMeasurement = require("../models/DailyDIP");

// Controller function to save dip measurement
exports.saveDipMeasurement = async (req, res) => {
  const { fuelType, mmValue, litres } = req.body;

  // Check if all required fields are provided
  if (!fuelType || !mmValue || !litres) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Get the current date
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(0, 0, 0, 0);

    // Check if a dip measurement already exists for the given fuelType and date
    const existingDip = await DipMeasurement.findOne({
      fuelType,
      date: currentDate,
    });

    if (existingDip) {
      // Update the existing dip measurement
      existingDip.mmValue = mmValue;
      existingDip.litres = parseFloat(litres);
      await existingDip.save();
      return res
        .status(200)
        .json({ message: "Dip measurement updated successfully" });
    } else {
      // Create a new dip measurement document
      const newDipMeasurement = new DipMeasurement({
        fuelType,
        mmValue,
        litres,
        date: currentDate,
      });

      // Save the dip measurement to the database
      await newDipMeasurement.save();
      return res
        .status(201)
        .json({ message: "Dip measurement saved successfully" });
    }
  } catch (error) {
    console.error("Error saving dip measurement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get dip measurement by date
exports.getDipByDate = async (req, res) => {
  const { date } = req.params;

  if (!date) {
    return res.status(400).json({ message: "Date parameter is required" });
  }

  const parsedDate = new Date(date);
  parsedDate.setDate(parsedDate.getDate() + 1);
  parsedDate.setHours(0, 0, 0, 0);

  if (isNaN(parsedDate)) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  try {
    const dipMeasurements = await DipMeasurement.find({ date: parsedDate });
    res.status(200).json(dipMeasurements);
  } catch (error) {
    console.error("Error fetching dip measurements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get dip measurements for the previous seven days
exports.getDipForPreviousSevenDays = async (req, res) => {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  currentDate.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  try {
    const dipMeasurements = await DipMeasurement.find({
      date: { $gte: sevenDaysAgo, $lte: currentDate },
    }).sort({ date: -1 });
    res.status(200).json(dipMeasurements);
  } catch (error) {
    console.error("Error fetching dip measurements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
