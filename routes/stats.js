const express = require('express');
const router = express.Router();
const Crypto = require('../models/Crypto');

router.get('/stats', async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Coin query parameter is required' });
    }

    const latestRecord = await Crypto.findOne({ name: new RegExp(coin, 'i') })
        .sort({ timestamp: -1 });

    if (!latestRecord) {
        return res.status(404).json({ error: 'No data found for the requested coin' });
    }

    res.json({
        price: latestRecord.currentPriceUSD,
        marketCap: latestRecord.marketCapUSD,
        "24hChange": latestRecord.change24h,
    });
});

module.exports = router;
