const express = require("express");
const axios = require("axios");
const cors = require("cors"); 
require("dotenv").config();

const app = express();
const PORT = 3001;
app.use(cors()); 

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = response.data;

    res.json({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      condition: data.weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: "City not found or API error" });
  }
});

app.get("/forecast", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    
    const dailyData = response.data.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    const forecast = dailyData.map((item) => ({
      date: item.dt_txt.split(" ")[0],
      temperature: item.main.temp,
      humidity: item.main.humidity,
      condition: item.weather[0].description,
    }));

    res.json({ city: response.data.city.name, forecast });
  } catch (error) {
    res.status(500).json({ error: "City not found or API error" });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
