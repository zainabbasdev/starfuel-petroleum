import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/starFeul_Petroleum.png";
import CustomeComparisonContainer from "./CustomeComparison";
import MonthComparisonContainer from "./MonthComparison";

const CompareReport = () => {
  const [showCustomComparison, setShowCustomComparison] = useState(true);

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
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Compare Reports
        </h2>
        <div className="flex justify-center mb-6">
          <button
            className={`mr-4 py-2 px-4 rounded ${
              showCustomComparison ? "bg-yellow-400 text-white" : "bg-gray-200"
            }`}
            onClick={() => setShowCustomComparison(true)}
          >
            Custom Date Comparison
          </button>
          <button
            className={`py-2 px-4 rounded ${
              !showCustomComparison ? "bg-yellow-400 text-white" : "bg-gray-200"
            }`}
            onClick={() => setShowCustomComparison(false)}
          >
            Monthly Comparison
          </button>
        </div>
        {showCustomComparison ? (
          <CustomeComparisonContainer />
        ) : (
          <MonthComparisonContainer />
        )}
      </div>
    </div>
  );
};

export default CompareReport;
