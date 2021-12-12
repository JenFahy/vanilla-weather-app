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
    "Saturday",
  ];
  let day = days[date.getDay()];
  return ` ${day}, ${hours}:${minutes}`;

  //make local time later
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
            <div class="col-2">
              <div class="weather-forecast-date">
              ${day} </div><img
                  src="https://openweathermap.org/img/wn/03d@2x.png"
                  alt="cloudy"
                  id="weather-icon"
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">18°C</span>
                  <span class="weather-forecast-temperature-min">12°C</span>
                </div>
                            </div>`;
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeTempElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;
  feelsLikeCelsiusTemperature = response.data.main.feels_like;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeTempElement.innerHTML = Math.round(feelsLikeCelsiusTemperature);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "31591cbd759ed47dd528c71d7a08734d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  let feelsLikeTempElement = document.querySelector("#feels-like");
  let feelsLikeTempUnitElement = document.querySelector("#feels-like-unit");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  feelsLikeTempElement.innerHTML = Math.round(fahrenheitTemperature);
  feelsLikeTempUnitElement.innerHTML = `°F`;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let feelsLikeTempElement = document.querySelector("#feels-like");
  let feelsLikeTempUnitElement = document.querySelector("#feels-like-unit");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  feelsLikeTempElement.innerHTML = Math.round(celsiusTemperature);
  feelsLikeTempUnitElement.innerHTML = `°C`;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

//how do we return to C with each search?

let celsiusTemperature = null;
let feelsLikeCelsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Toronto");
//make current location later

displayForecast();
//move later
