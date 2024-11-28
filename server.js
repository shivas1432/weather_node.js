require('dotenv').config({ path: './weather.env' });
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/resources/views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


// Route for the home page
app.get('/', async (req, res) => {
    res.render('index', { title: 'weather'});
});
app.get('/weather-news', async (req, res) => {
    const weatherNews = await getWeatherNews();
    res.render('weather-news', { title: 'news', weatherNews });
});

// Route for hourly forecast
app.get('/hourly-forecast', (req, res) => {
    res.render('forecast', { forecastType: 'hourly' });
});

// Route for 7-day forecast
app.get('/7-day-forecast', (req, res) => {
    res.render('forecast', { forecastType: '7-day' });
});

// Route for monthly forecast
app.get('/monthly-forecast', (req, res) => {
    res.render('forecast', { forecastType: 'monthly' });
});

// Route for weather dashboard
app.get('/weather-dashboard', (req, res) => {
    res.render('index', { title: 'My Weather App' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

