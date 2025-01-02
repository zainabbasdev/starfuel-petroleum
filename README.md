# StarFeul Petroleum: MERN Stack Web Application

## Overview

StarFeul Petroleum is a comprehensive web application designed to manage various aspects of a petroleum business, including sales, stock management, expenditures, mobile oil sales, khata (ledger) management, and generating reports. Built using the MERN stack (MongoDB, Express, React, Node.js) along with Tailwind CSS for styling, the system provides a seamless experience for managing daily operations in a petroleum business.

This repository is divided into two main parts:

- **Frontend**: The client-side of the application developed with [React](https://reactjs.org/) and styled using [Tailwind CSS](https://tailwindcss.com/).
- **Backend**: The server-side of the application built with [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/), providing APIs for managing business data.

## Features

### Frontend Features:

- **Home**:
    - Displays current stock data and previous day's sales.
- **Sales**:
    - **Add Sale**: Allows users to input new sales records.
    - **Get Sale**: Retrieve sales data for a specific date.
- **Stock**:
    - **Add Stock**: Input new stock records.
    - **Get Stock**: View the current stock data.
- **Mobile Oil**:
    - **Add Mobile Oil Sale**: Input new mobile oil sales records.
    - **Get Mobile Oil Sale**: View mobile oil sales data.
    - **Mobile Oil Stock**: Displays current month’s stock and allows adding new stock.
- **Expenditure**:
    - **Add Expenditure**: Input new expenditure records.
    - **Get Expenditure**: Retrieve yearly expenditure data.
- **Khata (Ledger)**:
    - **Add Khata**: Add new ledger records.
    - **Get Khata**: Retrieve specific person's khata records and generate a PDF report.
    - **Update Khata**: Update existing khata records.
- **Reports**:
    - **Get Report**: Fetch daily, monthly, or custom date range reports.
    - **Compare Reports**: Compare reports for different periods.
- **Dip Measurements**:
    - **Calculate Dip**: Automatically sends dip measurements to the backend for record saving.
    - **Get Dip**: Retrieve dip measurements for a specific date.

### Backend Features:

- **Sales**: Handles sales data, updating stock, and profit calculations.
- **Stock Management**: Manages stock data for fuel, including adding and retrieving stock information.
- **Mobile Oil**: Manages sales and stock data for mobile oil.
- **Expenditure**: Manages business expenditures.
- **Khata Book**: Handles ledger data, including deposits and withdrawals.
- **Reports**: Generates various reports for sales, stock, expenditures, and mobile oil sales.
- **Dip Measurements**: Records and retrieves dip measurements for fuel tanks.

## Installation

### Prerequisites:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/): Ensure MongoDB is running, and the connection URI is correctly set in the backend configuration.

### Frontend Installation:

1. Clone the repository:
     ```bash
     git clone https://github.com/zainabbasdev/starfuel-petroleum.git
     ```
2. Navigate to the frontend directory:
     ```bash
     cd Frontend
     ```
3. Install dependencies:
     ```bash
     npm install
     ```
4. Start the development server:
     ```bash
     npm start
     ```
5. Open your browser and go to `http://localhost:3000` to view the application.

### Backend Installation:

1. Clone the repository:
     ```bash
     git clone https://github.com/zainabbasdev/starfuel-petroleum.git
     ```
2. Navigate to the backend directory:
     ```bash
     cd Backend
     ```
3. Install dependencies:
     ```bash
     npm install
     ```
4. Start the server:
     ```bash
     npm start
     ```

### Configuration:

The MongoDB URI is configured in `config/db.js`. Ensure MongoDB is running and the URI is correctly set.

## Project Structure

### Frontend:

- `src/`: Contains all React components and pages styled with Tailwind CSS.
- `public/`: Contains static assets such as images and fonts.

### Backend:

- `config/`: Contains configuration files (e.g., database connection).
- `controllers/`: Contains business logic for managing various entities like sales, stock, expenditures, and more.
- `models/`: Mongoose models representing MongoDB collections.
- `routes/`: Defines API routes corresponding to controllers.
- `index.js`: Entry point for the backend server.

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
