# StarFeul Petroleum Backend

This repository hosts the backend code for the StarFeul Petroleum management system. The backend is developed using Node.js, Express, and MongoDB, providing various APIs to manage sales, stock, expenditures, reports, and more.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Models](#models)
- [Controllers](#controllers)
- [Routes](#routes)

## Installation

To set up the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/zainabbasdev/starfeul-petroleum.git
   cd Backend
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```

## Configuration

The MongoDB connection URI is configured in the `db.js` file. Ensure that MongoDB is running and the URI is correctly set.

## Project Structure

    .
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── amanatBookController.js
    │   ├── dipController.js
    │   ├── expenditureController.js
    │   ├── factoryController.js
    │   ├── generateReport.js
    │   ├── khataBookController.js
    │   ├── mobileOilSaleController.js
    │   ├── mobileOilStockController.js
    │   ├── reportController.js
    │   ├── salesController.js
    │   ├── stockController.js
    │   └── updateStocks.js
    ├── models/
    │   ├── DailyDIP.js
    │   ├── DailyStock.js
    │   ├── Expenditure.js
    │   ├── KhataBook.js
    │   ├── MobileOilSale.js
    │   ├── MobileOilStock.js
    │   ├── Sales.js
    │   ├── Stock.js
    │   └── StockHistory.js
    ├── routes/
    │   ├── dipRoutes.js
    │   ├── expenditure.js
    │   ├── mobileOilSale.js
    │   ├── mobileOilStock.js
    │   ├── reportRoutes.js
    │   ├── sales.js
    │   ├── khataBookRoutes.js
    │   └── stock.js
    ├── .gitignore
    ├── index.js
    ├── package.json
    └── README.md

## Models

The models, defined using Mongoose, are located in the `models` directory. Each model represents a collection in the MongoDB database.

## Controllers

The controllers, located in the `controllers` directory, handle the business logic. Each controller corresponds to a specific model and provides functions to manage various operations.

## Routes

The routes, located in the `routes` directory, define the API endpoints. Each route file corresponds to a specific controller and maps HTTP requests to controller functions.
