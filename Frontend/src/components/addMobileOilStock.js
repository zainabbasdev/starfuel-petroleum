import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/starFeul_Petroleum.png";
import "../css/output.css";

const AddMobileOilStock = () => {
  const [oilType, setOilType] = useState("Shell Advance");
  const [litersAdded, setLitersAdded] = useState("");
  const [pricePerLiter, setPricePerLiter] = useState("");

  const handleOilTypeChange = (event) => {
    setOilType(event.target.value);
  };

  const handleLitersAddedChange = (event) => {
    setLitersAdded(event.target.value);
  };

  const handlePricePerLiterChange = (event) => {
    setPricePerLiter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const stockData = { oilType, litersAdded, pricePerLiter };

    fetch("http://localhost:5000/api/mobileOilStock/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stockData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Mobile Oil Stock Added Successfully");
        setOilType("Shell Advance");
        setLitersAdded("");
        setPricePerLiter("");
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please try again later");
      });
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
          Add Mobile Oil Stock
        </h2>
        <form
          id="addStockForm"
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="oilType"
              className="block text-sm font-medium text-gray-700"
            >
              Oil Type
            </label>
            <select
              id="oilType"
              name="oilType"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={oilType}
              onChange={handleOilTypeChange}
            >
              <option value="Shell Advance">Shell Advance</option>
              <option value="Havolin Small 750 ml">Havolin Small 750 ml</option>
              <option value="Havolin Large 1 l">Havolin Large 1 l</option>
              <option value="Shell R1">Shell R1</option>
              <option value="Shell R2">Shell R2</option>
              <option value="Khula Oil">Khula Oil</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="litersAdded"
              className="block text-sm font-medium text-gray-700"
            >
              Liters Added
            </label>
            <input
              type="number"
              id="litersAdded"
              name="litersAdded"
              step="0.01"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={litersAdded}
              onChange={handleLitersAddedChange}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div>
            <label
              htmlFor="pricePerLiter"
              className="block text-sm font-medium text-gray-700"
            >
              Price Per Liter
            </label>
            <input
              type="number"
              id="pricePerLiter"
              name="pricePerLiter"
              step="0.01"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={pricePerLiter}
              onChange={handlePricePerLiterChange}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Add Stock
            </button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </div>
  );
};

export default AddMobileOilStock;