// 7-Day Forecast Component

class Forecast {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  /**
   * Process forecast data to get daily summaries
   */
  processDailyForecast(forecastData) {
    const dailyData = {};
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();
      
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: item.dt,
          temps: [],
          weather: item.weather[0],
          precipitation: []
        };
      }
      
      dailyData[dateKey].temps.push(item.main.temp);
      dailyData[dateKey].precipitation.push(item.pop);
    });
    
    // Convert to array and calculate min/max
    return Object.values(dailyData).map(day => ({
      date: day.date,
      tempMax: Math.max(...day.temps),
      tempMin: Math.min(...day.temps),
      weather: day.weather,
      precipitation: Math.max(...day.precipitation) * 100
    })).slice(0, 7); // Get first 7 days
  }

  /**
   * Render 7-day forecast
   */
  render(forecastData) {
    const dailyForecast = this.processDailyForecast(forecastData);
    const forecastContainer = this.container.querySelector('.forecast-container');
    
    const html = dailyForecast.map((day, index) => {
      const dayName = index === 0 ? 'Today' : getDayOfWeek(day.date);
      const icon = getWeatherIcon(day.weather.id, true);
      
      return `
        <div class="forecast-card">
          <div class="forecast-day">${dayName}</div>
          <div class="forecast-icon">${icon}</div>
          <div class="forecast-temps">
            <span class="temp-high">${formatTemp(day.tempMax)}</span>
            <span class="temp-low">${formatTemp(day.tempMin)}</span>
          </div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.5rem;">
            💧 ${Math.round(day.precipitation)}%
          </div>
        </div>
      `;
    }).join('');
    
    forecastContainer.innerHTML = html;
  }

  /**
   * Show loading state
   */
  showLoading() {
    const forecastContainer = this.container.querySelector('.forecast-container');
    forecastContainer.innerHTML = '<div class="loading-spinner"></div>';
  }

  /**
   * Show error message
   */
  showError(message) {
    const forecastContainer = this.container.querySelector('.forecast-container');
    forecastContainer.innerHTML = `
      <p style="color: var(--color-text-muted); text-align: center;">⚠️ ${message}</p>
    `;
  }
}
