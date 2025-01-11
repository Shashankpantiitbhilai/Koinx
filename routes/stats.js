const express = require('express');
const router = express.Router();
const {getStats } = require('../controllers/cryptoController');

// Route for getting the deviation

// Route for getting the stats
router.get('/stats', getStats);

module.exports = router;
