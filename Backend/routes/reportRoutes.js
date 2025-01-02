const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// Define the route and ensure the callback function is correctly referenced
router.get("/date/:date", reportController.fetchReportByDate);

router.get("/month/:year/:month", reportController.fetchReportByMonth);

//route for custom date range
router.get(
  "/custom/:startDate/:endDate",
  reportController.fetchReportByCustomDates
);

module.exports = router;
