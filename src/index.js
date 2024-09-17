function refreshWeather(response){
let temperatureElement = document.querySelector("#temperature");
let temperature = response.data.temperature.current
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");

cityElement.innerHTML = response.data.city;
descriptionElement.innerHTML = response.data.description;
temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city){
let apiKey = 'f4b51cbf6039365ob7atd180fe5e0c57';
let apiURL = 'https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric';
axios.get(apiURL).then(refreshWeather);
}


function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
