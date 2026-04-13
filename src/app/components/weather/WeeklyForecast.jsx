import { useState } from "react";

export default function Weekly({ forecast }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!forecast) return null;

  const days = {};

  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; 

    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(item);
  });

  const dailyArray = Object.entries(days);

  return (
    <div className="card">
      <h3>7-Day Forecast</h3>

      {dailyArray.map(([date, hours], index) => (
        <div key={index} className="week-item-container">

          
          <div
            className="week-item"
            onClick={() =>
              setActiveIndex(activeIndex === index ? null : index)
            }
          >
            <div className="week-left">
              <img
                src={`https://openweathermap.org/img/wn/${hours[0].weather[0].icon}.png`}
              />
              <div>
                <p>{new Date(date).toDateString()}</p>
                <span>{hours[0].weather[0].description}</span>
              </div>
            </div>

            <div className="week-temp">
              {Math.round(hours[0].main.temp)}°
            </div>
          </div>

          <div
            className={`dropdown ${
              activeIndex === index ? "open" : ""
            }`}
          >
            {hours.map((h, i) => (
              <div key={i} className="hour-item">
                <p>{h.dt_txt.split(" ")[1].slice(0, 5)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${h.weather[0].icon}.png`}
                />
                <p>{h.weather[0].main}</p>
                <p>{Math.round(h.main.temp)}°</p>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}