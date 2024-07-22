const apiKey = '62e9456a746c4874a59cc38a5e5a90f8';
const city = 'Erbil';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            showError(`Error: ${data.message}`);
        }
    } catch (error) {
        showError('Error fetching weather data');
    }
}

function displayWeather(data) {
    const { main, weather, name, wind } = data;
    const description = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
    const temperature = main.temp;
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    const pressure = main.pressure;

    const weatherElement = document.getElementById('weather');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');
    const pressureElement = document.getElementById('pressure');
    const weatherIconElement = document.getElementById('time-icon');

    weatherElement.innerHTML = `
        <i class="fas ${getWeatherIcon(weather[0].main)} weather-icon"></i>
        <p class="description">${description}</p>
        <p class="temp">${temperature.toFixed(1)}°C</p>
    `;

    humidityElement.textContent = humidity;
    windSpeedElement.textContent = windSpeed;
    pressureElement.textContent = pressure;

    // Update time and icon
    updateTime();
    setInterval(updateTime, 60000); // Update time every minute
}

function getWeatherIcon(weatherMain) {
    switch (weatherMain.toLowerCase()) {
        case 'clear':
            return 'fa-sun';
        case 'clouds':
            return 'fa-cloud';
        case 'rain':
            return 'fa-cloud-rain';
        case 'snow':
            return 'fa-snowflake';
        case 'thunderstorm':
            return 'fa-bolt';
        case 'drizzle':
            return 'fa-cloud-showers-heavy';
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'fog':
        case 'sand':
        case 'ash':
        case 'squall':
        case 'tornado':
            return 'fa-smog';
        default:
            return 'fa-sun';
    }
}

function showError(message) {
    const weatherElement = document.getElementById('weather');
    weatherElement.innerHTML = `<p>${message}</p>`;
}

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    const timeElement = document.getElementById('current-time');
    timeElement.textContent = timeString;

    // Change the icon color based on time
    const timeIconElement = document.getElementById('time-icon');
    if (hours >= 6 && hours < 18) {
        timeIconElement.classList.remove('fa-moon');
        timeIconElement.classList.add('fa-sun');
        timeIconElement.style.color = '#f7b733';
    } else {
        timeIconElement.classList.remove('fa-sun');
        timeIconElement.classList.add('fa-moon');
        timeIconElement.style.color = '#2d2d2d';
    }
}

// Fetch weather data on page load
getWeather();
