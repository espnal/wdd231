const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${APIKEY}&units=metric`;

const forecastContainer = document.querySelector(".weather-forecast");

async function getWeatherForecast() {
  try {
    const response = await fetch(FORECAST_URL);
    if (!response.ok)
      throw new Error("Error al obtener los datos del pronóstico");

    const data = await response.json();
    displayForecast(data);
    console.log(data); // Depuración
  } catch (error) {
    console.error("Error:", error.message);
    forecastContainer.innerHTML = "<p>No se pudo cargar el pronóstico.</p>";
  }
}

function displayForecast(forecastData) {
  const dailyForecast = {};

  forecastData.list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0]; // Obtener solo la fecha (YYYY-MM-DD)

    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        temp: entry.main.temp.toFixed(1),
        desc: entry.weather[0].description,
        icon: entry.weather[0].icon,
      };
    }
  });

  forecastContainer.innerHTML = "";

  // Obtener solo los próximos 3 días
  Object.keys(dailyForecast)
    .slice(0, 3)
    .forEach((date) => {
      const { temp, desc, icon } = dailyForecast[date];
      const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      const forecastItem = document.createElement("div");
      forecastItem.innerHTML = `
      <p><strong>${date}</strong></p>
      <img src="${iconSrc}" alt="${desc}">
      <p> ${temp}°C</p>
      <p>${desc}</p>
    `;
      forecastContainer.appendChild(forecastItem);
    });
}

getWeatherForecast();
