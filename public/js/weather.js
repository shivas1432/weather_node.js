/******/ (() => { // webpackBootstrap
/*!*********************************!*\
  !*** ./resources/js/weather.js ***!
  \*********************************/
document.addEventListener('DOMContentLoaded', function () {
  var selectLocationBtn = document.getElementById('select-location');
  var mapModal = document.getElementById('map-modal');
  var closeModal = document.querySelector('.close');
  var confirmLocationBtn = document.getElementById('confirm-location');
  var temperatureElement = document.getElementById('temperature');
  var descriptionElement = document.getElementById('weather-description');
  var map;
  var marker;
  var selectedLocation = {
    lat: 40.7128,
    lng: -74.0060
  }; // Default to New York City

  // Initialize Leaflet map
  function initMap() {
    if (map) return;
    map = L.map('map').setView([selectedLocation.lat, selectedLocation.lng], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    marker = L.marker([selectedLocation.lat, selectedLocation.lng], {
      draggable: true
    }).addTo(map);
    marker.on('moveend', function (event) {
      selectedLocation = event.latlng;
    });

    // Update selected location on map click
    map.on('click', function (event) {
      marker.setLatLng(event.latlng);
      selectedLocation = event.latlng;
    });
  }
  function updateWeather(lat, lon) {
    var apiKey = openWeatherApiKey;
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lon, "&appid=").concat(apiKey, "&units=metric"); // Metric for Celsius

    fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log('Weather API Response:', data);
      if (data && data.main && data.weather && data.weather.length > 0) {
        var temperature = Math.round(data.main.temp);
        var weatherDescription = data.weather[0].description;
        var weatherMain = data.weather[0].main.toLowerCase();
        temperatureElement.textContent = "".concat(temperature, "\xB0C");
        descriptionElement.innerHTML = "".concat(getWeatherIcon(weatherMain), " ").concat(weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1));
      } else {
        throw new Error('Invalid weather data');
      }
    })["catch"](function (error) {
      console.error('Error fetching weather data:', error);
      temperatureElement.textContent = 'Error';
      descriptionElement.innerHTML = '';
    });
  }
  function getWeatherIcon(weatherMain) {
    var icons = {
      clear: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-sun"><path stroke="none" d="M0 0h24V0z" fill="none"/><circle cx="12" cy="12" r="4"/></svg>',
      rain: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-cloud-rain"><path stroke="none" d="M0 0h24V0z" fill="none"/><path d="M11 13v2m0 3v2m4-5v2m0 3v2"/></svg>'
      // Add more icons as needed
    };
    return icons[weatherMain] || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-question-mark"><path d="M0 0h24V0z"/></svg>'; // Default icon
  }
  selectLocationBtn.addEventListener('click', function () {
    mapModal.style.display = 'block';
    initMap();
  });
  closeModal.addEventListener('click', function () {
    mapModal.style.display = 'none';
  });
  confirmLocationBtn.addEventListener('click', function () {
    var lat = selectedLocation.lat;
    var lon = selectedLocation.lng;
    updateWeather(lat, lon);
    mapModal.style.display = 'none';
  });
  window.addEventListener('click', function (event) {
    if (event.target === mapModal) {
      mapModal.style.display = 'none';
    }
  });
  var dateSpan = document.getElementById('date');
  var timeSpan = document.getElementById('time');
  function updateDateTime() {
    var now = new Date();
    dateSpan.textContent = now.toLocaleDateString();
    timeSpan.textContent = now.toLocaleTimeString();
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);
});
/******/ })()
;