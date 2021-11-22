let todaysDate = new Date();
let weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let todaysDay = weekDays[todaysDate.getDay()];
let todaysDayDate = todaysDate.getDate();
let month = todaysDate.getMonth();
let year = todaysDate.getFullYear();
let hour = todaysDate.getHours();
let minute = todaysDate.getMinutes();

let displayNow = document.querySelector("p .today");
displayNow.innerHTML = `${todaysDay}, ${todaysDayDate}.${month}.${year} - ${hour}:${minute}`;

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#input-city").value;
  let weatherCity = document.querySelector("#city");
  weatherCity.innerHTML = input;

  let apiKey = "f6766af7b26f55aa24d6be88466216f4";
  let city = input;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function showTemperature(apiUrl) {
    let temp = Math.round(apiUrl.data.main.temp);
    degrees.innerHTML = temp;
  }

  axios.get(apiUrl).then(showTemperature);
}
let searchForm = document.querySelector("#searchform-city");
searchForm.addEventListener("submit", searchCity);

function showTemperatureMyPos(apiUrl2) {
  let temp = Math.round(apiUrl2.data.main.temp);
  let city2 = apiUrl2.data.name;
  degrees.innerHTML = temp;
  let weatherCity = document.querySelector("#city");
  weatherCity.innerHTML = city2;
}

function giveBackPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f6766af7b26f55aa24d6be88466216f4";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl2).then(showTemperatureMyPos);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(giveBackPosition);
}

let PositionButton = document.querySelector("#button-curloc");
PositionButton.addEventListener("click", getPosition);
