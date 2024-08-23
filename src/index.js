function updateWeather(response){
    let temperatureValue=document.querySelector("#temp-value");
    let temperature=Math.round(response.data.temperature.current);
    temperatureValue.innerHTML=temperature;
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.city;
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
citysearch();