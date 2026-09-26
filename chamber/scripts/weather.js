const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // ← Replace this
const city = "Kaduna,NG";
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error("Weather data not available");
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById("weather-info").innerHTML = `<p>Unable to load weather data.</p>`;
    console.error(error);
  }
}

function displayWeather(data) {
  const current = data.list[0];
  const temp = Math.round(current.main.temp);
  const description = current.weather[0].description;
  const icon = current.weather[0].icon;

  // Get next 3 days (around midday)
  const forecast = [];
  for (let i = 8; i <= 24; i += 8) {
    if (data.list[i]) {
      forecast.push({
        date: new Date(data.list[i].dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
        temp: Math.round(data.list[i].main.temp)
      });
    }
  }

  const weatherHTML = `
    <div class="current-weather">
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
      <p><strong>${temp}°C</strong></p>
      <p>${description}</p>
    </div>
    <div class="forecast">
      <h3>3-Day Forecast</h3>
      <div class="forecast-days">
        ${forecast.map(day => `
          <div>
            <p><strong>${day.date}</strong></p>
            <p>${day.temp}°C</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  document.getElementById("weather-info").innerHTML = weatherHTML;
}

getWeather();