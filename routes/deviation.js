

const express = require('express');
const router = express.Router();
const { getDeviation } = require('../controllers/cryptoController');

// Route for getting the deviation
router.get('/deviation', getDeviation);

// Route for getting the stats


module.exports = router;
