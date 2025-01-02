const express = require('express');
const router = express.Router();
const khataController = require('../controllers/khataBookController');

// Create or update a khata entry
router.post('/add', khataController.createKhata);

// Get khata for a specific person
router.get('/getkhata/:personName', khataController.getKhataByPerson);

// Update a khata entry
router.post('/update', khataController.updateKhata);

// Get all khata records
router.get('/getall', khataController.getAllKhata);

module.exports = router;
