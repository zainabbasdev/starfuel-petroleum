const KhataBook = require("../models/KhataBook");

// Create a new khata record for a person
exports.createKhata = async (req, res) => {
  try {
    const { personName, transactionType, amount, description, phoneNumber } =
      req.body;
    let khata = await KhataBook.findOne({ personName });

    // If the person does not have an existing khata, create a new one
    if (!khata) {
      khata = new KhataBook({ personName });
    }

    // Update balance based on transaction type
    if (transactionType === "Udhar") {
      khata.balance += amount;
    } else if (transactionType === "Wapsi") {
      khata.balance -= amount;
    }

    // Add the new transaction
    khata.transactions.push({
      transactionType,
      description,
      amount,
      netBalance: khata.balance,
    });
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

exports.updateKhata = async (req, res) => {
  try {
    const { personName, transactionType, amount, description } = req.body;
    let khata = await KhataBook.findOne({ personName });

    // If the person does not have an existing khata, return an error
    if (!khata) {
      return res.status(404).json({ message: "Khata not found!" });
    }

    // Update balance based on transaction type
    if (transactionType === "Udhar") {
      khata.balance += parseInt(amount);
    } else if (transactionType === "Wapsi") {
      khata.balance -= parseInt(amount);
    }

    // Add the new transaction
    khata.transactions.push({
      transactionType,
      description,
      amount,
      netBalance: khata.balance,
    });
    //add some waiting time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check if balance is zero and delete the khata if true
    if (khata.balance === 0) {
      khata.transactions.push({
        transactionType: "NIL",
        description: "Balance is zero",
        amount: 0,
        netBalance: 0,
      });
      await khata.save();
      return res.status(200).json({
        message: "Khata balance is zero, NIL transaction added",
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
exports.getKhataByPerson = async (req, res) => {
  try {
    const { personName } = req.params;
    const khata = await KhataBook.findOne({ personName });

    if (!khata) {
      return res
        .status(404)
        .json({ message: "No khata found for this person" });
    }

    res.status(200).json(khata);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving khata", error });
  }
};

// Get all khata records
exports.getAllKhata = async (req, res) => {
  try {
    const khataList = await KhataBook.find();
    res.status(200).json(khataList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving khata records", error });
  }
};
