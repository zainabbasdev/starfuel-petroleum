import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/starFeul_Petroleum.png";
import "../css/output.css";

const Stock = () => {
  const [stockData, setStockData] = useState([]);
  const [currentMonthStockData, setCurrentMonthStockData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/stock/get-all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStockData(data);
      })
      .catch((error) => {
        console.log(error);
      });

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
    const currentYear = currentDate.getFullYear();

    fetch(
      `http://localhost:5000/api/stock/total-stock/month/${currentYear}/${currentMonth}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentMonthStockData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const displayStockData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p className="text-gray-600">No stock data available.</p>;
    }

    return (
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Fuel</th>
            <th className="py-2 px-4 border-b">Liters</th>
            <th className="py-2 px-4 border-b">Price Per Liter</th>
          </tr>
        </thead>
        <tbody>
          {data.map((stock) => (
            <tr key={stock._id}>
              <td className="py-2 px-4 border-b text-sm text-gray-600 text-center">
                {stock.fuelType}
              </td>
              <td className="py-2 px-4 border-b text-sm text-gray-600 text-center">
                {parseFloat(stock.litersAdded.$numberDecimal).toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b text-sm text-gray-600 text-center">
                {stock.pricePerLiter.$numberDecimal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const displayCurrentMonthStockData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p className="text-gray-600">No stock data available.</p>;
    }
    return (
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Fuel</th>
            <th className="py-2 px-4 border-b">Total Stock</th>
          </tr>
        </thead>
        <tbody>
          {data.map((stock) => (
            <tr key={stock._id}>
              <td className="py-2 px-4 border-b text-sm text-gray-600 text-center">
                {stock.fuelType}
              </td>
              <td className="py-2 px-4 border-b text-sm text-gray-600 text-center">
                {stock.totalStock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
            <Link className="mr-5 hover:text-red-900" to="/">
              Home
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
        </div>
      </header>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Current Stock</h2>
        <div id="stockData">{displayStockData(stockData)}</div>
      </section>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Current Month Total Stock
        </h2>
        <div id="currentMonthStockData">
          {displayCurrentMonthStockData(currentMonthStockData)}
        </div>
      </section>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <div className="flex justify-center w-full">
          <button
            type="button"
            className="w-full mr-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            onClick={() => (window.location.href = "/stock/addStock")}
          >
            Add Stock
          </button>
          <button
            type="button"
            className="w-full ml-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            onClick={() => (window.location.href = "/stock/getStock")}
          >
            View Stock
          </button>
        </div>
      </section>
    </div>
  );
};

export default Stock;
