const API_KEY = "b492d86f42027732ec924ffc667cc6c9"
const apiformoon = 'jjj'

function geotrue(position){
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    //const moon = position?
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
    console.log(url)
    fetch(url)
        .then((response) =>response.json())  
        .then((data) =>{
            const pressure = document.querySelector("#pressu")
            const sunrise = document.querySelector("#rise")
            const sunset = document.querySelector("#set")
            pressure.innerText = `${data.main.pressure} hpa`
            let sunrisedate = new Date(data.sys.sunrise*1000)
            sunrise.innerText = sunrisedate.toLocaleTimeString('ko-KR', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            let sunsetdate = new Date(data.sys.sunset*1000)
            sunset.innerText = sunsetdate.toLocaleTimeString('ko-KR', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
    }
    )
    }

function geofalse(){
    alert("Can't find you no weather for you")
}

navigator.geolocation.getCurrentPosition(geotrue, geofalse)