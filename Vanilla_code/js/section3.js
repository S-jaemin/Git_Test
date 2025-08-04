import { OPENWEATHERMAP_API_KEY } from "./config.js";
const windspeedElement = document.querySelector(
  ".section3__card-compass__wind-value"
);
const humidityElement = document.querySelector(
  ".section3__card-compass__humidity-value"
);
const windArrow = document.querySelector(".section3__card-compass__wind-arrow");
const humidityArrow = document.querySelector(
  ".section3__card-compass__humidity-arrow"
);

async function getLocationAuto() {
  function getCurrentPositionPromise() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  try {
    const position = await getCurrentPositionPromise();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    return [lat, lon];
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

async function getWeatherJson(lat, lon) {
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}`;
  console.log(weather_url);
  try {
    const weather_res = await fetch(weather_url);
    let weather_data = await weather_res.json();
    console.log("json data:", weather_data);
    return weather_data;
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

// Section3 필요정보: Wind speed, Wind deg, Humidity
async function getWeather() {
  let coords;
  coords = await getLocationAuto();
  console.log("getLocationAuto:", coords[0], coords[1]);
  const jsondata = await getWeatherJson(coords[0], coords[1]);
  const temp = Math.floor(jsondata.main.temp - 273.15);
  const cityName = jsondata.name;
  const humidity = jsondata.main.humidity;
  const wind_speed = (jsondata.wind.speed * 3.6).toFixed(2);
  const wind_deg = jsondata.wind.deg;
  console.log(
    `wind speed: ${wind_speed} / wind deg: ${wind_deg} / humidity: ${humidity}`
  );
  return { wind_speed, wind_deg, humidity };
}

function updateArrow(windDeg, humidity) {
  // 바람 화살표 - 360도 범위
  if (windArrow) {
    windArrow.style.cssText = `
      // transform-origin: center center;
      transform: rotate(${windDeg - 90}deg);
      transition: transform 1s ease-out;
    `;
  }

  // 습도 화살표 - 330도 범위 (0~100% → 0~330도)
  if (humidityArrow) {
    const humidityDeg = 120 + (humidity / 100) * 300;
    humidityArrow.style.cssText = `
      // transform-origin: center center;
      transform: rotate(${humidityDeg}deg);
      transition: transform 1s ease-out;
    `;
  }
}

async function updateValue() {
  try {
    const value = await getWeather();
    // const value = { wind_speed: 1.0, wind_deg: 200, humidity: 100 };
    windspeedElement.innerText = `${value.wind_speed}`;
    windspeedElement.style.cssText = "font-size: 28px; font-weight: 500;";
    humidityElement.innerText = `${value.humidity}`;
    humidityElement.style.cssText = "font-size: 28px; font-weight: 500;";
    updateArrow(value.wind_deg, value.humidity);
  } catch (e) {
    console.log(e);
  }
}

updateValue();
