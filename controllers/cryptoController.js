const Crypto = require('../models/Crypto');
const { std } = require('mathjs');

// Controller function for /deviation API
const getDeviation = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Coin query parameter is required' });
    }

    try {
        const records = await Crypto.find({ name: new RegExp(coin, 'i') })
            .sort({ timestamp: -1 })
            .limit(100);

        if (!records || records.length === 0) {
            return res.status(404).json({ error: 'No data found for the requested coin' });
        }

        const prices = records.map(record => record.currentPriceUSD);
        const deviation = std(prices).toFixed(2);

        return res.json({ deviation: parseFloat(deviation) });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
};

// Controller function for /stats API
const getStats = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Coin query parameter is required' });
    }

    try {
        const latestRecord = await Crypto.findOne({ name: new RegExp(coin, 'i') })
            .sort({ timestamp: -1 });

        if (!latestRecord) {
            return res.status(404).json({ error: 'No data found for the requested coin' });
        }

        return res.json({
            price: latestRecord.currentPriceUSD,
            marketCap: latestRecord.marketCapUSD,
            "24hChange": latestRecord.change24h,
        });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
};

module.exports = {
    getDeviation,
    getStats
};
