"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getWeather, getForecast } from "./lib/api";
import WeeklyForecast from "./components/weather/WeeklyForecast";
import TemperatureChart from "./components/weather/TemperatureChart";

export default function Home() {
  const [city, setCity] = useState("Islamabad");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetchData() {
      const w = await getWeather(city);
      const f = await getForecast(city);
      setWeather(w);
      setForecast(f);
    }
    fetchData();
  }, [city]);

  useEffect(() => {
  if (!weather) return;

  const condition = weather.weather[0].main.toLowerCase();

  // Get current time & sunrise/sunset
  const currentTime = Date.now() / 1000; // in seconds
  const sunrise = weather.sys.sunrise;
  const sunset = weather.sys.sunset;

  const isDay = currentTime >= sunrise && currentTime < sunset;

  // Reset classes
  document.body.className = "";

  if (isDay) {
    if (condition.includes("cloud")) {
      document.body.classList.add("cloudy");
    } else if (condition.includes("rain")) {
      document.body.classList.add("rainy");
    } else {
      document.body.classList.add("sunny");
    }
  } else {
    document.body.classList.add("night");

    document.body.classList.add("stars");
  }
}, [weather]);

  return (
    <div className="container">
      <div className="sidebar">
      <div className="sidebar-icon">🌤️</div>
      <div className="sidebar-icon">📍</div>
      <div className="sidebar-icon">🗺️</div>
      <div className="sidebar-icon">⚙️</div>
    </div>


      {/* MAIN */}
      <div className="main">

        {/* SEARCH */}
        <div className="search">
        <input
        placeholder="Search for cities..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
       <button onClick={() => setCity(input)}>Search</button>
          </div>

          {/* LEFT */}
          <div>

            {/* CURRENT WEATHER */}
            {weather && (
              <div className="card weather-top">
                <div>
                  <h2>{weather.name}</h2>
                  <p>{weather.weather[0].description}</p>
                  <div className="temp">
                    {Math.round(weather.main.temp)}°
                  </div>
                </div>
                <div style={{ fontSize: "60px" }}><img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather"
                  /></div>
              </div>
            )}

            {/* TODAY FORECAST */}
            {forecast && (
              <div className="card">
                <h3>Today's Forecast</h3>
                <div className="forecast-row">
                  {forecast.list.slice(0, 6).map((item, i) => (
                    <div key={i} className="forecast-item">
                      <p>{item.dt_txt.split(" ")[1]}</p>
                      <p>{Math.round(item.main.temp)}°</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <motion.div
              className="card weather-top"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
  {/* content */}
</motion.div>

<motion.div
  className="card"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
></motion.div>

            {/* AIR CONDITIONS */}
            {weather && (
              <div className="card air-grid">
                <div>
                  <p>Real Feel</p>
                  <h2>{Math.round(weather.main.feels_like)}°</h2>
                </div>
                <div>
                  <p>Wind</p>
                  <h2>{weather.wind.speed} km/h</h2>
                </div>
                <div>
                  <p>Humidity</p>
                  <h2>{weather.main.humidity}%</h2>
                </div>
                <div>
                  <p>Pressure</p>
                  <h2>{weather.main.pressure}</h2>
                </div>
              </div>
            )}

          </div>
          <div>{forecast && <TemperatureChart data={forecast} />}</div>

          <WeeklyForecast forecast={forecast} />

        </div>
      </div>
  );
}