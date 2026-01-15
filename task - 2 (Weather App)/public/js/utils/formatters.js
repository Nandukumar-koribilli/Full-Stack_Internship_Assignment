// Utility functions for formatting data

/**
 * Format date to readable string
 */
function formatDate(timestamp, options = {}) {
  const date = new Date(timestamp * 1000);
  const defaultOptions = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

/**
 * Format time
 */
function formatTime(timestamp, options = {}) {
  const date = new Date(timestamp * 1000);
  const defaultOptions = { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleTimeString('en-US', { ...defaultOptions, ...options });
}

/**
 * Get day of week from timestamp
 */
function getDayOfWeek(timestamp) {
  const date = new Date(timestamp * 1000);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}

/**
 * Format temperature
 */
function formatTemp(temp) {
  return `${Math.round(temp)}°`;
}

/**
 * Format wind speed
 */
function formatWindSpeed(speed) {
  return `${Math.round(speed * 3.6)} km/h`; // Convert m/s to km/h
}

/**
 * Get wind direction from degrees
 */
function getWindDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(((degrees % 360) / 45)) % 8;
  return directions[index];
}

/**
 * Format humidity
 */
function formatHumidity(humidity) {
  return `${humidity}%`;
}

/**
 * Format pressure
 */
function formatPressure(pressure) {
  return `${pressure} hPa`;
}

/**
 * Format visibility
 */
function formatVisibility(visibility) {
  return `${(visibility / 1000).toFixed(1)} km`;
}

/**
 * Get UV index category
 */
function getUVCategory(uvIndex) {
  if (uvIndex <= 2) return { level: 'Low', color: '#00E400' };
  if (uvIndex <= 5) return { level: 'Moderate', color: '#F7E400' };
  if (uvIndex <= 7) return { level: 'High', color: '#F85900' };
  if (uvIndex <= 10) return { level: 'Very High', color: '#D8001D' };
  return { level: 'Extreme', color: '#6B49C8' };
}

/**
 * Get AQI category and color
 */
function getAQICategory(aqi) {
  switch(aqi) {
    case 1:
      return { level: 'Good', color: '#00E400', description: 'Air quality is satisfactory' };
    case 2:
      return { level: 'Fair', color: '#FFFF00', description: 'Air quality is acceptable' };
    case 3:
      return { level: 'Moderate', color: '#FF7E00', description: 'Unhealthy for sensitive groups' };
    case 4:
      return { level: 'Poor', color: '#FF0000', description: 'Health effects for everyone' };
    case 5:
      return { level: 'Very Poor', color: '#8F3F97', description: 'Health warning of emergency conditions' };
    default:
      return { level: 'Unknown', color: '#999999', description: 'No data available' };
  }
}

/**
 * Calculate "feels like" description
 */
function getFeelsLikeDescription(actual, feelsLike) {
  const diff = feelsLike - actual;
  if (Math.abs(diff) < 1) return 'Similar to actual temperature';
  if (diff > 0) return `Feels ${Math.round(Math.abs(diff))}° warmer`;
  return `Feels ${Math.round(Math.abs(diff))}° cooler`;
}
