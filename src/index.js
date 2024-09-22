function refreshWeather(response) {
  console.log(response);

  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = `${formatDate(date)}, `;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault(); 
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", 
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday", 
    "Friday", 
    "Saturday"];
  let day = days[date.getDay()];

if (minutes< 10){
  minutes =`0${minutes}`
}

  return `${day} ${hours}:${minutes}`

}

function ForecastDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon","Tue","Wed","Thu", "Fri", "Sat"];

  return days[date.getDay()]
}

function getForecast(city){
  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}


function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index<5){
    forecastHtml += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${ForecastDay(day.time)}</div>
        <div>
        <img src = ${
          day.condition.icon_url
        } class="weather-forecast-icon"/></div>
        <div class="weather-forecast-temperatures">
          <div class="Weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}</strong>
          </div>
          <div class="Weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}</div>
        </div>
      </div>`;
        }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}


searchCity("Paris");


