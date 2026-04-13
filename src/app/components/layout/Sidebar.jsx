import { CloudSun, MapPin, Map, Settings } from "lucide-react";

const [active, setActive] = useState("weather");

<div className="sidebar">
  <div
    className={`sidebar-icon ${active === "weather" ? "active" : ""}`}
    onClick={() => setActive("weather")}
  >
    <CloudSun />
  </div>

  <div
    className={`sidebar-icon ${active === "city" ? "active" : ""}`}
    onClick={() => setActive("city")}
  >
    <MapPin />
  </div>

  <div
    className={`sidebar-icon ${active === "map" ? "active" : ""}`}
    onClick={() => setActive("map")}
  >
    <Map />
  </div>

  <div
    className={`sidebar-icon ${active === "settings" ? "active" : ""}`}
    onClick={() => setActive("settings")}
  >
    <Settings />
  </div>
</div>