const API_KEY = "ab0f5f3c31ab4466b43fe85967665626";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weatherMain = document.querySelector(".section1 .weather-main");
            const weatherTemp = document.querySelector(".section1 .weather-temp");
            const weatherTempMax = document.querySelector(".section1 .weather-temp-max");
            const weatherTempMin = document.querySelector(".section1 .weather-temp-min");
            const weatherCity = document.querySelector(".section1 .weather-city");
            
            weatherMain.innerText = data.weather[0].main;
            weatherTemp.innerText = `${Math.round(data.main.temp)}°`;
            weatherTempMax.innerText = `${Math.round(data.main.temp_max)}°`;
            weatherTempMin.innerText = `${Math.round(data.main.temp_min)}°`;
            weatherCity.innerText = data.name;
            
            const weatherType = data.weather[0].main;
            document.body.className = '';
            document.body.classList.add('weather-' +weatherType.toLowerCase());
        });
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
