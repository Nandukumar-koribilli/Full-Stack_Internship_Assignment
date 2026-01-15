// Current Weather Component

class CurrentWeather {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  /**
   * Render current weather data
   */
  render(data) {
    const isDay = isDaytime(
      Math.floor(Date.now() / 1000),
      data.sys.sunrise,
      data.sys.sunset
    );
    
    const weatherIcon = getWeatherIcon(data.weather[0].id, isDay);
    const gradient = getWeatherGradient(data.weather[0].id, isDay);
    
    // Apply gradient to body background
    document.body.style.background = gradient;
    
    const html = `
      <div class="weather-main">
        <div class="weather-icon-large">${weatherIcon}</div>
        
        <div class="weather-info">
          <div class="location-name">
            <span>📍</span>
            ${data.name}, ${data.sys.country}
          </div>
          
          <div class="temperature">${formatTemp(data.main.temp)}</div>
          
          <div class="weather-description">${data.weather[0].description}</div>
          
          <div class="feels-like">
            Feels like ${formatTemp(data.main.feels_like)} • 
            ${getFeelsLikeDescription(data.main.temp, data.main.feels_like)}
          </div>
        </div>
      </div>
      
      <div class="weather-stats">
        <div class="stat-item">
          <div class="stat-label">
            <span>💧</span>
            Humidity
          </div>
          <div class="stat-value">${formatHumidity(data.main.humidity)}</div>
        </div>
        
        <div class="stat-item">
          <div class="stat-label">
            <span>🌡️</span>
            Pressure
          </div>
          <div class="stat-value">${formatPressure(data.main.pressure)}</div>
        </div>
        
        <div class="stat-item">
          <div class="stat-label">
            <span>👁️</span>
            Visibility
          </div>
          <div class="stat-value">${formatVisibility(data.visibility)}</div>
        </div>
        
        <div class="stat-item">
          <div class="stat-label">
            <span>💨</span>
            Wind
          </div>
          <div class="stat-value">
            ${formatWindSpeed(data.wind.speed)}
            <span style="font-size: 0.875rem; color: var(--color-text-muted);">
              ${getWindDirection(data.wind.deg)}
            </span>
          </div>
        </div>
      </div>
    `;
    
    this.container.innerHTML = html;
  }

  /**
   * Show loading state
   */
  showLoading() {
    this.container.innerHTML = '<div class="loading-spinner"></div>';
  }

  /**
   * Show error message
   */
  showError(message) {
    this.container.innerHTML = `
      <div class="text-center">
        <p style="color: var(--color-text-muted); font-size: 1.125rem;">
          ⚠️ ${message}
        </p>
      </div>
    `;
  }
}
