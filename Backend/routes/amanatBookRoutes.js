const express = require('express');
const router = express.Router();
const AmanatController = require('../controllers/amanatBookController');

// Create or update a khata entry
router.post('/add', AmanatController.createAmanat);

// Get khata for a specific person
router.get('/getamanat/:personName', AmanatController.getAmanatByPerson);

// Update a khata entry
router.post('/update', AmanatController.updateAmanat);

// Get all khata records
router.get('/getall', AmanatController.getAllAmanat);

module.exports = router;
