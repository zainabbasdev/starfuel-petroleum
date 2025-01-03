import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/starFeul_Petroleum.png";
import html2pdf from "html-to-pdf-js";
import "../css/font.css";
import "../css/output.css";

const GetKhata = () => {
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [khata, setKhata] = useState(null);

  // Ref for the khata section to print
  const khataRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/khata/getall")
      .then((response) => response.json())
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        console.error("Error fetching khatas:", error);
      });
  }, []);

  const handlePersonChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedPerson) {
      fetch(`http://localhost:5000/api/khata/getkhata/${selectedPerson}`)
        .then((response) => response.json())
        .then((data) => {
          data.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

          setKhata(data);
        })
        .catch((error) => {
          console.error("Error fetching khata:", error);
        });
    }
  };

  const filterTransactions = () => {
    const selectedTypes = Array.from(
      document.querySelectorAll(".transaction-filter:checked")
    ).map((cb) => cb.value);
    document.querySelectorAll(".transaction-row").forEach((row) => {
      if (selectedTypes.includes(row.dataset.type)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  };

  const handlePrint = () => {
    if (khataRef.current) {
      const printButtons = document.querySelectorAll(".no-print");
      printButtons.forEach((btn) => (btn.style.display = "none"));

      const element = khataRef.current;

      // Clone content to add header for printing
      const clonedContent = element.cloneNode(true);

      // Add a custom header
      const header = document.createElement("div");
      header.innerHTML = `
  <header
  style="
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    font-family: Arial, sans-serif;
    border-bottom: 2px solid #000;
    margin-bottom: 20px;
  "
>
  <div style="display: flex; align-items: center;">
    <img
      src="${logo}" 
      alt="Logo"
      style="
        width: 48px; 
        height: 48px; 
        background-color: #FFC107; 
        border-radius: 50%; 
        padding: 5px;
      "
    />
    <h1 style="margin-left: 15px; font-size: 20px; font-weight: bold;">STARFEUL PETROLEUM</h1>
  </div>
  <div style="text-align: right;">
    <p
      style="
        margin: 0; 
        font-size: 18px; 
        font-family: 'Jameel Noori Nastaleeq', serif; 
        line-height: 1.2;
      "
    >
      معیار اور مقدار کا ضامن
    </p>
    <p style="margin: 5px 0 0 0; font-size: 14px;">Ph: +92 302 6743668</p>
  </div>
</header>


`;
      clonedContent.prepend(header);

      // Configure PDF options
      const options = {
        margin: [0.5, 0.5], // Top and Side Margins in inches
        filename: `${selectedPerson}-Khata.pdf`,
        html2canvas: { scale: 3 }, // Higher scale for better quality
        jsPDF: { unit: "in", format: [12, 8.5], orientation: "landscape" }, // Custom wide dimensions
      };

      // Generate PDF
      html2pdf().set(options).from(clonedContent).save();
    }
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
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Get Khata</h2>
        <form
          id="getKhataForPersonForm"
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmit}
        >
          <div id="getKhataByPerson">
            <div>
              <label
                htmlFor="personDropdown"
                className="block text-sm font-medium text-gray-700"
              >
                Select Person
              </label>
              <select
                id="personDropdown"
                name="personDropdown"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                value={selectedPerson}
                onChange={handlePersonChange}
              >
                <option value="">Select a person</option>
                {persons.map((person) => (
                  <option key={person.personName} value={person.personName}>
                    {person.personName}
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
              Get Khata
            </button>
          </div>
        </form>
      </section>

      {khata && (
        <section
          id="khataDisplay"
          ref={khataRef}
          className="mt-6 bg-white p-6 rounded-lg shadow-md"
        >
          {/* Inline styles for print-specific behavior */}
          <style>
            {`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}
          </style>

          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {khata.personName}'s Khata
              </h2>
              <p className="mb-4">Ph Number: {khata.phoneNumber}</p>
              <p className="mb-4">Total Udhar: {khata.balance}</p>
            </div>

            <div>
              <button
                onClick={handlePrint}
                className="no-print text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 py-2 px-4 rounded-md"
              >
                Print
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <label className="mr-2">
              <input
                type="checkbox"
                className="transaction-filter"
                value="Udhar"
                defaultChecked
                onChange={filterTransactions}
              />{" "}
              Udhar
            </label>
            <label className="mr-2">
              <input
                type="checkbox"
                className="transaction-filter"
                value="Wapsi"
                defaultChecked
                onChange={filterTransactions}
              />{" "}
              Wapsi
            </label>
          </div>

          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Transaction Type</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Net Udhar</th>
              </tr>
            </thead>
            <tbody>
              {khata.transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="transaction-row"
                  data-type={transaction.transactionType}
                  style={{
                    backgroundColor:
                      transaction.transactionType === "Wapsi"
                        ? "#d1e7dd"
                        : transaction.transactionType === "Udhar"
                        ? "#f8d7da"
                        : "#ffffff",
                  }}
                >
                  <td className="py-2 px-4 border-b text-center">
                    {new Date(transaction.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {transaction.description}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {transaction.transactionType}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {transaction.amount}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {transaction.netBalance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default GetKhata;
