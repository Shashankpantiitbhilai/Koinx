const axios = require('axios');
const Crypto = require('../models/Crypto');

const COINS = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'matic-network', name: 'Matic', symbol: 'MATIC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
];





const fetchCryptoData = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: COINS.map(c => c.id).join(','),
                vs_currencies: 'usd',
                include_market_cap: true,
                include_24hr_change: true,
            },
        });

        const data = response.data;

        for (const coin of COINS) {
            const { id, name, symbol } = coin;
            const coinData = data[id];

            if (coinData) {
                await Crypto.create({
                    name,
                    symbol,
                    currentPriceUSD: coinData.usd,
                    marketCapUSD: coinData.usd_market_cap,
                    change24h: coinData.usd_24h_change,
                });
            }
        }

        console.log('Crypto data updated successfully');
    } catch (error) {
        console.error('Error fetching crypto data:', error.message);
    }
};

module.exports = fetchCryptoData;
