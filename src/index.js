function refreshWeather(response) {
  console.log(response); 

  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");


  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(refreshWeather)
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function handleSearchSubmit(event) {
  event.preventDefault(); // Prevent the form from reloading the page
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value); // Trigger the API call with the entered city
}

// Event listener for the search form submission
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
