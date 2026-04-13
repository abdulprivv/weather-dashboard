export default function AirConditions({ data }) {
  if (!data) return null;

  return (
    <div className="card grid grid-cols-2 gap-4">
      <div>
        <p>Real Feel</p>
        <h2>{Math.round(data.main.feels_like)}°</h2>
      </div>

      <div>
        <p>Wind</p>
        <h2>{data.wind.speed} km/h</h2>
      </div>

      <div>
        <p>Humidity</p>
        <h2>{data.main.humidity}%</h2>
      </div>

      <div>
        <p>Pressure</p>
        <h2>{data.main.pressure}</h2>
      </div>
    </div>
  );
}