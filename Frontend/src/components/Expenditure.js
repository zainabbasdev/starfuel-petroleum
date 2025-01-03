import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/starFeul_Petroleum.png";
import "../css/output.css";

const Expenditure = () => {
  const [currentMonthExpenditures, setCurrentMonthExpenditures] = useState([]);
  const [currentYearExpenditures, setCurrentYearExpenditures] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
    const currentYear = currentDate.getFullYear();

    fetch(
      `http://localhost:5000/api/expenditure/get-total/month/${currentYear}/${currentMonth}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentMonthExpenditures(data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch(
      `http://localhost:5000/api/expenditure/get-total/year/${currentYear}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentYearExpenditures(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const displayExpenditures = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p className="text-gray-600">No expenditure data available.</p>;
    }
    return (
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Total Expenditure</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sale, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-center">
                {sale.totalExpenditure.$numberDecimal}
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
            <Link className="mr-5 hover:text-red-900" to="/sales">
              Sales/Stock
            </Link>
            <Link className="mr-5 hover:text-red-900" to="/mobile-oil">
              Mobile Oil
            </Link>
            <Link className="mr-5 hover:text-red-900" to="/khata">
              Khata Book
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Current Month Expenditures
        </h2>
        <div id="currentMonthSalesData">
          {displayExpenditures(currentMonthExpenditures)}
        </div>
      </section>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Current Year Expenditures
        </h2>
        <div id="currentYearSalesData">
          {displayExpenditures(currentYearExpenditures)}
        </div>
      </section>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <div className="flex justify-center w-full">
          <button
            type="button"
            className="w-full mr-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            onClick={() =>
              (window.location.href = "/expenditure/addExpenditure")
            }
          >
            Add Expenditure
          </button>
          <button
            type="button"
            className="w-full ml-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            onClick={() =>
              (window.location.href = "/expenditure/getExpenditure")
            }
          >
            Get Expenditures
          </button>
        </div>
      </section>
    </div>
  );
};

export default Expenditure;
