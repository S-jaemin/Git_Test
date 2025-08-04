import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { WeatherContext } from '../../components/context/WeatherContext';

import './section2.css'
import BackButton from '../../components/Backbutton/Backbutton.jsx'

function Section2() {
    const weather = useContext(WeatherContext);

    console.log("weather in Section2:", weather); // 여기가 핵심

    return (
        <div className="weather-container" style={{ position: 'relative' }}>
            <BackButton />
            <p style={{position: "absolute", top: "200px", left: "100px"}}>현재 온도: {weather?.weather?.main?.temp !== undefined ? `${weather.weather.main.temp}°C` : '불러오는 중...'}</p>
        </div>
    )
}

export default Section2
