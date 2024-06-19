const apiKey = '441012981905a697223f90724d95c0da'; // Replace with your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?appid='+apiKey+'&units=metric';

const locationInput = document.getElementById('location-input');
const searchButton = document.getElementById('search-button');
const cityElement = document.getElementById('city');
const countryElement = document.getElementById('country');
const weatherIconElement = document.getElementById('weather-icon');
const descriptionElement = document.getElementById('description');
const temperatureElement = document.getElementById('temperature');
const feelsLikeElement = document.getElementById('feels-like');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');

searchButton.addEventListener('click', getWeatherData);

function getWeatherData() {
    const location = locationInput.value;
    const url = `${apiUrl}&q=${location}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found. Please try again.');
            } else {
                displayWeatherData(data);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred. Please try again later.');
        });
}

function displayWeatherData(data) {
    cityElement.textContent = data.name;
    countryElement.textContent = data.sys.country;
    weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    descriptionElement.textContent = data.weather[0].description;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    feelsLikeElement.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidityElement.textContent = data.main.humidity;
    windSpeedElement.textContent = data.wind.speed;
}