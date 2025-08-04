import { createContext, useState } from 'react';

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
    const [weather, setWeather] = useState(null);
    const [uv, setUv] = useState(null);

    return (
    <WeatherContext.Provider value={{ weather, setWeather, uv, setUv }}>
        {children}
    </WeatherContext.Provider>
    );
}
