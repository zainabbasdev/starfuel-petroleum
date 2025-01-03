import React, { useState, useEffect } from "react";
import "../css/output.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Fetch data from API
const fetchDataForCustomRange = async (startDate, endDate) => {
  const response = await fetch(
    `http://localhost:5000/api/reports/custom/${startDate}/${endDate}`
  );
  const data = await response.json();
  return data;
};

// function to convert week into a date range
function weekToDateRange(year, month, week) {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  const firstMonday =
    firstDayOfMonth.getDate() + (dayOfWeek === 0 ? 1 : 8 - dayOfWeek);
  const startDate = new Date(year, month - 1, firstMonday + (week - 1) * 7);
  const endDate = new Date(year, month - 1, startDate.getDate() + 6);

  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
}

const CustomeComparison = ({ startDate1, endDate1, startDate2, endDate2 }) => {
  const [dateRange1Data, setDateRange1Data] = useState(null);
  const [dateRange2Data, setDateRange2Data] = useState(null);

  // Fetch data for both date ranges
  useEffect(() => {
    const fetchData = async () => {
      const dataRange1 = await fetchDataForCustomRange(startDate1, endDate1);
      const dataRange2 = await fetchDataForCustomRange(startDate2, endDate2);

      setDateRange1Data(dataRange1);
      setDateRange2Data(dataRange2);
    };

    fetchData();
  }, [startDate1, endDate1, startDate2, endDate2]);

  if (!dateRange1Data || !dateRange2Data) {
    return <div>Loading...</div>;
  }

  // Prepare data for the chart
  const chartData = [
    {
      name: "Total Expenditures",
      range1: dateRange1Data.totalExpenditures || 0,
      range2: dateRange2Data.totalExpenditures || 0,
    },
    {
      name: "Udhar",
      range1: dateRange1Data.totalUdhar || 0,
      range2: dateRange2Data.totalUdhar || 0,
    },
    {
      name: "Wapsi",
      range1: dateRange1Data.totalWapsi || 0,
      range2: dateRange2Data.totalWapsi || 0,
    },
    {
      name: "Net Profit",
      range1: parseFloat(dateRange1Data.totalNetProfit).toFixed(2) || 0,
      range2: parseFloat(dateRange2Data.totalNetProfit).toFixed(2) || 0,
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">
        Custom Date Comparison
      </h2>

      {/* Responsive Line Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="range1"
            name={`${new Date(startDate1).toLocaleDateString(
              "en-GB"
            )} to ${new Date(endDate1).toLocaleDateString("en-GB")}`}
            stroke="#1f77b4"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="range2"
            name={`${new Date(startDate2).toLocaleDateString(
              "en-GB"
            )} to ${new Date(endDate2).toLocaleDateString("en-GB")}`}
            stroke="#ff7f0e"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Date Range 1 Summary */}
        <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-900">
              {`${startDate1} to ${endDate1}`}
            </h2>
          </div>
          <div className="mt-4 text-gray-700">
            <p className="text-sm">
              <strong>Net Profit: </strong>
              {parseFloat(dateRange1Data.totalNetProfit).toFixed(2)}
            </p>
            <p className="text-sm">
              <strong>Udhar:</strong> {dateRange1Data.totalUdhar}
            </p>
            <p className="text-sm">
              <strong>Wapsi:</strong> {dateRange1Data.totalWapsi}
            </p>
          </div>
        </div>

        {/* Date Range 2 Summary */}
        <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-900">
              {`${startDate2} to ${endDate2}`}
            </h2>
          </div>
          <div className="mt-4 text-gray-700">
            <p className="text-sm">
              <strong>Net Profit: </strong>
              {parseFloat(dateRange2Data.totalNetProfit).toFixed(2)}
            </p>
            <p className="text-sm">
              <strong>Udhar:</strong> {dateRange2Data.totalUdhar}
            </p>
            <p className="text-sm">
              <strong>Wapsi:</strong> {dateRange2Data.totalWapsi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomeComparisonContainer = () => {
  const [year1, setYear1] = useState("");
  const [month1, setMonth1] = useState("");
  const [week1, setWeek1] = useState("");
  const [year2, setYear2] = useState("");
  const [month2, setMonth2] = useState("");
  const [week2, setWeek2] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [endDate1, setEndDate1] = useState("");
  const [startDate2, setStartDate2] = useState("");
  const [endDate2, setEndDate2] = useState("");

  useEffect(() => {
    setYear1(2024);
    setMonth1(1);
    setWeek1(1);
    setYear2(2024);
    setMonth2(1);
    setWeek2(1);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const dateRange1 = weekToDateRange(year1, month1, week1);
    const dateRange2 = weekToDateRange(year2, month2, week2);
    console.log(dateRange1);
    console.log(dateRange2);

    setStartDate1(dateRange1.startDate);
    setEndDate1(dateRange1.endDate);
    setStartDate2(dateRange2.startDate);
    setEndDate2(dateRange2.endDate);
  };

  return (
    <>
      <div>
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Compare Custom Date Ranges
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Select two date ranges to view a side-by-side comparison.
          </p>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded-lg p-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {/* Year 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year 1
              </label>
              <select
                value={year1}
                onChange={(e) => setYear1(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={2024 - i}>
                    {2024 - i}
                  </option>
                ))}
              </select>
            </div>

            {/* Month 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Month 1
              </label>
              <select
                value={month1}
                onChange={(e) => setMonth1(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, i) => (
                  <option key={i} value={i + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Week 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Week 1
              </label>
              <select
                value={week1}
                onChange={(e) => setWeek1(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              >
                {Array.from({ length: 4 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Year 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year 2
              </label>
              <select
                value={year2}
                onChange={(e) => setYear2(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={2024 - i}>
                    {2024 - i}
                  </option>
                ))}
              </select>
            </div>

            {/* Month 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Month 2
              </label>
              <select
                value={month2}
                onChange={(e) => setMonth2(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, i) => (
                  <option key={i} value={i + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Week 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Week 2
              </label>
              <select
                value={week2}
                onChange={(e) => setWeek2(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              >
                {Array.from({ length: 4 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-3">
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200"
              >
                Compare
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Display comparison if date ranges are selected */}
      {startDate1 && endDate1 && startDate2 && endDate2 && (
        <CustomeComparison
          startDate1={startDate1}
          endDate1={endDate1}
          startDate2={startDate2}
          endDate2={endDate2}
        />
      )}
    </>
  );
};

export default CustomeComparisonContainer;
