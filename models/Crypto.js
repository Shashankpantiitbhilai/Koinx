const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    currentPriceUSD: { type: Number, required: true },
    marketCapUSD: { type: Number, required: true },
    change24h: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Crypto', cryptoSchema);
