function searchSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-city");
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("#searchform-city");
searchForm.addEventListener("submit", searchSubmit);

function searchCity(city) {
  let apiKey = "f6766af7b26f55aa24d6be88466216f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherData);
}

window.onload = searchCity("Amsterdam");

function showWeatherData(outputApi) {
  let temp = Math.round(outputApi.data.main.temp);
  degrees.innerHTML = temp;
  let weatherCity = document.querySelector("#city");
  weatherCity.innerHTML = outputApi.data.name;
  let weatherDesc = document.querySelector(".weatherdescription");
  weatherDesc.innerHTML = outputApi.data.weather[0].description;
  let windSpeed = document.querySelector("#windspeed");
  windSpeed.innerHTML = Math.round(outputApi.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(outputApi.data.main.humidity);

  let weatherIcon = document.querySelector(".icon");
  let loadIcon = outputApi.data.weather[0].icon;
  weatherIcon.src = `http://openweathermap.org/img/wn/${loadIcon}@2x.png`;

  let displayNow = document.querySelector("#today");
  displayNow.innerHTML = timestamp(outputApi.data.dt * 1000);
  celciusTemperature = Math.round(outputApi.data.main.temp);

  getForecast(outputApi.data.coord);
  showMap(outputApi.data.coord);
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "f6766af7b26f55aa24d6be88466216f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function timestamp(timestamp) {
  let todaysDate = new Date(timestamp);
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let todaysDay = weekDays[todaysDate.getDay()];
  let todaysDayDate = todaysDate.getDate();

  let month = months[todaysDate.getMonth()];
  if (month < 10) {
    month = `0${month}`;
  }
  let year = todaysDate.getFullYear();
  let hour = todaysDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = todaysDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `Last updated on ${todaysDay}, ${todaysDayDate}.${month}.${year} - ${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  console.log(forecastData);

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" alt="icon" id="iconsmaller1"></br>
            <span class="day">${formatDay(day.dt)}</span>
            <br />
            <span class="forecast-tempmin">${Math.round(
              day.temp.min
            )}</span>&deg  <span id="forecast-tempmax">${Math.round(
          day.temp.max
        )}&deg</span>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function showMap(coords) {
  // Create the script tag, set the appropriate attributes
  var script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyBKHFVm1IuOr7B99fiDmBmoxwRRDvOSPuI&callback=initMap";
  script.async = true;

  // Attach your callback function to the `window` object
  window.initMap = function () {
    // JS API is loaded and available
    new google.maps.Map(document.getElementById("map"), {
      center: { lat: coords.lat, lng: coords.lon },
      zoom: 10,
    });
  };

  // Append the 'script' element to 'head'
  document.head.appendChild(script);
}
