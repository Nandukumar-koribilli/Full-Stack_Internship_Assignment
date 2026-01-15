// API configuration
const API_BASE_URL = 'http://localhost:3000/api';

// API service for weather data
const WeatherAPI = {
  /**
   * Fetch current weather data
   */
  async getCurrentWeather(lat, lon) {
    try {
      const response = await fetch(`${API_BASE_URL}/weather/current?lat=${lat}&lon=${lon}`);
      if (!response.ok) {
        throw new Error('Failed to fetch current weather');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  /**
   * Fetch forecast data (5-day/3-hour)
   */
  async getForecast(lat, lon) {
    try {
      const response = await fetch(`${API_BASE_URL}/weather/forecast?lat=${lat}&lon=${lon}`);
      if (!response.ok) {
        throw new Error('Failed to fetch forecast');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  },

  /**
   * Fetch air quality data
   */
  async getAirQuality(lat, lon) {
    try {
      const response = await fetch(`${API_BASE_URL}/weather/air-quality?lat=${lat}&lon=${lon}`);
      if (!response.ok) {
        throw new Error('Failed to fetch air quality');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching air quality:', error);
      throw error;
    }
  },

  /**
   * Search locations by city name
   */
  async searchLocation(query) {
    try {
      const response = await fetch(`${API_BASE_URL}/geocode/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search location');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching location:', error);
      throw error;
    }
  },

  /**
   * Reverse geocode coordinates to get location name
   */
  async reverseGeocode(lat, lon) {
    try {
      const response = await fetch(`${API_BASE_URL}/geocode/reverse?lat=${lat}&lon=${lon}`);
      if (!response.ok) {
        throw new Error('Failed to reverse geocode');
      }
      return await response.json();
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      throw error;
    }
  }
};
