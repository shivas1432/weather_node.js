/******/ (() => { // webpackBootstrap
/*!*********************************!*\
  !*** ./resources/js/forcast.js ***!
  \*********************************/
document.addEventListener("DOMContentLoaded", function () {
  var dayForecastElement = document.getElementById("day-forecast");
  var weeklyForecastElement = document.getElementById("weekly-forecast");
  var monthlyForecastElement = document.getElementById("monthly-forecast");
  var forecastType = forecastType || 'hourly'; // Default to 'hourly' if not set

  // Fetch and display forecast data based on forecastType
  fetchForecastData(forecastType);
  function fetchForecastData(type) {
    var apiKey = openWeatherApiKey;
    var location = 'New York'; // Update with dynamic location if needed
    var url = '';
    if (type === 'hourly') {
      url = "https://api.openweathermap.org/data/2.5/forecast?q=".concat(location, "&appid=").concat(apiKey, "&units=metric");
    } else if (type === '7-day') {
      url = "https://api.openweathermap.org/data/2.5/onecall?lat=40.7128&lon=-74.0060&exclude=hourly,minutely&appid=".concat(apiKey, "&units=metric");
    } else if (type === 'monthly') {
      // Monthly data is not available directly; you might need a combination of daily data
      // For example, use the 16-day forecast API and aggregate the data.
      url = "https://api.openweathermap.org/data/2.5/forecast/daily?q=".concat(location, "&cnt=30&appid=").concat(apiKey, "&units=metric");
    } else {
      console.error('Invalid forecast type');
      return;
    }
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (type === 'hourly') {
        updateHourlyForecast(data);
      } else if (type === '7-day') {
        update7DayForecast(data);
      } else if (type === 'monthly') {
        updateMonthlyForecast(data);
      }
    })["catch"](function (error) {
      console.error('Error fetching forecast data:', error);
    });
  }
  function updateHourlyForecast(data) {
    if (dayForecastElement) {
      // Update hourly forecast here
      // Example: showing the first few hours of the forecast
      var hours = data.list.slice(0, 12); // Example: first 12 hours
      var forecastHTML = hours.map(function (item) {
        var time = new Date(item.dt * 1000).toLocaleTimeString();
        var temp = Math.round(item.main.temp);
        var description = item.weather[0].description;
        return "<p>".concat(time, ": ").concat(description.charAt(0).toUpperCase() + description.slice(1), ", ").concat(temp, "\xB0C</p>");
      }).join('');
      dayForecastElement.innerHTML = forecastHTML;
    }
  }
  function update7DayForecast(data) {
    if (weeklyForecastElement) {
      // Update 7-day forecast here
      var dailyForecasts = data.daily;
      var forecastHTML = dailyForecasts.map(function (day) {
        var date = new Date(day.dt * 1000).toLocaleDateString();
        var temp = Math.round(day.temp.day);
        var description = day.weather[0].description;
        return "<p>".concat(date, ": ").concat(description.charAt(0).toUpperCase() + description.slice(1), ", ").concat(temp, "\xB0C</p>");
      }).join('');
      weeklyForecastElement.innerHTML = forecastHTML;
    }
  }
  function updateMonthlyForecast(data) {
    if (monthlyForecastElement) {
      // Update monthly forecast here
      // Placeholder example
      monthlyForecastElement.innerHTML = "<p>Monthly forecast data is not available directly from this API. Use a combination of daily data or another source.</p>";
    }
  }
});
/******/ })()
;