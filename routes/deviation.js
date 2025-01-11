const express = require('express');
const router = express.Router();
const Crypto = require('../models/Crypto');
const { std } = require('mathjs');

router.get('/deviation', async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Coin query parameter is required' });
    }

    const records = await Crypto.find({ name: new RegExp(coin, 'i') })
        .sort({ timestamp: -1 })
        .limit(100);

    if (!records || records.length === 0) {
        return res.status(404).json({ error: 'No data found for the requested coin' });
    }

    const prices = records.map(record => record.currentPriceUSD);
    const deviation = std(prices).toFixed(2);

    res.json({ deviation: parseFloat(deviation) });
});

module.exports = router;
