require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const fetchCryptoData = require('./jobs/cryptoJob');
const statsRouter = require('./routes/stats');
const deviationRouter = require('./routes/deviation');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schedule the background job every 2 hours
cron.schedule('0 */2 * * *', async () => {
    console.log('Running scheduled crypto data fetch...');
    await fetchCryptoData();
});

// Register routes
app.use('/api', statsRouter);
app.use('/api', deviationRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
