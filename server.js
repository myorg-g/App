const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Define API endpoints
const timeseriesUrl = 'https://data.covid19india.org/v4/min/timeseries.min.json';
const currentDataUrl = 'https://data.covid19india.org/v4/min/data.min.json';

// Route to get daily numbers across states (historical data)
app.get('/api/timeseries', async (req, res) => {
    try {
        const response = await axios.get(timeseriesUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from timeseries API' });
    }
});

// Route to get current day numbers across districts and states
app.get('/api/current-data', async (req, res) => {
    try {
        const response = await axios.get(currentDataUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from current data API' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
});
