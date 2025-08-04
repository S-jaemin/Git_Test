import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App.jsx'
import { WeatherProvider } from './components/context/WeatherContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WeatherProvider>
      <Router>
        <App />
      </Router>
    </WeatherProvider>
  </React.StrictMode>,
)
