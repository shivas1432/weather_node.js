# Weather Node.js Application

This is a **Weather Web Application** built using **Node.js**, **Express**, and **EJS** templating engine. The app allows users to view real-time weather updates, forecasts (hourly, 7-day, and monthly), and other weather-related news. The data is retrieved using the **OpenWeather API**, which provides weather details based on location.

### Features:
- **Weather Dashboard**: Display the current weather conditions.
- **Hourly Forecast**: View the weather conditions for the next 24 hours.
- **7-Day Forecast**: Get the weather forecast for the upcoming week.
- **Monthly Forecast**: View the weather for the upcoming month.
- **Weather News**: Read the latest weather-related news articles.

### Tech Stack:
- **Node.js**: JavaScript runtime for backend development.
- **Express**: Web framework for building the server and routing.
- **EJS**: Templating engine for rendering dynamic content in views.
- **Axios**: Promise-based HTTP client for making API requests.
- **OpenWeather API**: For fetching real-time weather data.
- **Leaflet.js**: For displaying weather maps in the app.

---

## Setup Instructions

### 1. **Clone the repository**
   First, clone the project repository to your local machine:

   git clone https://github.com/shivas1432/weather_node.js.git
   cd weather
2. Install Dependencies
Install all the required dependencies by running:

npm install
3. Set Up Environment Variables
Create a .env file in the root directory of your project and add your OpenWeather API key. It should look like this:

OPENWEATHERMAP_API_KEY=< ADD YOUR API KEY>
To get an OpenWeather API key, go to OpenWeather, sign up, and generate your API key.

4. Start the Server
Run the server with the following command:

npm run dev
This will start the server on http://localhost:3000.

## **Application Structure**
app.js: The main application entry file where routes and API integrations are handled.
views/: Contains all the EJS views (HTML templates).
index.ejs: Home page showing the current weather.
forecast.ejs: Used to display hourly, 7-day, and monthly forecasts.
weather-news.ejs: Displays the latest weather-related news.
partials/: Contains partial views (e.g., header).
public/: Contains static assets like stylesheets and JavaScript files.
weather.env: Environment configuration file where API keys and other environment-specific variables are stored.
public/js/: Contains client-side JavaScript for interactivity.
sidebar.js: Handles sidebar functionality.
weather.js: Contains logic for fetching and displaying weather data.
forecast.js: Handles the logic for fetching forecast data.

Routes:
/weather-dashboard: Displays the current weather.
/hourly-forecast: Displays hourly weather forecast.
/7-day-forecast: Displays a 7-day weather forecast.
/monthly-forecast: Displays a monthly weather forecast.
/weather-news: Shows weather news articles.


Notes:
### **This application is built as a practice project using Node.js.**
All functionalities, such as weather data fetching and forecast display, are handled by the OpenWeather API.
The project uses EJS for dynamic rendering of views, which enables a responsive and interactive user interface.
