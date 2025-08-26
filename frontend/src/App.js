import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      const response = await axios.get(`https://weather-app-cqwe.onrender.com/weather?city=${city}`);
      const forecastRes = await axios.get(`https://weather-app-cqwe.onrender.com/forecast?city=${city}`);
      setWeather(response.data);
      setForecast(forecastRes.data.forecast);
      setError("");
    } catch (err) {
      setError("City not found or API error");
      setWeather(null);
      setForecast([]);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#fff" }}>
        🌤 Weather App
      </h1>

      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            width: "200px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "10px",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={getWeather}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#ff6a00",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Get Weather
        </button>
      </div>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      {weather && (
        <div
          style={{
            background: "#ffffffaa",
            padding: "20px",
            borderRadius: "12px",
            display: "inline-block",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            marginBottom: "30px",
          }}
        >
          <h2>{weather.city}</h2>
          <p>🌡 Temperature: {weather.temperature}°C</p>
          <p>💧 Humidity: {weather.humidity}%</p>
          <p>🌥 Condition: {weather.condition}</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div>
          <h3 style={{ marginBottom: "15px", color: "#fff" }}>📅 5-Day Forecast</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            {forecast.map((day, index) => (
              <div
                key={index}
                style={{
                  background: "#ffffffcc",
                  padding: "15px",
                  borderRadius: "10px",
                  width: "150px",
                  boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
                }}
              >
                <h4>{day.date}</h4>
                <p>🌡 {day.temperature}°C</p>
                <p>💧 {day.humidity}%</p>
                <p>🌥 {day.condition}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
