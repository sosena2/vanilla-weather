function updateWeather(response){
    //console.log(response);
    let temperatureValue=document.querySelector("#temp-value");
    let temperature=Math.round(response.data.temperature.current);
    temperatureValue.innerHTML=temperature;

    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.city;

    let descriptionElement=document.querySelector("#weather-description");
    descriptionElement.innerHTML=response.data.condition.description;

    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=`${response.data.temperature.humidity}%`;

    let windSpeedElement=document.querySelector("#wind-speed");
    windSpeedElement.innerHTML=`${response.data.wind.speed}km/h`;

    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    timeElement.innerHTML = formatDate(date);

    let iconElement = document.querySelector("#temp-emoji");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temp-emoji" />`;

    getForecast(response.data.city);

}

function formatDate(date){
let minutes=date.getMinutes();
let hours=date.getHours();
let days=[ "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function citysearch(city){
let apiKey="ao271fb34td73aa51030f96bdd214af0";
apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(updateWeather);
}

function showSearchInput(event){
event.preventDefault();
let searchInput=document.querySelector("#form-input");
//let cityElement=document.querySelector("#city");
//cityElement.innerHTML=searchInput.value;
citysearch(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city){
  key="ao271fb34td73aa51030f96bdd214af0";
  apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiUrl}`;
  axios(apiUrl).then(displayForecast);
  
}
function displayForecast(response){
  console.log(response.data.city);
  //injecting css from js
  let days=["Tue","Wed","Thu","Fri","Sat"];
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index){
    if(index<5){
    forecastHtml =
    forecastHtml +
  `<div class="weather-forecast-date">
  <div class="weather-forecast-day">${formatDay(day.time)}</div>
  <div> <img src="${day.condition.icon_url}"  class="weather-forecast-icon"/></div>
  <div class="weather-forecast-values">
    <div class="weather-forecast-value"><strong>${Math.round(day.temperature.maximum)}&deg</strong></div>
    <div class="weather-forecast-value">${Math.round(day.temperature.minimum)}&deg</div>
  </div>
  </div>`;
    }
  });
  
  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener("submit",showSearchInput);
citysearch("paris");