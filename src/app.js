function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
        
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
        let day = days[date.getDay()];
        return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img 
      src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
      alt=""
      width="42"
      />
      <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">
      ${Math.round(
          forecastDay.temp.max
      )}° </span>
          <span class="weather-forecast-temperature-min">
          ${Math.round(
              forecastDay.temp.min
          )}° </span>
    </div>
  </div>
`;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

    
function getForecast(coordinates) {
    console.log(coordinates);
  let apiKey = "358bb59892afa5069bcb43f658651551";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
        let temperatureElement = document.querySelector("#temperature");
        let cityElement = document.querySelector("#city");
        let descriptionElement = document.querySelector("#description");
        let humidityElement = document.querySelector("#humidity");
        let windElement = document.querySelector("#wind");
        let dateElement = document.querySelector("#date");
        let iconElement = document.querySelector("#icon");
        let minTempElement = document.querySelector("#temp-min");
        let maxTempElement = document.querySelector("#temp-max");
        let feelsLikeElement = document.querySelector("#feels-like");

        fahrenheitTemperature = response.data.main.temp;

        temperatureElement.innerHTML = Math.round(response.data.main.temp);
        cityElement.innerHTML = response.data.name;
        descriptionElement.innerHTML = response.data.weather[0].description;
        humidityElement.innerHTML = response.data.main.humidity;
        windElement.innerHTML = Math.round(response.data.wind.speed);
        dateElement.innerHTML = formatDate(response.data.dt * 1000);
        iconElement.setAttribute("src",
            `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
    minTempElement.innerHTML = Math.round(response.data.main.temp_min);
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);

    getForecast(response.data.coord);
    }

function searchCity(city) {
let apiKey = "358bb59892afa5069bcb43f658651551";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayTemperature);
}


function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    searchCity(cityInputElement.value);
}

function showPositionTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    let minTempElement = document.querySelector("#temp-min");
    let maxTempElement = document.querySelector("#temp-max");
    let feelsLikeElement = document.querySelector("#feels-like");

    fahrenheitTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
    minTempElement.innerHTML = Math.round(response.data.main.temp_min);
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);

    getForecast(response.data.coord);
}

function searchLocation(position) {
let long = position.coords.longitude;
let lat = position.coords.latitude;

let apiKey = "358bb59892afa5069bcb43f658651551";
let units = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
axios.get(apiUrl).then(showPositionTemperature);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}


function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active"); 
    let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Los Angeles");