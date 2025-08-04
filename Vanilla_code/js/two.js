const weather_icon_url = "https://openweathermap.org/img/wn/"; // weather.icon
import { OPENWEATHERMAP_API_KEY } from "./config.js";
const SELECT_CLASSNAME = 'selected';
const buttons = document.querySelectorAll(".forecast__btn");
const contents = document.querySelectorAll(".forecast__display");
const time = document.getElementById("time");
const todayText = document.getElementById("today_text");
const tomText = document.getElementById("tomorrow_text");

const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
let lat, lon;
const hourlyContainer = document.querySelector(".forecast__display #hourly_display");

console.log(hourlyContainer)

function getTime() {
    const date = new Date();
    const hour = String(date.getHours()).padStart(2,"0");
    const min = String(date.getMinutes()).padStart(2,"0");
    time.innerText = `${hour}:${min} KST`;
}

function getDate() {
    const date = new Date();
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay();

    todayText.innerText = `Today (${dayOfMonth} ${daysOfWeek[dayOfWeek]})`
    tomText.innerText = `Tomorrow (${dayOfMonth} ${daysOfWeek[dayOfWeek + 1]})`
}

function btnHandler(event) {
    const btn = event.target;
    buttons.forEach(b=> {
        b.classList.remove(SELECT_CLASSNAME)
    });
    btn.classList.add(SELECT_CLASSNAME);

    contents.forEach(c => {
        c.style.display = 'none'
    });

    const id = event.target.dataset.content;
    document.getElementById(id).style.display = 'flex';

    if (id === 'daily') {
        dailyWeather(lat,lon)
    }
    if (id === 'hourly') {
        hourlyWeather(lat,lon)
    }
}


function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
}
async function init() {
    try {
        const position = await getPosition();
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        dailyWeather(lat, lon);
    } catch {
        alert("Can't find you. No weather displayed");
    }
}


function dailyWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
    // const urlHourly = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}`;
    fetch(url).then(response => response.json()).then(data => {
        const todayIcon = document.querySelector(`#today #icon`);
        const today_max_temp = document.querySelector("#today .max_temp");
        const today_min_temp = document.querySelector("#today .min_temp");
        const today_wind = document.querySelector("#today .wind");
        const today_wind_dir = document.querySelector(`#today .fa-location-arrow`);
        todayIcon.src = `${weather_icon_url}${data.weather[0].icon}.png`
        today_max_temp.innerText = `${Math.round(data.main.temp_max)}\u00B0`;
        today_min_temp.innerText = `${Math.round(data.main.temp_min)}\u00B0`;
        today_wind.innerText = `${data.wind.speed} m/s`;
        today_wind_dir.style.transform = `rotate(${data.wind.deg +180}deg)`;
    })
}

function hourlyWeather(lat,lon) {
    const urlHourly = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
    fetch(urlHourly).then(response => response.json()).then(data => {
        const date = new Date();
        const currentHour = date.getHours();
        const startingHour = String((Math.floor(currentHour/3)) * 3).padStart(2,"0");
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;

        const startingString = `${todayStr} ${startingHour}:00:00`; 
        console.log(startingString)
    
        console.log(data)
        const forecastList = data.list; // your 40 3-hour blocks
        const startIndex = forecastList.findIndex(item => item.dt_txt === startingString)
        console.log(startIndex)
  

        // Filter for blocks in the future
        const next48Hours = forecastList.slice(startIndex, startIndex+16);

        hourlyContainer.innerHTML = "";

        next48Hours.forEach(block => {
            const box = document.createElement('div');
            box.className = 'hourly__forecast';
            box.innerHTML = `
                <span class="hour hour_box">${(block.dt_txt).split(" ")[1].slice(0,5)}</span>
                <div class="temp_sec hour_box">
                    <img src=${weather_icon_url}${block.weather[0].icon}.png />
                    <span class="temperature">${Math.round(block.main.temp)}\u00B0</span>
                </div>
                <div class="precip_sec hour_box">
                    <span class="precip_txt">Precip: ${block.pop}%</span>
                </div>
                <div class="wind_sec hour_box">
                    <span class="wind_text">Wind: ${block.wind.speed} m/s</span>
                </div>
                `
            
        hourlyContainer.appendChild(box)

        console.log(block.dt_txt, block.main.temp, block.weather[0].icon, block.pop, block.wind.speed);
        });
    })
}




getTime()
setInterval(getTime, 60000);
getDate()
init();

buttons.forEach(btn => {
    btn.addEventListener("click", btnHandler)
})

