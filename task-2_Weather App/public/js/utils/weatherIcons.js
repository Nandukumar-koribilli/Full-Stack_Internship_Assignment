// Weather icon mapping and utilities

/**
 * Day weather icon mapping
 */
const weatherIconMapDay = {
  // Thunderstorm
  '200': '⛈️', '201': '⛈️', '202': '⛈️', '210': '🌩️', '211': '🌩️', 
  '212': '⛈️', '221': '⛈️', '230': '⛈️', '231': '⛈️', '232': '⛈️',
  
  // Drizzle
  '300': '🌦️', '301': '🌦️', '302': '🌧️', '310': '🌦️', '311': '🌧️', 
  '312': '🌧️', '313': '🌧️', '314': '🌧️', '321': '🌧️',
  
  // Rain
  '500': '🌦️', '501': '🌧️', '502': '🌧️', '503': '⛈️', '504': '⛈️', 
  '511': '🌨️', '520': '🌦️', '521': '🌧️', '522': '🌧️', '531': '🌧️',
  
  // Snow
  '600': '🌨️', '601': '❄️', '602': '❄️', '611': '🌨️', '612': '🌨️', 
  '613': '🌨️', '615': '🌨️', '616': '🌨️', '620': '🌨️', '621': '❄️', '622': '❄️',
  
  // Atmosphere
  '701': '🌫️', '711': '🌫️', '721': '🌫️', '731': '🌫️', '741': '🌫️', 
  '751': '🌫️', '761': '🌫️', '762': '🌫️', '771': '💨', '781': '🌪️',
  
  // Clear - Day
  '800': '☀️',
  
  // Clouds - Day
  '801': '🌤️', '802': '⛅', '803': '🌥️', '804': '☁️'
};

/**
 * Night weather icon mapping
 */
const weatherIconMapNight = {
  // Thunderstorm at night
  '200': '⛈️', '201': '⛈️', '202': '⛈️', '210': '🌩️', '211': '🌩️', 
  '212': '⛈️', '221': '⛈️', '230': '⛈️', '231': '⛈️', '232': '⛈️',
  
  // Drizzle at night
  '300': '🌧️', '301': '🌧️', '302': '🌧️', '310': '🌧️', '311': '🌧️', 
  '312': '🌧️', '313': '🌧️', '314': '🌧️', '321': '🌧️',
  
  // Rain at night
  '500': '🌧️', '501': '🌧️', '502': '🌧️', '503': '⛈️', '504': '⛈️', 
  '511': '🌨️', '520': '🌧️', '521': '🌧️', '522': '🌧️', '531': '🌧️',
  
  // Snow at night
  '600': '🌨️', '601': '❄️', '602': '❄️', '611': '🌨️', '612': '🌨️', 
  '613': '🌨️', '615': '🌨️', '616': '🌨️', '620': '🌨️', '621': '❄️', '622': '❄️',
  
  // Atmosphere at night
  '701': '🌫️', '711': '🌫️', '721': '🌫️', '731': '🌫️', '741': '🌫️', 
  '751': '🌫️', '761': '🌫️', '762': '🌫️', '771': '💨', '781': '🌪️',
  
  // Clear - Night (moon)
  '800': '🌙',
  
  // Clouds - Night (show moon with clouds or just moon)
  '801': '🌙', // Few clouds at night - moon visible
  '802': '🌙', // Scattered clouds - moon visible
  '803': '☁️', // Broken clouds
  '804': '☁️'  // Overcast
};

/**
 * Get weather icon based on weather code and time of day
 */
function getWeatherIcon(weatherCode, isDay = true) {
  const code = String(weatherCode);
  
  if (isDay) {
    return weatherIconMapDay[code] || '🌈';
  } else {
    return weatherIconMapNight[code] || '🌙';
  }
}

/**
 * Get larger animated weather icon
 */
function getAnimatedWeatherIcon(weatherCode, isDay = true) {
  const icon = getWeatherIcon(weatherCode, isDay);
  return `<span class="weather-icon-large">${icon}</span>`;
}

/**
 * Check if it's daytime based on current time and sunrise/sunset
 */
function isDaytime(currentTime, sunrise, sunset) {
  return currentTime >= sunrise && currentTime < sunset;
}

/**
 * Get background gradient based on weather condition and time
 */
function getWeatherGradient(weatherCode, isDay) {
  const code = String(weatherCode);
  
  // Night gradients
  if (!isDay) {
    // Clear night
    if (code === '800') {
      return 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)';
    }
    // Cloudy night
    if (code.startsWith('8')) {
      return 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
    }
    // Rainy/stormy night
    if (code.startsWith('2') || code.startsWith('3') || code.startsWith('5')) {
      return 'linear-gradient(135deg, #232526 0%, #414345 100%)';
    }
    // Default night
    return 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%)';
  }
  
  // Day gradients
  // Thunderstorm
  if (code.startsWith('2')) {
    return 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)';
  }
  
  // Rain/Drizzle
  if (code.startsWith('3') || code.startsWith('5')) {
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }
  
  // Snow
  if (code.startsWith('6')) {
    return 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)';
  }
  
  // Atmosphere (fog, mist, etc.)
  if (code.startsWith('7')) {
    return 'linear-gradient(135deg, #d7d2cc 0%, #304352 100%)';
  }
  
  // Clear day
  if (code === '800') {
    return 'linear-gradient(135deg, #56ccf2 0%, #2f80ed 50%, #667eea 100%)';
  }
  
  // Clouds
  if (code.startsWith('8')) {
    return 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)';
  }
  
  return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}
