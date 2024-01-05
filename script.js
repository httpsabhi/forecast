const apiKey = "111ffe4edf261dd4be5b605664a5c24a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const forecastApi =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const navIcon = document.querySelector("#nav-icon");
const forecastContainer = document.querySelector(".forecast-card");

function displayData(data) {
  document.querySelector(".city").innerHTML =
    data.name + ", " + data.sys.country;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector("#desc").innerHTML = data.weather[0].main;
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML =
    Math.round(data.wind.speed * 3.6) + " km/h";
  document.querySelector(".wind-gust").innerHTML =
    Math.round(data.wind.gust * 3.6) + " km/h";
  document.querySelector("#feel").innerHTML = data.main.feels_like + "°C";
  document.querySelector(".visibility").innerHTML =
    data.visibility / 1000 + " Km";
  document.querySelector(
    "#minmax"
  ).innerHTML = `${data.main.temp_min} ~ ${data.main.temp_max}°C`;

  // Extracting Week Day
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const d = new Date();
  let day = days[d.getDay()];
  document.querySelector("#day").innerHTML = `Today, ${day}`;

  // Change Weather Icon
  if (
    data.weather[0].main == "Clouds" &&
    (data.dt > data.sys.sunset || data.dt < data.sys.sunrise)
  ) {
    weatherIcon.src = "images/cloudy-night.png";
  } else if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (
    data.weather[0].main == "Clear" &&
    (data.dt > data.sys.sunset || data.dt < data.sys.sunrise)
  ) {
    weatherIcon.src = "images/moon.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (
    data.weather[0].main == "Rain" &&
    (data.dt > data.sys.sunset || data.dt < data.sys.sunrise)
  ) {
    weatherIcon.src = "images/rainy-night.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  } else if (data.weather[0].main == "Haze") {
    weatherIcon.src = "images/haze.png";
  } else if (data.weather[0].main == "Smoke") {
    weatherIcon.src = "images/smoke.png";
  }

  let windDirection = data.wind.deg;
  let wind = "";
  if (windDirection >= 348.75 || windDirection < 11.25) {
    wind = "North";
  } else if (windDirection < 33.75) {
    wind = "North-Northeast";
  } else if (windDirection < 56.25) {
    wind = "Northeast";
  } else if (windDirection < 78.75) {
    wind = "East-Northeast";
  } else if (windDirection < 101.25) {
    wind = "East";
  } else if (windDirection < 123.75) {
    wind = "East-Southeast";
  } else if (windDirection < 146.25) {
    wind = "Southeast";
  } else if (windDirection < 168.75) {
    wind = "South-Southeast";
  } else if (windDirection < 191.25) {
    wind = "South";
  } else if (windDirection < 213.75) {
    wind = "South-Southwest";
  } else if (windDirection < 236.25) {
    wind = "Southwest";
  } else if (windDirection < 258.75) {
    wind = "West-Southwest";
  } else if (windDirection < 281.25) {
    wind = "West";
  } else if (windDirection < 303.75) {
    wind = "West-Northwest";
  } else if (windDirection < 326.25) {
    wind = "Northwest";
  } else if (windDirection < 348.75) {
    wind = "North-Northwest";
  }
  
  document.querySelector("#wind-direction").innerHTML =
    wind + " (" + windDirection + "°)";  
}

let icon = "";
function changeWeatherIcon(data) {
  if (data.weather[0].main == "Clouds" && data.sys.pod == "n") {
    icon = "images/cloudy-night.png";
  } else if (data.weather[0].main == "Clouds") {
    icon = "images/clouds.png";
  } else if (data.weather[0].main == "Clear" && data.sys.pod == "n") {
    icon = "images/moon.png";
  } else if (data.weather[0].main == "Clear") {
    icon = "images/clear.png";
  } else if (data.weather[0].main == "Rain" && data.sys.pod == "n") {
    icon = "images/rainy-night.png";
  } else if (data.weather[0].main == "Rain") {
    icon = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    icon = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    icon = "images/mist.png";
  } else if (data.weather[0].main == "Haze") {
    icon = "images/haze.png";
  } else if (data.weather[0].main == "Smoke") {
    icon = "images/smoke.png";
  }
  return icon;
}

async function checkWeather(city) {
  const response = await fetch(apiUrl + `&q=${city}&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();
    // console.log(data);
    displayData(data);

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Forecast next 5 days weather
async function forecastWeather(city) {
  const response = await fetch(forecastApi + `&q=${city}&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".forecast-error").style.display = "block";
  } else {
    let data = await response.json();
    // console.log(data);
    document.querySelector(".forecast-error").style.display = "none";
    displayForecastCard(data);
  }
}

// Function to display Forecast Card
function displayForecastCard(data) {
  forecastContainer.innerHTML = "";
  for (let i = 0; i < data.cnt; i++) {
    const forecastElement = document.createElement("div");

    // Extracting date and time
    let dateString = data.list[i].dt_txt;
    const date = new Date(dateString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    forecastElement.classList.add("display-card");
    forecastElement.innerHTML = `<h3>${day} ${month} ${year}</h3>
      <h4>${hours}:${minutes}0 ${ampm}</h4>
      <img src="${changeWeatherIcon(data.list[i])}" alt="">
      <p>${data.list[i].weather[0].main}</p>
      <h2>${Math.round(data.list[i].main.temp)}°C</h2>
      <p>Feels like ${data.list[i].main.feels_like}°C</p>
      <p>Precipitation ${Math.round(data.list[i].pop * 100)}%</p>`;
    forecastContainer.appendChild(forecastElement);
  }
}

function geolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    document.querySelector(".allow-location").style.display = "none";
  } else {
    document.querySelector(".allow-location").style.display = "block";
  }
}

function showPosition(data) {
  // console.log(data);
  let lat = data.coords.latitude;
  let lon = data.coords.longitude;
  fetch(apiUrl + `&lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      displayData(data);
      document.querySelector("#current-location").innerHTML =
        data.name + ", " + data.sys.country;
      document.querySelector("#current-location-temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".weather").style.display = "block";

      if (
        data.weather[0].main == "Clear" &&
        (data.dt > data.sys.sunset || data.dt < data.sys.sunrise)
      ) {
        navIcon.src = "images/moon.png";
      } else if (data.weather[0].main == "Clear") {
        navIcon.src = "images/sunny.png";
      } else if (data.weather[0].main == "Drizzle") {
        navIcon.src = "images/drizzle.png";
      } else if (
        data.weather[0].main == "Clouds" &&
        (data.dt > data.sys.sunset || data.dt < data.sys.sunrise)
      ) {
        navIcon.src = "images/cloudy-night.png";
      } else if (data.weather[0].main == "Clouds") {
        navIcon.src = "images/cloudy.png";
      } else if (
        data.weather[0].main == "Rain" &&
        (data.dt > data.sys.sunset || data.dt < data.sys.sunrise)
      ) {
        navIcon.src = "images/rainy-night.png";
      } else if (data.weather[0].main == "Rain") {
        navIcon.src = "images/rain.png";
      }
    });

  fetch(forecastApi + `&lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      displayForecastCard(data);
      console.log(data);
    });
}

// Calling Function to access user location
geolocation();

// Search
searchBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    // console.log("Enter");
    e.preventDefault();
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  forecastWeather(searchBox.value);
});

// Preloader
const loader = document.getElementById("preloader");

window.addEventListener("load", function () {
  loader.style.display = "none";
});
