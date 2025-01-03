import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/starFeul_Petroleum.png";
import "../css/output.css";

const Home = () => {
  const [stockData, setStockData] = useState([]);
  const [previousDaySalesData, setPreviousDaySalesData] = useState([]);
  const dipNotificationShown = useRef(false);
  const salesNotificationShown = useRef(false);
  const mobileOilNotificationShown = useRef(false);
  const expenditureNotificationShown = useRef(false);
  const khataBookNotificationShown = useRef(false);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    fetch(`http://localhost:5000/api/reports/date/${currentDate}`)
      .then((response) => response.json())
      .then((data) => {
        const {
          dipMeasurements,
          sales,
          mobileOilSales,
          expenditures,
          udharTransactions,
          wapsiTransactions,
        } = data;
        if (dipMeasurements.length === 0 && !dipNotificationShown.current) {
          showNotification("You didn't update Dip Measurements");
          dipNotificationShown.current = true;
        }
        if (sales.length === 0 && !salesNotificationShown.current) {
          showNotification("You didn't update Sales");
          salesNotificationShown.current = true;
        }
        if (
          mobileOilSales.length === 0 &&
          !mobileOilNotificationShown.current
        ) {
          showNotification("You didn't update Mobile Oil Sales");
          mobileOilNotificationShown.current = true;
        }
        if (
          expenditures.length === 0 &&
          !expenditureNotificationShown.current
        ) {
          showNotification("You didn't update Expenditures");
          expenditureNotificationShown.current = true;
        }
        if (
          udharTransactions.length === 0 &&
          wapsiTransactions.length === 0 &&
          !khataBookNotificationShown.current
        ) {
          showNotification("You didn't update Khata Book");
          khataBookNotificationShown.current = true;
        }
      });

    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);
    const previousDayDate = previousDay.toISOString().split("T")[0];

    fetch(
      `http://localhost:5000/api/sales/getTotalSalesByDay/${previousDayDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPreviousDaySalesData(data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("http://localhost:5000/api/stock/get", {
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
        if (error.response && error.response.status === 404) {
          toast.error("No stock data found");
        }
        console.log(error);
      });
  }, []); // Empty dependency array ensures this runs only on mount

  const showNotification = (message) => {
    toast.info(message);
  };

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
          </tr>
        </thead>
        <tbody>
          {data.map((stock, index) => (
            <tr key={`${stock._id}-${index}`}>
              <td className="py-2 px-4 border-b text-sm text-gray-600 text-center">
                {stock._id}
              </td>
              <td className="py-2 px-4 border-b text-sm text-gray-600 text-center">
                {parseFloat(stock.totalLiters.$numberDecimal).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const displayPreviousDaySales = (data) => {
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
          {data.map((sale, index) => (
            <tr key={`${sale._id}-${index}`}>
              <td className="py-2 px-4 border-b text-center">{sale._id}</td>
              <td className="py-2 px-4 border-b text-center">
                {parseFloat(sale.totalSales.$numberDecimal).toFixed(2)}
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
            <Link className="mr-5 hover:text-red-900" to="/sales">
              Sale/Stock
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
            onClick={() => (window.location.href = "/dip")}
          >
            DIP
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Current Stock</h2>
        <div id="stockData">{displayStockData(stockData)}</div>
      </section>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Previous Day Sales
        </h2>
        <div id="previousDaySalesData">
          {displayPreviousDaySales(previousDaySalesData)}
        </div>
      </section>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="w-full mr-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            onClick={() => (window.location.href = "/getReport")}
          >
            Get Report
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
