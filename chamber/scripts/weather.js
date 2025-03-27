const LAT = "18.4273";
const LON = "-68.9729";
const APIKEY = import.meta.env.VITE_API_KEY;

const WEATHER_URL_PROD = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${APIKEY}&units=metric`;
const apiURL = WEATHER_URL_PROD;

const weatherIcon = document.querySelector("#weather-icon");
const weatherDesc = document.querySelector("#weatherdesc");
const weatherTemp = document.querySelector("#temperature");
const weatherWind = document.querySelector("#windspeed");
const iconWrapper = document.querySelector("#icon-wrapper");
const high = document.querySelector("#high");
const low = document.querySelector("#low");
const humidity = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

async function getTheWeather() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error("Error al obtener datos del clima");

    const data = await response.json();
    displayResults(data);
    console.log(data);
  } catch (error) {
    console.error("Error:", error.message);
    weatherDesc.textContent = "No se pudo cargar el clima.";
  }
}

function displayResults(weatherData) {
  const iconSrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
  const desc = weatherData.weather[0].description;
  const main = weatherData.weather[0].main;

  iconWrapper.innerHTML = "";
  const icon = document.createElement("img");
  icon.src = iconSrc;
  icon.alt = desc;
  iconWrapper.appendChild(icon);

  weatherDesc.textContent = main;
  weatherTemp.textContent = `${weatherData.main.temp.toFixed(1)}°C`;
  high.textContent = `High: ${weatherData.main.temp_max.toFixed(1)}°C`;
  low.textContent = `Low: ${weatherData.main.temp_min.toFixed(1)}°C`;
  humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;

  sunrise.textContent = `Sunrise: ${convertTime(weatherData.sys.sunrise)}`;
  sunset.textContent = `Sunset: ${convertTime(weatherData.sys.sunset)}`;
}

function convertTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("es-DO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

getTheWeather();
