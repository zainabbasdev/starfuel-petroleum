import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/starFeul_Petroleum.png";
import "../css/output.css";
import "../css/font.css";

const GetReport = () => {
  const [reportDate, setReportDate] = useState("");
  const [reportYear, setReportYear] = useState("");
  const [reportMonth, setReportMonth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dailyReportData, setDailyReportData] = useState(null);
  const [monthlyReportData, setMonthlyReportData] = useState(null);
  const [customReportData, setCustomReportData] = useState(null);

  useEffect(() => {
    handleReportMonthChange({ target: { value: 1 } });
    setReportYear("2024");
  }, []);

  const handleReportDateChange = (event) => {
    setReportDate(event.target.value);
  };

  const handleReportYearChange = (event) => {
    setReportYear(event.target.value);
  };

  const handleReportMonthChange = (event) => {
    setReportMonth(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmitDate = (event) => {
    event.preventDefault();
    if (!reportDate) {
      toast.error("Please select a date.");
      return;
    }

    const selectedDate = new Date(reportDate);
    selectedDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate >= currentDate) {
      toast.error("You can only get reports for past dates.");
      return;
    }

    fetch(`http://localhost:5000/api/reports/date/${reportDate}`)
      .then((response) => response.json())
      .then((data) => {
        setDailyReportData(data);
      })
      .catch((error) => {
        console.error("Error fetching report:", error);
      });
  };

  const handleSubmitMonth = (event) => {
    event.preventDefault();
    if (!reportMonth || !reportYear) {
      toast.error("Please enter both month and year.");
      return;
    }

    const selectedYear = parseInt(reportYear, 10);
    const selectedMonth = parseInt(reportMonth, 10) - 1;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    if (
      selectedYear > currentYear ||
      (selectedYear === currentYear && selectedMonth > currentMonth)
    ) {
      toast.error(
        "You can only get reports for the current month or any previous month of the current year."
      );
      return;
    }

    fetch(
      `http://localhost:5000/api/reports/month/${reportYear}/${reportMonth}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMonthlyReportData(data);
      })
      .catch((error) => {
        console.error("Error fetching report:", error);
      });
  };

  const handleSubmitCustom = (event) => {
    event.preventDefault();
    if (!startDate || !endDate) {
      toast.error("Please enter both start date and end date.");
      return;
    }

    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);
    const currentDate = new Date();

    if (selectedStartDate > currentDate || selectedEndDate > currentDate) {
      toast.error("You can only get reports for past dates.");
      return;
    }

    if (selectedStartDate > selectedEndDate) {
      toast.error("Start date cannot be after end date.");
      return;
    }

    fetch(`http://localhost:5000/api/reports/custom/${startDate}/${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        setCustomReportData(data);
      })
      .catch((error) => {
        console.error("Error fetching report:", error);
      });
  };

  const displayDailyReportData = (data) => {
    if (!data) return null;

    return (
      <div>
        <header className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
              href="index.html"
            >
              <img
                src={logo}
                alt=""
                className="w-12 h-12 text-white p-2 bg-yellow-400 rounded-full"
              />
              <span className="ml-3 text-xl">STARFEUL PETROLEUM</span>
            </a>
            <div className="md:ml-auto text-right">
              <p
                id="urdu-text"
                className="text-base"
                style={{ fontFamily: "Jameel Noori Nastaleeq, serif" }}
              >
                معیار اور مقدار کا ضامن
              </p>
              <p className="text-xs">Ph: +92 301 2345678</p>
            </div>
          </div>
          <div className="text-center mt-5">
            <h2 className="text-xl font-bold">
              Report for {new Date(data.date).toLocaleDateString("en-GB")}
            </h2>
          </div>
        </header>

        {data.dipMeasurements && (
          <div>
            <h3 className="text-xl font-bold mb-2">DIP</h3>
            <table className="min-w-full bg-white mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Fuel Type</th>
                  <th className="py-2 px-4 border-b">mm Value</th>
                  <th className="py-2 px-4 border-b">Liters</th>
                </tr>
              </thead>
              <tbody>
                {data.dipMeasurements.map((dip, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-center">
                      {dip.fuelType}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {dip.mmValue}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {dip.litres.$numberDecimal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data.sales && (
          <div>
            <h3 className="text-xl font-bold mb-2">Fuel Sales</h3>
            <table className="min-w-full bg-white mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Fuel Type</th>
                  <th className="py-2 px-4 border-b">Liters Sold</th>
                  <th className="py-2 px-4 border-b">Shift</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Cost</th>
                  <th className="py-2 px-4 border-b">Profit</th>
                </tr>
              </thead>
              <tbody>
                {data.sales.map((sale, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-center">
                      {sale.fuelType}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {parseFloat(sale.litersSold.$numberDecimal).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {sale.shift}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {parseFloat(sale.price.$numberDecimal).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {parseFloat(sale.cost.$numberDecimal).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {parseFloat(sale.profit.$numberDecimal).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-2 px-4 border-b text-center">Total</td>
                  <td className="py-2 px-4 border-b text-center">-</td>
                  <td className="py-2 px-4 border-b text-center">-</td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.sales
                      .reduce(
                        (acc, sale) =>
                          acc + parseFloat(sale.price.$numberDecimal),
                        0
                      )
                      .toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.sales
                      .reduce(
                        (acc, sale) =>
                          acc + parseFloat(sale.cost.$numberDecimal),
                        0
                      )
                      .toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.sales
                      .reduce(
                        (acc, sale) =>
                          acc + parseFloat(sale.profit.$numberDecimal),
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {data.mobileOilSales && (
          <div>
            <h3 className="text-xl font-bold mb-2">Mobile Oil Sales</h3>
            <table className="min-w-full bg-white mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Oil Type</th>
                  <th className="py-2 px-4 border-b">Quantity Sold</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Cost</th>
                  <th className="py-2 px-4 border-b">Profit</th>
                </tr>
              </thead>
              <tbody>
                {data.mobileOilSales.map((sale, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-center">
                      {sale.oilType}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {parseFloat(sale.quantitySold.$numberDecimal).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {parseFloat(sale.price.$numberDecimal).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {parseFloat(sale.cost.$numberDecimal).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {parseFloat(sale.profit.$numberDecimal).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-2 px-4 border-b text-center">Total</td>
                  <td className="py-2 px-4 border-b text-center">-</td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.mobileOilSales
                      .reduce(
                        (acc, sale) =>
                          acc + parseFloat(sale.price.$numberDecimal),
                        0
                      )
                      .toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.mobileOilSales
                      .reduce(
                        (acc, sale) =>
                          acc + parseFloat(sale.cost.$numberDecimal),
                        0
                      )
                      .toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.mobileOilSales
                      .reduce(
                        (acc, sale) =>
                          acc + parseFloat(sale.profit.$numberDecimal),
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {data.expenditures && (
          <div>
            <h3 className="text-xl font-bold mb-2">Expenditures</h3>
            <table className="min-w-full bg-white mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.expenditures.map((expenditure, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-center">
                      {expenditure.description}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {parseFloat(expenditure.amount.$numberDecimal).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data.udharTransactions && (
          <div>
            <h3 className="text-xl font-bold mb-2">Udhar</h3>
            <table className="min-w-full bg-white mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.udharTransactions.map((udhar, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-center">
                      {udhar.personName}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {udhar.description}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {udhar.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data.wapsiTransactions && (
          <div>
            <h3 className="text-xl font-bold mb-2">Wapsi</h3>
            <table className="min-w-full bg-white mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.wapsiTransactions.map((wapsi, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-center">
                      {wapsi.personName}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {wapsi.description}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {wapsi.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(data.totalNetPrice ||
          data.totalNetProfit ||
          data.totalExpenditure ||
          data.udharTotal ||
          data.wapsiTotal ||
          data.remainingAmount) && (
          <div>
            <h3 className="text-xl font-bold mb-2">Summary</h3>
            <table className="min-w-full bg-white mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Net Price</th>
                  <th className="py-2 px-4 border-b">Net Profit</th>
                  <th className="py-2 px-4 border-b">Net Expense</th>
                  <th className="py-2 px-4 border-b">Net Udhar</th>
                  <th className="py-2 px-4 border-b">Net Wapsi</th>
                  <th className="py-2 px-4 border-b">Net Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-center">
                    {parseFloat(data.totalNetPrice.toFixed(2))}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {parseFloat(data.totalNetProfit.toFixed(2))}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {parseFloat(data.totalExpenditure.toFixed(2))}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {parseFloat(data.udharTotal.toFixed(2))}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {parseFloat(data.wapsiTotal.toFixed(2))}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {parseFloat(data.remainingAmount.toFixed(2))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const displayMonthlyReportData = (data) => {
    if (!data) return null;

    return (
      <div>
        <header className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
              href="index.html"
            >
              <img
                src={logo}
                alt=""
                className="w-12 h-12 text-white p-2 bg-yellow-400 rounded-full"
              />
              <span className="ml-3 text-xl">STARFEUL PETROLEUM</span>
            </a>
            <div className="md:ml-auto text-right">
              <p
                id="urdu-text"
                className="text-base"
                style={{ fontFamily: "Jameel Noori Nastaleeq, serif" }}
              >
                معیار اور مقدار کا ضامن
              </p>
              <p className="text-xs">Ph: +92 301 2345678</p>
            </div>
          </div>
          <div className="text-center mt-5">
            <h2 className="text-xl font-bold">
              Monthly Report for {data.month}/{data.year}
            </h2>
          </div>
        </header>

        {data.saleTotals && (
          <div>
            <h3 className="text-xl font-bold mb-2">Fuel Sales Totals</h3>
            <table className="min-w-full bg-white mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Fuel Type</th>
                  <th className="py-2 px-4 border-b">Liters Sold</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Cost</th>
                  <th className="py-2 px-4 border-b">Profit</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.saleTotals).map(
                  ([fuelType, totals], index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b text-center">
                        {fuelType}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.litersSold.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.price.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.cost.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.profit.toFixed(2)}
                      </td>
                    </tr>
                  )
                )}
                <tr>
                  <td className="py-2 px-4 border-b text-center">Net Total</td>
                  <td className="py-2 px-4 border-b text-center">-</td>
                  <td className="py-2 px-4 border-b text-center">
                    {Object.values(data.saleTotals)
                      .reduce((sum, totals) => sum + totals.price, 0)
                      .toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {Object.values(data.saleTotals)
                      .reduce((sum, totals) => sum + totals.cost, 0)
                      .toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {Object.values(data.saleTotals)
                      .reduce((sum, totals) => sum + totals.profit, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {data.mobileOilSalesTotals && (
          <div>
            <h3 className="text-xl font-bold mb-2">Mobile Oil Sales Totals</h3>
            <table className="min-w-full bg-white mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Oil Type</th>
                  <th className="py-2 px-4 border-b">Quantity Sold</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Cost</th>
                  <th className="py-2 px-4 border-b">Profit</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.mobileOilSalesTotals).map(
                  ([oilType, totals], index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b text-center">
                        {oilType}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.quantitySold.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.price.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.cost.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.profit.toFixed(2)}
                      </td>
                    </tr>
                  )
                )}
                <tr>
                  <td className="py-2 px-4 border-b text-center">Net Total</td>
                  <td className="py-2 px-4 border-b text-center">-</td>
                  <td className="py-2 px-4 border-b text-center">
                    {Object.values(data.mobileOilSalesTotals)
                      .reduce((sum, totals) => sum + totals.price, 0)
                      .toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {Object.values(data.mobileOilSalesTotals)
                      .reduce((sum, totals) => sum + totals.cost, 0)
                      .toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {Object.values(data.mobileOilSalesTotals)
                      .reduce((sum, totals) => sum + totals.profit, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {(data.udharTotals || data.wapsiTotals) && (
          <>
            <div>
              <h3 className="text-xl font-bold mb-2">Total Udhar</h3>
              <table className="min-w-full bg-white mb-4">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Person Name</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.udharTotals &&
                    Object.entries(data.udharTotals).map(
                      ([name, amount], index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b text-center">
                            {name}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {amount.toFixed(2)}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Total Wapsi</h3>
              <table className="min-w-full bg-white mb-4">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Person Name</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.wapsiTotals &&
                    Object.entries(data.wapsiTotals).map(
                      ([name, amount], index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b text-center">
                            {name}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {amount.toFixed(2)}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {(data.totalNetProfit ||
          data.totalUdhar ||
          data.totalWapsi ||
          data.totalAmount) && (
          <div>
            <h3 className="text-xl font-bold mb-2">Summary</h3>
            <table className="min-w-full bg-white mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Net Profit</th>
                  <th className="py-2 px-4 border-b">Total Expenditures</th>
                  <th className="py-2 px-4 border-b">Total Udhar</th>
                  <th className="py-2 px-4 border-b">Total Wapsi</th>
                  <th className="py-2 px-4 border-b">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-center">
                    {data.totalNetProfit.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.totalExpenditures.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.totalUdhar.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.totalWapsi.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.totalAmount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const displayCustomReportData = (data) => {
    if (!data) return null;

    return (
      <div>
        <header className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
              href="index.html"
            >
              <img
                src={logo}
                alt=""
                className="w-12 h-12 text-white p-2 bg-yellow-400 rounded-full"
              />
              <span className="ml-3 text-xl">STARFEUL PETROLEUM</span>
            </a>
            <div className="md:ml-auto text-right">
              <p
                id="urdu-text"
                className="text-base"
                style={{ fontFamily: "Jameel Noori Nastaleeq, serif" }}
              >
                معیار اور مقدار کا ضامن
              </p>
              <p className="text-xs">Ph: +92 301 2345678</p>
            </div>
          </div>
          <div className="text-center mt-5">
            <h2 className="text-xl font-bold">
              Custom Report from{" "}
              {new Date(startDate).toLocaleDateString("en-GB")} to{" "}
              {new Date(endDate).toLocaleDateString("en-GB")}
            </h2>
          </div>
        </header>

        {data.saleTotals && (
          <div>
            <h3 className="text-xl font-bold mb-2">Fuel Sales Totals</h3>
            <table className="min-w-full bg-white mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Fuel Type</th>
                  <th className="py-2 px-4 border-b">Liters Sold</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Cost</th>
                  <th className="py-2 px-4 border-b">Profit</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.saleTotals).map(
                  ([fuelType, totals], index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b text-center">
                        {fuelType}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.litersSold.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.price.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.cost.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.profit.toFixed(2)}
                      </td>
                    </tr>
                  )
                )}
                <tr>
                  <td className="py-2 px-4 border-b text-center">Net Total</td>
                  <td className="py-2 px-4 border-b text-center">-</td>
                  <td className="py-2 px-4 border-b text-center">
                    {Object.values(data.saleTotals)
                      .reduce((sum, totals) => sum + totals.price, 0)
                      .toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {Object.values(data.saleTotals)
                      .reduce((sum, totals) => sum + totals.cost, 0)
                      .toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {Object.values(data.saleTotals)
                      .reduce((sum, totals) => sum + totals.profit, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {data.mobileOilSalesTotals && (
          <div>
            <h3 className="text-xl font-bold mb-2">Mobile Oil Sales Totals</h3>
            <table className="min-w-full bg-white mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Oil Type</th>
                  <th className="py-2 px-4 border-b">Quantity Sold</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Cost</th>
                  <th className="py-2 px-4 border-b">Profit</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.mobileOilSalesTotals).map(
                  ([oilType, totals], index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b text-center">
                        {oilType}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.quantitySold}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.price.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.cost.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {totals.profit.toFixed(2)}
                      </td>
                    </tr>
                  )
                )}
                <tr>
                  <td className="py-2 px-4 border-b text-center">Net Total</td>
                  <td className="py-2 px-4 border-b text-center">-</td>
                  <td className="py-2 px-4 border-b text-center">
                    {Object.values(data.mobileOilSalesTotals)
                      .reduce((sum, totals) => sum + totals.price, 0)
                      .toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {Object.values(data.mobileOilSalesTotals)
                      .reduce((sum, totals) => sum + totals.cost, 0)
                      .toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {Object.values(data.mobileOilSalesTotals)
                      .reduce((sum, totals) => sum + totals.profit, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {(data.udharTotals || data.wapsiTotals) && (
          <>
            <div>
              <h3 className="text-xl font-bold mb-2">Total Udhar</h3>
              <table className="min-w-full bg-white mb-4">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Person Name</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.udharTotals &&
                    Object.entries(data.udharTotals).map(
                      ([name, amount], index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b text-center">
                            {name}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {amount}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Total Wapsi</h3>
              <table className="min-w-full bg-white mb-4">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Person Name</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.wapsiTotals &&
                    Object.entries(data.wapsiTotals).map(
                      ([name, amount], index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b text-center">
                            {name}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {amount}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {(data.totalNetProfit ||
          data.totalUdhar ||
          data.totalWapsi ||
          data.totalAmount) && (
          <div>
            <h3 className="text-xl font-bold mb-2">Summary</h3>
            <table className="min-w-full bg-white mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Net Profit</th>
                  <th className="py-2 px-4 border-b">Net Expenditures</th>
                  <th className="py-2 px-4 border-b">Net Udhar</th>
                  <th className="py-2 px-4 border-b">Net Wapsi</th>
                  <th className="py-2 px-4 border-b">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-center">
                    {data.totalNetProfit.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.totalExpenditures.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.totalUdhar.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.totalWapsi.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {data.totalAmount < 0 ? "Loss" : "Final Profit"}:{" "}
                    {Math.abs(data.totalAmount.toFixed(2))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <header className="bg-yellow-200 text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            to="/"
          >
            <img
              src={logo}
              alt=""
              className="w-12 h-12 text-white p-2 bg-yellow-400 rounded-full"
            />
            <span className="ml-3 text-xl">STARFEUL PETROLEUM</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-red-900" to="/sales">
              Sales/Stock
            </Link>
            <Link className="mr-5 hover:text-red-900" to="/mobile-oil">
              Mobile Oil
            </Link>
            <Link className="mr-5 hover:text-red-900" to="/expenditure">
              Expenditure
            </Link>
            <Link className="mr-5 hover:text-red-900" to="/khata">
              Khata Book
            </Link>
          </nav>
          <button
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={() => (window.location.href = "/compare-report")}
          >
            Compare Reports
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Get Report for a Date
        </h2>

        <form
          id="getReportForm"
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmitDate}
        >
          {!dailyReportData && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="reportDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Date:
                </label>
                <input
                  type="date"
                  id="reportDate"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  value={reportDate}
                  onChange={handleReportDateChange}
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Get Report
              </button>
            </>
          )}
        </form>
        {dailyReportData && (
          <div>{displayDailyReportData(dailyReportData)}</div>
        )}
      </section>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Get Report for a Month
        </h2>
        <form
          id="getReportMonthForm"
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmitMonth}
        >
          {!monthlyReportData && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="reportYear"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Year:
                </label>
                <select
                  id="reportYear"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  value={reportYear}
                  onChange={handleReportYearChange}
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const year = 2024 + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="reportMonth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Month:
                </label>
                <select
                  id="reportMonth"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  value={reportMonth}
                  onChange={handleReportMonthChange}
                >
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Get Report
              </button>
            </>
          )}
        </form>
        {monthlyReportData && (
          <div>{displayMonthlyReportData(monthlyReportData)}</div>
        )}
      </section>
      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Get Report for a Custom Date Range
        </h2>
        <form
          id="getReportCustomForm"
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmitCustom}
        >
          {!customReportData && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date:
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date:
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Get Report
              </button>
            </>
          )}
        </form>
        {customReportData && (
          <div>{displayCustomReportData(customReportData)}</div>
        )}
      </section>
      <ToastContainer
        position="top-right" // Position it at the top-right
        autoClose={5000} // Automatically close after 5 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Show newest toast on top
        closeOnClick
        rtl={false} // Set right-to-left layout to false
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-container" // Add custom class
        style={{ top: "100px" }} // Adjust top offset
      />
    </div>
  );
};

export default GetReport;
