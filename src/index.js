function updateWeather(response){
    console.log(response);
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

let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener("submit",showSearchInput);
citysearch("paris");