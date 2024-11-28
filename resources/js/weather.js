document.addEventListener('DOMContentLoaded', () => {
    const selectLocationBtn = document.getElementById('select-location');
    const mapModal = document.getElementById('map-modal');
    const closeModal = document.querySelector('.close');
    const confirmLocationBtn = document.getElementById('confirm-location');

    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('weather-description');

    let map;
    let marker;
    let selectedLocation = { lat: 40.7128, lng: -74.0060 }; // Default to New York City

    // Initialize Leaflet map
    function initMap() {
        if (map) return;
    
        map = L.map('map').setView([selectedLocation.lat, selectedLocation.lng], 12);
    
     
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    
        
        marker = L.marker([selectedLocation.lat, selectedLocation.lng], { draggable: true }).addTo(map);
    
       
        marker.on('moveend', (event) => {
            selectedLocation = event.latlng;
        });
    
        // Update selected location on map click
        map.on('click', (event) => {
            marker.setLatLng(event.latlng);
            selectedLocation = event.latlng;
        });
    }
    

    function updateWeather(lat, lon) {
        const apiKey = openWeatherApiKey; 
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; // Metric for Celsius
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Weather API Response:', data);
    
                if (data && data.main && data.weather && data.weather.length > 0) {
                    const temperature = Math.round(data.main.temp);
                    const weatherDescription = data.weather[0].description;
                    const weatherMain = data.weather[0].main.toLowerCase();
                  
                    temperatureElement.textContent = `${temperature}°C`;
                    descriptionElement.innerHTML = `${getWeatherIcon(weatherMain)} ${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}`;
                   
                } else {
                    throw new Error('Invalid weather data');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                temperatureElement.textContent = 'Error';
                descriptionElement.innerHTML = '';
               
            });
    }
    

   
    function getWeatherIcon(weatherMain) {
        const icons = {
            clear: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-sun"><path stroke="none" d="M0 0h24V0z" fill="none"/><circle cx="12" cy="12" r="4"/></svg>',
            rain: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-cloud-rain"><path stroke="none" d="M0 0h24V0z" fill="none"/><path d="M11 13v2m0 3v2m4-5v2m0 3v2"/></svg>',
            // Add more icons as needed
        };
        return icons[weatherMain] || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-question-mark"><path d="M0 0h24V0z"/></svg>'; // Default icon
    }

    selectLocationBtn.addEventListener('click', () => {
        mapModal.style.display = 'block';
        initMap();
    });

    closeModal.addEventListener('click', () => {
        mapModal.style.display = 'none';
    });

    confirmLocationBtn.addEventListener('click', () => {
        const lat = selectedLocation.lat;
        const lon = selectedLocation.lng;

        
        updateWeather(lat, lon);
        mapModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === mapModal) {
            mapModal.style.display = 'none';
        }
    });

    const dateSpan = document.getElementById('date');
    const timeSpan = document.getElementById('time');

    function updateDateTime() {
        const now = new Date();
        dateSpan.textContent = now.toLocaleDateString();
        timeSpan.textContent = now.toLocaleTimeString();
    }

    updateDateTime();
    setInterval(updateDateTime, 1000); 
});
