import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Sales from "./components/Sales";
import Stock from "./components/Stock";
import MobileOil from "./components/MobileOil";
import Expenditure from "./components/Expenditure";
import Khata from "./components/Khata";
import Dip from "./components/Dip";
import AddStock from "./components/addStock";
import AddSale from "./components/addSale";
import GetSale from "./components/getSale";
import GetStock from "./components/getStock";
import AddMobileOilSale from "./components/addMobileOilSale";
import GetMobileOilSale from "./components/getMobileOilSale";
import MobileOilStock from "./components/MobileOilStock";
import AddMobileOilStock from "./components/addMobileOilStock";
import AddExpenditure from "./components/addExpenditure";
import GetExpenditure from "./components/getExpenditure";
import AddKhata from "./components/addKhata";
import GetKhata from "./components/getKhata";
import UpdateKhata from "./components/updateKhata";
import GetReport from "./components/getReport";
import Footer from "./components/Footer";
import CompareReport from "./components/CompareReport";
import "./css/output.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/mobile-oil" element={<MobileOil />} />
        <Route path="/khata" element={<Khata />} />
        <Route path="/expenditure" element={<Expenditure />} />
        <Route path="/dip" element={<Dip />} />
        <Route path="/stock/addStock" element={<AddStock />} />
        <Route path="/sales/addSale" element={<AddSale />} />
        <Route path="/sales/getSale" element={<GetSale />} />
        <Route path="/stock/getStock" element={<GetStock />} />
        <Route
          path="/mobile-oil/addMobileOilSale"
          element={<AddMobileOilSale />}
        />
        <Route path="/mobile-oil/getMobileOil" element={<GetMobileOilSale />} />
        <Route path="/mobile-oil/mobileOilStock" element={<MobileOilStock />} />
        <Route
          path="/mobile-oil/mobileOilStock/addMobileOilStock"
          element={<AddMobileOilStock />}
        />
        <Route
          path="/expenditure/addExpenditure"
          element={<AddExpenditure />}
        />
        <Route
          path="/expenditure/getExpenditure"
          element={<GetExpenditure />}
        />
        <Route path="/khata/addKhata" element={<AddKhata />} />
        <Route path="/khata/getKhata" element={<GetKhata />} />
        <Route path="/khata/updateKhata" element={<UpdateKhata />} />
        <Route path="/getReport" element={<GetReport />} />
        <Route path="/compare-report" element={<CompareReport />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
