export default function ForecastToday({ data }) {
  if (!data) return null;

  const list = data.list.slice(0, 6);

  return (
    <div className="card">
      <h3 className="mb-4">Today's Forecast</h3>

      <div className="flex justify-between">
        {list.map((item, i) => (
          <div key={i} className="text-center">
            <p>{item.dt_txt.split(" ")[1]}</p>
            <p>{Math.round(item.main.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}