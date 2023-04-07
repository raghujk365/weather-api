const input = document.querySelector('.input_text');
const main = document.querySelector('#name');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const clouds = document.querySelector('.clouds');
const button = document.querySelector('.submit');
const weatherIcon = document.querySelector('.weather-icon');

button.addEventListener('click', function() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=50a7aa80fa492fa92e874d23ad061374')
    .then(response => response.json())
    .then(data => {
      const tempValue = Math.round(data.main.temp - 273.15);
      const nameValue = data.name;
      const descValue = data.weather[0].description;
      const weatherIconCode = data.weather[0].icon;

      main.innerHTML = nameValue;
      desc.innerHTML = "Desc - " + descValue;
      temp.innerHTML = "Temp - " + tempValue + " &#8451;";
      weatherIcon.className = "weather-icon fas fa-" + getWeatherIcon(weatherIconCode);
      input.value = "";
    })
    .catch(err => alert("Wrong city name!"));
});

function getWeatherIcon(iconCode) {
  switch(iconCode) {
    case "01d":
      return "sun";
    case "01n":
      return "moon";
    case "02d":
    case "02n":
    case "03d":
    case "03n":
      return "cloud-sun";
    case "04d":
    case "04n":
      return "cloud";
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return "cloud-showers-heavy";
    case "11d":
    case "11n":
      return "bolt";
    case "13d":
    case "13n":
      return "snowflake";
    case "50d":
    case "50n":
      return "smog";
    default:
      return "question";
  }
}
