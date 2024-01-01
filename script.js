const apiKey = "111ffe4edf261dd4be5b605664a5c24a";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function displayData(data){
  document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector("#desc").innerHTML = data.weather[0].main;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector("#feel").innerHTML = data.main.feels_like + "°C";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
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
}

async function checkWeather(city) {
  const response = await fetch(apiUrl + `&q=${city}&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    console.log(data);
    displayData(data);

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

function geolocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  } else{
    console.log("Error");
  }
}

function showPosition(data){
  console.log(data)
  let lat = data.coords.latitude;
  let lon = data.coords.longitude;
  fetch(apiUrl + `&lat=${lat}&lon=${lon}&appid=${apiKey}`).then((res)=>res.json()).then((data)=>{
    console.log(data);
    displayData(data);
    document.querySelector("#current-location").innerHTML = data.name;
    document.querySelector("#current-location-temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".weather").style.display = "block";
  })
}

geolocation()

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
