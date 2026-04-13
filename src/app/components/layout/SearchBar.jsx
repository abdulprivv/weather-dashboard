"use client";
import { useState } from "react";

export default function SearchBar({ setCity }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input) setCity(input);
  };

  return (
    <div className="card flex gap-3">
      <input
        className="bg-transparent outline-none flex-1"
        placeholder="Search city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}