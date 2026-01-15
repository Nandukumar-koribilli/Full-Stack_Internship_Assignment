require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const NodeCache = require("node-cache");
const path = require("path");

const app = express();
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Helper function to make cached API calls
async function cachedApiCall(cacheKey, apiUrl) {
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    // console.log(`Cache hit for: ${cacheKey}`);
    return cachedData;
  }

  try {
    const response = await axios.get(apiUrl);
    cache.set(cacheKey, response.data);
    // console.log(`Cache miss, fetched: ${cacheKey}`);
    return response.data;
  } catch (error) {
    console.error(`API Error for ${cacheKey}:`, error.message);
    throw error;
  }
}

// API Routes

// Get current weather
app.get("/api/weather/current", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    const cacheKey = `current_${lat}_${lon}`;
    const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const data = await cachedApiCall(cacheKey, url);
    res.json(data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Failed to fetch current weather",
    });
  }
});

// Get 5-day forecast (3-hour intervals)
app.get("/api/weather/forecast", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    const cacheKey = `forecast_${lat}_${lon}`;
    const url = `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const data = await cachedApiCall(cacheKey, url);
    res.json(data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Failed to fetch forecast",
    });
  }
});

// Get air quality data
app.get("/api/weather/air-quality", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    const cacheKey = `air_quality_${lat}_${lon}`;
    const url = `${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    const data = await cachedApiCall(cacheKey, url);
    res.json(data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error:
        error.response?.data?.message || "Failed to fetch air quality data",
    });
  }
});

// Search locations by city name (geocoding)
app.get("/api/geocode/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const cacheKey = `geocode_${q}`;
    const url = `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(
      q
    )}&limit=5&appid=${API_KEY}`;

    const data = await cachedApiCall(cacheKey, url);
    res.json(data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Failed to search location",
    });
  }
});

// Reverse geocoding (get city name from coordinates)
app.get("/api/geocode/reverse", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    const cacheKey = `reverse_${lat}_${lon}`;
    const url = `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;

    const data = await cachedApiCall(cacheKey, url);
    res.json(data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Failed to reverse geocode",
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    cache: {
      keys: cache.keys().length,
      stats: cache.getStats(),
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌤️  Weather API server running on http://localhost:${PORT}`);
  console.log(`📊 API Key configured: ${API_KEY ? "✅" : "❌"}`);
});
