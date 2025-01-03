import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import logo from "../assets/starFeul_Petroleum.png";
import "../css/output.css";

const AddSale = () => {
  const [fuelType, setFuelType] = useState("Petrol");
  const [litersSold, setLitersSold] = useState("");
  const [shift, setShift] = useState("day");
  const [pricePerLiter, setPricePerLiter] = useState("");

  const handleFuelTypeChange = (event) => {
    setFuelType(event.target.value);
  };

  const handleLitersSoldChange = (event) => {
    setLitersSold(event.target.value);
  };

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handlePricePerLiterChange = (event) => {
    setPricePerLiter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const saleData = { fuelType, litersSold, shift, pricePerLiter };

    fetch("http://localhost:5000/api/sales/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saleData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Sale Added Successfully");
          setFuelType("Petrol");
          setLitersSold("");
          setShift("day");
          setPricePerLiter("");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Sale</h2>
        <form
          id="addSaleForm"
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="fuelType"
              className="block text-sm font-medium text-gray-700"
            >
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={fuelType}
              onChange={handleFuelTypeChange}
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="litersSold"
              className="block text-sm font-medium text-gray-700"
            >
              Liters Sold
            </label>
            <input
              type="number"
              name="litersSold"
              id="litersSold"
              step="0.01"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={litersSold}
              onChange={handleLitersSoldChange}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div>
            <label
              htmlFor="shift"
              className="block text-sm font-medium text-gray-700"
            >
              Shift
            </label>
            <select
              id="shift"
              name="shift"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={shift}
              onChange={handleShiftChange}
            >
              <option value="day">Day</option>
              <option value="night">Night</option>
            </select>
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
              name="pricePerLiter"
              id="pricePerLiter"
              step="0.01"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-500 sm:text-sm"
              value={pricePerLiter}
              onChange={handlePricePerLiterChange}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Add Sale
          </button>
        </form>
      </section>
      <ToastContainer />
    </div>
  );
};

export default AddSale;
