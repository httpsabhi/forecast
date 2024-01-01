const apiKey = "111ffe4edf261dd4be5b605664a5c24a";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function displayData(data){
  document.querySelector(".city").innerHTML = data.name + ", "+ data.sys.country;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector("#desc").innerHTML = data.weather[0].main;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector("#feel").innerHTML = data.main.feels_like + "°C";
    document.querySelector(".visibility").innerHTML = data.visibility/1000 + " Km";

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

    let windDirection = data.wind.deg;
    let wind = "";
    if((windDirection < 360 && windDirection > 337.5) || (windDirection >=0 && windDirection < 22.5)){
      wind = "Northerly";
    } else if (windDirection < 45){
      wind = "North-northeasterly";
    } else if(windDirection < 67.5){
      wind = "Northeasterly";
    } else if(windDirection < 90){
      wind = "East-northeasterly";
    } else if(windDirection < 112.5){
      wind = "Easterly";
    } else if(windDirection < 135){
      wind = "East-southeasterly";
    } else if(windDirection < 157.5){
      wind = "Southeasterly";
    } else if(windDirection < 180){
      wind = "South-southeasterly";
    } else if(windDirection < 202.5){
      wind = "Southerly";
    } else if(windDirection < 225){
      wind = "South-southwesterly";
    } else if(windDirection < 247.5){
      wind = "Southwesterly";
    } else if(windDirection < 270){
      wind = "West-southwesterly";
    } else if(windDirection < 292.5){
      wind = "Westerly";
    } else if(windDirection < 315){
      wind = "West-northwesterly";
    } else if(windDirection < 337.5){
      wind = "Northwesterly";
    } else{
      wind = "North-northwesterly";
    }

    document.querySelector("#wind-direction").innerHTML = wind + " ("+windDirection+"°)";
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
    document.querySelector("#current-location").innerHTML = data.name + ", " + data.sys.country;
    document.querySelector("#current-location-temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".weather").style.display = "block";
  })
}

geolocation();

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
