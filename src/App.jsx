import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Section1 from './pages/section1/Section1'
import Section2 from './pages/section2/Section2'
import Section3 from './pages/section3/Section3'
import Section4 from './pages/section4/Section4'
import Section5 from './pages/section5/Section5'
import { WeatherProvider } from './components/context/WeatherContext';

function App() {
  return (
    <WeatherProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/section1" element={<Section1 />} />
        <Route path="/section2" element={<Section2 />} />
        <Route path="/section3" element={<Section3 />} />
        <Route path="/section4" element={<Section4 />} />
        <Route path="/section5" element={<Section5 />} />
      </Routes>
    </WeatherProvider>
  )
}

export default App
