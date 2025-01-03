import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/starFeul_Petroleum.png";
import "../css/output.css";

const GetMobileOilSale = () => {
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [dailySalesData, setDailySalesData] = useState(null);
  const [monthlySalesData, setMonthlySalesData] = useState(null);
  const [yearlySalesData, setYearlySalesData] = useState(null);

  useEffect(() => {
    handleMonthChange({ target: { value: 1 } });
    setYear("2024");
  }, []);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleSubmitDate = (event) => {
    event.preventDefault();
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (!date) {
      toast.error("Please select a date.");
      return;
    }

    if (selectedDate > currentDate) {
      toast.error("You selected a future date.");
      return;
    }

    fetch(`http://localhost:5000/api/mobileOilSale/getByDate/${date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No Mobile Oil Sale found for the selected date.");
        }
        return response.json();
      })
      .then((data) => {
        setDailySalesData(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleSubmitMonth = (event) => {
    event.preventDefault();
    if (month && year) {
      const selectedYear = parseInt(year, 10);
      const selectedMonth = parseInt(month, 10) - 1;
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      if (
        selectedYear > currentYear ||
        (selectedYear === currentYear && selectedMonth > currentMonth)
      ) {
        toast.error(
          "You can only get Sale for the current month or any previous month of the current year."
        );
        return;
      }
    }

    fetch(
      `http://localhost:5000/api/mobileOilSale/getByMonth/${year}/${month}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No Mobile Oil Sale found for the selected month.");
        }
        return response.json();
      })
      .then((data) => {
        setMonthlySalesData(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleSubmitYear = (event) => {
    event.preventDefault();

    fetch(`http://localhost:5000/api/mobileOilSale/getByYear/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No Mobile Oil Sale found for the selected year.");
        }
        return response.json();
      })
      .then((data) => {
        setYearlySalesData(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const displaySalesData = (data) => {
    if (!data) return null;

    const rows = data.map((sale) => (
      <tr key={sale._id}>
        <td className="py-2 px-4 border-b text-center">{sale._id}</td>
        <td className="py-2 px-4 border-b text-center">
          {sale.totalQuantitySold.$numberDecimal}
        </td>
      </tr>
    ));

    return (
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Oil Type</th>
            <th className="py-2 px-4 border-b">Total Sale</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Get Mobile Oil Sale for a Date
        </h2>

        <form
          id="getSaleForm"
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmitDate}
        >
          {!dailySalesData && (
            <>
              <div id="getSaleforDate">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  value={date}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Get Sale
                </button>
              </div>
            </>
          )}
        </form>
        {dailySalesData && (
          <div id="salesData">{displaySalesData(dailySalesData)}</div>
        )}
      </section>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Get Mobile Oil Sale for a Month
        </h2>
        <form
          id="getSaleForMonthForm"
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmitMonth}
        >
          {!monthlySalesData && (
            <>
              <div id="getSalesByMonth">
                <div>
                  <label
                    htmlFor="Year"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Year
                  </label>
                  <select
                    id="Year"
                    name="Year"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    value={year}
                    onChange={handleYearChange}
                  >
                    {[...Array(11).keys()].map((i) => (
                      <option key={2024 + i} value={2024 + i}>
                        {2024 + i}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="month"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Month
                  </label>
                  <select
                    id="month"
                    name="month"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    value={month}
                    onChange={handleMonthChange}
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
                    ].map((m, i) => (
                      <option key={i + 1} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Get Sale
                </button>
              </div>
            </>
          )}
        </form>
        {monthlySalesData && (
          <div id="salesData">{displaySalesData(monthlySalesData)}</div>
        )}
      </section>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Get Mobile Oil Sale for a Year
        </h2>
        <form
          id="getSaleForYearForm"
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmitYear}
        >
          {!yearlySalesData && (
            <>
              <div id="getSalesByYear">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year
                </label>
                <select
                  id="year"
                  name="year"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  value={year}
                  onChange={handleYearChange}
                >
                  {[...Array(11).keys()].map((i) => (
                    <option key={2024 + i} value={2024 + i}>
                      {2024 + i}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Get Sale
                </button>
              </div>
            </>
          )}
        </form>
        {yearlySalesData && (
          <div id="salesData">{displaySalesData(yearlySalesData)}</div>
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

export default GetMobileOilSale;
