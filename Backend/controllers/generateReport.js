const fs = require("fs");
const path = require("path");

const saveReport = (req, res) => {
  const baseDir = "D:\\Hassan Petroleum Data"; // Base directory for the reports
  //   const currentDate = req.reportDateObj;
  //   const year = currentDate.getFullYear().toString();
  //   const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  //   const reportDate = currentDate.toISOString().split("T")[0];

  const { year, month, reportDate } = req.body;
  const currentDate = new Date(reportDate);
  currentDate.setDate(currentDate.getDate() + 1);
  const reportDate1 = currentDate.toISOString().split("T")[0];

  if (!req.file) {
    console.error("No file uploaded");
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const pdfData = req.file.buffer;

  const yearFolder = path.join(baseDir, "reports", year);
  const monthFolder = path.join(yearFolder, month);

  // Create folders if they don't exist
  if (!fs.existsSync(yearFolder)) {
    fs.mkdirSync(yearFolder, { recursive: true });
  }
  if (!fs.existsSync(monthFolder)) {
    fs.mkdirSync(monthFolder, { recursive: true });
  }

  const filePath = path.join(
    monthFolder,
    `Hassan Petroleum - ${reportDate1} - Report.pdf`
  );

  // Save the PDF file
  fs.writeFile(filePath, pdfData, (err) => {
    if (err) {
      console.error("Error saving report:", err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
};

module.exports = {
  saveReport,
};
