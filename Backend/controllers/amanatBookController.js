const KhataBook = require("../models/AmanatBook");

// Create a new khata record for a person
exports.createAmanat = async (req, res) => {
  try {
    const { personName, transactionType, amount, description, phoneNumber } =
      req.body;
    let khata = await KhataBook.findOne({ personName });

    // If the person does not have an existing khata, create a new one
    if (!khata) {
      khata = new KhataBook({ personName });
    }

    // Update balance based on transaction type
    if (transactionType === "Amanti") {
      khata.balance += amount;
    } else if (transactionType === "Wapas Liay") {
      khata.balance -= amount;
    }

    // Add the new transaction
    khata.transactions.push({ transactionType, description, amount });
    khata.phoneNumber = phoneNumber;

    // Save the khata record
    await khata.save();
    res
      .status(200)
      .json({ message: "Transaction recorded successfully", khata });
  } catch (error) {
    res.status(500).json({ message: "Error recording transaction", error });
  }
};

exports.updateAmanat = async (req, res) => {
  try {
    const { personName, transactionType, amount, description } = req.body;
    let khata = await KhataBook.findOne({ personName });

    // If the person does not have an existing khata, create a new one
    if (!khata) {
      res.status(404).json({ message: "Amanat not found!" });
    }

    // Update balance based on transaction type
    if (transactionType === "Amanti") {
      khata.balance += parseInt(amount);
    } else if (transactionType === "Wapas Liay") {
      khata.balance -= parseInt(amount);
    }

    // Add the new transaction
    khata.transactions.push({ transactionType, description, amount });

    // Check if balance is zero and add a transaction named NIL
    if (khata.balance === 0) {
      khata.transactions.push({
        transactionType: "NIL",
        description: "Balance is zero",
        amount: 0,
      });
      await khata.save();
      return res
        .status(200)
        .json({
          message: "Amanat Balance is Zero. Nil Transaction Added",
          khata,
        });
    }
    // Save the khata record
    await khata.save();
    res
      .status(200)
      .json({ message: "Transaction recorded successfully", khata });
  } catch (error) {
    res.status(500).json({ message: "Error recording transaction", error });
  }
};

// Get khata for a person
exports.getAmanatByPerson = async (req, res) => {
  try {
    const { personName } = req.params;
    const khata = await KhataBook.findOne({ personName });

    if (!khata) {
      return res
        .status(404)
        .json({ message: "No Amanat found for this person" });
    }

    res.status(200).json(khata);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Amanat", error });
  }
};

// Get all khata records
exports.getAllAmanat = async (req, res) => {
  try {
    const khataList = await KhataBook.find();
    res.status(200).json(khataList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Amanat records", error });
  }
};
