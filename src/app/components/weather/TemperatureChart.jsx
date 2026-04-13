"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TemperatureChart({ data }) {
  if (!data) return null;

  // 🔹 Format forecast data
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: item.dt_txt.split(" ")[1].slice(0, 5), // HH:MM
    temp: Math.round(item.main.temp),
  }));

  return (
    <div className="card">
      <h3 style={{ marginBottom: "10px" }}>Temperature Trend</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}