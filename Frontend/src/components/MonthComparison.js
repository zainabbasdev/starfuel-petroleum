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
const fetchDataForMonth = async (year, month) => {
  const response = await fetch(
    `http://localhost:5000/api/reports/month/${year}/${month}`
  );
  const data = await response.json();
  return data;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center items-center mt-4">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center mr-4">
          <div
            style={{
              backgroundColor: entry.color,
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              marginRight: "8px",
            }}
          ></div>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("default", { month: "long" });
};

const MonthComparison = ({ year, month1, month2 }) => {
  const [month1Data, setMonth1Data] = useState(null);
  const [month2Data, setMonth2Data] = useState(null);

  // Fetch data for both months
  useEffect(() => {
    const fetchData = async () => {
      const dataMonth1 = await fetchDataForMonth(year, month1);
      const dataMonth2 = await fetchDataForMonth(year, month2);

      setMonth1Data(dataMonth1);
      setMonth2Data(dataMonth2);
    };

    fetchData();
  }, [year, month1, month2]);

  if (!month1Data || !month2Data) {
    return <div>Loading...</div>;
  }

  // Prepare data for the chart
  const chartData = [
    {
      name: "Total Expenditures",
      month1: month1Data.totalExpenditures || 0,
      month2: month2Data.totalExpenditures || 0,
    },
    {
      name: "Udhar",
      month1: month1Data.totalUdhar || 0,
      month2: month2Data.totalUdhar || 0,
    },
    {
      name: "Wapsi",
      month1: month1Data.totalWapsi || 0,
      month2: month2Data.totalWapsi || 0,
    },
    {
      name: "Net Profit",
      month1: parseFloat(month1Data.totalNetProfit).toFixed(2) || 0,
      month2: parseFloat(month2Data.totalNetProfit).toFixed(2) || 0,
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">
        Monthly Comparison
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
            dataKey="month1"
            name={getMonthName(month1)}
            stroke="#1f77b4"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="month2"
            name={getMonthName(month2)}
            stroke="#ff7f0e"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Month 1 Summary */}
        <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-900">
              {getMonthName(month1)}
            </h2>
          </div>
          <div className="mt-4 text-gray-700">
            <p className="text-sm">
              <strong>Net Profit:</strong>
              {parseFloat(month1Data.totalNetProfit).toFixed(2)}
            </p>
            <p className="text-sm">
              <strong>Udhar:</strong> {month1Data.totalUdhar}
            </p>
            <p className="text-sm">
              <strong>Wapsi:</strong> {month1Data.totalWapsi}
            </p>
          </div>
        </div>

        {/* Month 2 Summary */}
        <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-900">
              {getMonthName(month2)}
            </h2>
          </div>
          <div className="mt-4 text-gray-700">
            <p className="text-sm">
              <strong>Net Profit:</strong>{" "}
              {parseFloat(month2Data.totalNetProfit).toFixed(2)}
            </p>
            <p className="text-sm">
              <strong>Udhar:</strong> {month2Data.totalUdhar}
            </p>
            <p className="text-sm">
              <strong>Wapsi:</strong> {month2Data.totalWapsi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MonthComparisonContainer = () => {
  const [year, setYear] = useState("");
  const [month1, setMonth1] = useState("");
  const [month2, setMonth2] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Compare Monthly Reports
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Select a year and two months to view a side-by-side comparison.
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg p-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            >
              <option value="">Select year</option>
              {years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Month 1
            </label>
            <select
              value={month1}
              onChange={(e) => setMonth1(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            >
              <option value="">Select month</option>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Month 2
            </label>
            <select
              value={month2}
              onChange={(e) => setMonth2(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            >
              <option value="">Select month</option>
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
        </form>
        {year && month1 && month2 && (
          <MonthComparison year={year} month1={month1} month2={month2} />
        )}
      </div>
    </>
  );
};

export default MonthComparisonContainer;
