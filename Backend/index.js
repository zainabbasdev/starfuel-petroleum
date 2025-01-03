const express = require("express");
const mongoose = require("./config/db");
const cors = require("cors");
const mobileOilSaleRouter = require("./routes/mobileOilSale");
const stockRouter = require("./routes/stock");
const expenditureRouter = require("./routes/expenditure");
const mobileOilStockRouter = require("./routes/mobileOilStock");
const salesRouter = require("./routes/sales");
const khataRouter = require("./routes/khataBookRoutes");
const reportRouter = require("./routes/reportRoutes");
const dipRouter = require("./routes/dipRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/expenditure", expenditureRouter);
app.use("/api/stock", stockRouter);
app.use("/api/mobileOilStock", mobileOilStockRouter);
app.use("/api/mobileOilSale", mobileOilSaleRouter);
app.use("/api/sales", salesRouter);
app.use("/api/khata", khataRouter);
app.use("/api/reports", reportRouter);
app.use("/api/dip", dipRouter);

(async () => {
  try {
    // Start the server after updates are completed
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Error during application startup:", error.message);
    process.exit(1); // Exit the process if there is a critical failure
  }
})();
