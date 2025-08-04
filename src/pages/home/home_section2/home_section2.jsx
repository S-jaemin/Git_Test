import { useContext } from 'react';
import { WeatherContext } from '../../../components/context/WeatherContext';

function HomeSection2() {
    const { weather } = useContext(WeatherContext);

    return (
    <div>
        <p>현재 온도 : {weather ? `${weather?.main?.temp}°C` : '로딩 중...'}</p>
    </div>
    );
}

export default HomeSection2;
