const express = require("express");
const router = express.Router();
const dipController = require("../controllers/dipController");

// Define the route and ensure the callback function is correctly referenced
router.post("/add", dipController.saveDipMeasurement);

router.get("/date/:date", dipController.getDipByDate);

router.get("/7days", dipController.getDipForPreviousSevenDays);

module.exports = router;
