const APIKEY = "b492d86f42027732ec924ffc667cc6c9";

function getUvRiskColor(index) {
    if (index <= 2) return "green";       // Low
    else if (index <= 5) return "yellow"; // Moderate
    else if (index <= 7) return "orange"; // High
    else if (index <= 10) return "red";   // Very High
    else return "purple";                  // Extreme
}

function onGeoOK(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APIKEY}&units=metric`;
    const url_uv = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lng}&appid=${APIKEY}`;
    fetch(url).then(response => response.json()).then(data => {
        const temp_dew = document.querySelector(".dewBox div");
        const visibility = document.querySelector(".viBox div");
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        temp_dew.innerText = (temp - ((100 - humidity)/5)).toFixed(1)  + "°"; // Dew point, 이슬점
        visibility.innerText = data.visibility + "m"; // Visibility, 가시거리
    })
    .catch(error => {
        console.log("fetch 실패");
    });
    fetch(url_uv).then(response => response.json()).then(data => {
        const UV_Index = document.querySelector(".uvStatus div:first-child");
        const UV_status = document.querySelector(".uvStatus div:last-child");
        const UV_circle = document.querySelector(".uvBar div:last-child");
        const UV_Mask = document.querySelector(".uvBar div:first-child");
        const maxPos = 160;
        const index = Number(`${data.value}`);
        const posX = Math.min(index * 16, maxPos);

        UV_Mask.style.width = 160 - Math.min(index * 16, maxPos);
        UV_Mask.style.transform = `translateX(${posX}px)`;
        UV_circle.style.left = `${posX}px`;

        
        UV_Index.innerText = index; // UV Index, 자외선 지수
        UV_status.innerText = getUvRiskLevel(Number(index)); // UV status, 체감 정도

        const uvColor = getUvRiskColor(index);
        UV_status.style.color = uvColor;
    })
    .catch(error => {
        console.log("UV 데이터 불러오기 실패.");
    });
}

function getUvRiskLevel(index) {
    if (index <= 2) return "Low";
    else if (index <= 5) return "Moderate";
    else if (index <= 7) return "High";
    else if (index <= 10) return "Very High";
    else return "Extreme";
}


function onGeoError() {
    console.log("디버깅-함수호출");
}


navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError)