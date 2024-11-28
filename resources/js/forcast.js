document.addEventListener("DOMContentLoaded", function () {
    const dayForecastElement = document.getElementById("day-forecast");
    const weeklyForecastElement = document.getElementById("weekly-forecast");
    const monthlyForecastElement = document.getElementById("monthly-forecast");
    const forecastType = forecastType || 'hourly'; // Default to 'hourly' if not set

    // Fetch and display forecast data based on forecastType
    fetchForecastData(forecastType);

    function fetchForecastData(type) {
        const apiKey = openWeatherApiKey;
        const location = 'New York'; // Update with dynamic location if needed
        let url = '';

        if (type === 'hourly') {
            url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
        } else if (type === '7-day') {
            url = `https://api.openweathermap.org/data/2.5/onecall?lat=40.7128&lon=-74.0060&exclude=hourly,minutely&appid=${apiKey}&units=metric`;
        } else if (type === 'monthly') {
            // Monthly data is not available directly; you might need a combination of daily data
            // For example, use the 16-day forecast API and aggregate the data.
            url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&cnt=30&appid=${apiKey}&units=metric`;
        } else {
            console.error('Invalid forecast type');
            return;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (type === 'hourly') {
                    updateHourlyForecast(data);
                } else if (type === '7-day') {
                    update7DayForecast(data);
                } else if (type === 'monthly') {
                    updateMonthlyForecast(data);
                }
            })
            .catch(error => {
                console.error('Error fetching forecast data:', error);
            });
    }

    function updateHourlyForecast(data) {
        if (dayForecastElement) {
            // Update hourly forecast here
            // Example: showing the first few hours of the forecast
            const hours = data.list.slice(0, 12); // Example: first 12 hours
            const forecastHTML = hours.map(item => {
                const time = new Date(item.dt * 1000).toLocaleTimeString();
                const temp = Math.round(item.main.temp);
                const description = item.weather[0].description;
                return `<p>${time}: ${description.charAt(0).toUpperCase() + description.slice(1)}, ${temp}°C</p>`;
            }).join('');
            dayForecastElement.innerHTML = forecastHTML;
        }
    }

    function update7DayForecast(data) {
        if (weeklyForecastElement) {
            // Update 7-day forecast here
            const dailyForecasts = data.daily;
            const forecastHTML = dailyForecasts.map(day => {
                const date = new Date(day.dt * 1000).toLocaleDateString();
                const temp = Math.round(day.temp.day);
                const description = day.weather[0].description;
                return `<p>${date}: ${description.charAt(0).toUpperCase() + description.slice(1)}, ${temp}°C</p>`;
            }).join('');
            weeklyForecastElement.innerHTML = forecastHTML;
        }
    }

    function updateMonthlyForecast(data) {
        if (monthlyForecastElement) {
            // Update monthly forecast here
            // Placeholder example
            monthlyForecastElement.innerHTML = `<p>Monthly forecast data is not available directly from this API. Use a combination of daily data or another source.</p>`;
        }
    }
});
