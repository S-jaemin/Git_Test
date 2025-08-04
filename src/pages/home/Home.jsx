import { useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react';
import { WeatherContext } from '../../components/context/WeatherContext';
import './home.css'
import HomeSection2 from './home_section2/home_section2';

function Home() {
    const navigate = useNavigate()
    const {setWeather, setUv} = useContext(WeatherContext);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const APIKEY = "b492d86f42027732ec924ffc667cc6c9"; // API key를 명시하는 방법 말고 다른 좋은 방법?

                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;
                const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
                // 필요한 API URL이 있으면 여기에 추가해주세요

                try {
                    const [weatherRes, uvRes] = await Promise.all([
                    // 여기서 데이터 받으면 됩니다.
                    fetch(weatherUrl),
                    fetch(uvUrl)
                ]);
                setWeather(await weatherRes.json());
                setUv(await uvRes.json());
                // 여기도 필요한 데이터 처리해주세요
                } catch (err) {
                console.error('API 호출 실패', err);
                }
            },
            () => alert('위치 권한이 필요합니다.')
            );
    }, []);

    return (
        <div className="weather-container">

            <div className="section1" onClick={() => navigate('/section1')}>
                {/* 섹션1 내용 */}
            </div>

            <div className="section2" onClick={() => navigate('/section2')}>
                <HomeSection2 />
            </div>
            
            <div className="section3" onClick={() => navigate('/section3')}>
                <div className="section3-box">
                </div>
                <div className="section3-box">
                </div>
            </div>

            <div className="section4_5">
                <div className="section4" onClick={() => navigate('/section4')}>
                    {/* 섹션4 내용 */}
                </div>

                <div className="section5" onClick={() => navigate('/section5')}>
                    {/* 섹션5 내용 */}
                </div>
            </div>

        </div>
    )
}

export default Home