import React from "react";
import "../css/output.css";

const Footer = () => {
  return (
    <footer
      className="bg-yellow-200 text-gray-800 mt-8 w-full"
      style={{ position: "relative", bottom: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm text-center">
            &copy; 2024 STARFEUL Petroleum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
