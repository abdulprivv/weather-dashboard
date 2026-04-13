export default function CurrentWeather({ data }) {
  if (!data) return null;

  return (
    <div className="card flex justify-between">
      <div>
        <h2 className="text-2xl font-bold">{data.name}</h2>
        <p>{data.weather[0].description}</p>
        <h1 className="text-5xl mt-3">{Math.round(data.main.temp)}°</h1>
      </div>

      <div className="text-6xl">☀️</div>
    </div>
  );
}