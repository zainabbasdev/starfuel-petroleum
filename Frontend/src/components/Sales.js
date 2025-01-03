import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/starFeul_Petroleum.png";
import "../css/output.css";

const Sales = () => {
  const [previousDaySales, setPreviousDaySales] = useState([]);
  const [currentMonthSales, setCurrentMonthSales] = useState([]);

  useEffect(() => {
    const previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 1);
    const formattedDate = previousDate.toISOString().split("T")[0];

    fetch(
      `http://localhost:5000/api/sales/getTotalSalesByDay/${formattedDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPreviousDaySales(data);
      })
      .catch((error) => {
        console.log(error);
      });

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
    const currentYear = currentDate.getFullYear();

    fetch(
      `http://localhost:5000/api/sales/getTotalSalesByMonth/${currentYear}/${currentMonth}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentMonthSales(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const displaySalesData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p className="text-gray-600">No sales data available.</p>;
    }
    return (
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Fuel</th>
            <th className="py-2 px-4 border-b">Total Sale</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sale) => (
            <tr key={sale._id}>
              <td className="py-2 px-4 border-b text-center">{sale._id}</td>
              <td className="py-2 px-4 border-b text-center">
                {sale.totalSales.$numberDecimal}
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
          <button
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={() => (window.location.href = "/stock")}
          >
            Stock
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
          Previous Day Sales
        </h2>
        <div id="previousDaySalesData">
          {displaySalesData(previousDaySales)}
        </div>
      </section>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Current Month Sales
        </h2>
        <div id="currentMonthSalesData">
          {displaySalesData(currentMonthSales)}
        </div>
      </section>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <div className="flex justify-center w-full">
          <button
            type="button"
            className="w-full mr-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            onClick={() => (window.location.href = "/sales/addSale")}
          >
            Add Sale
          </button>
          <button
            type="button"
            className="w-full ml-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            onClick={() => (window.location.href = "/sales/getSale")}
          >
            Get Sale
          </button>
        </div>
      </section>
    </div>
  );
};

export default Sales;
