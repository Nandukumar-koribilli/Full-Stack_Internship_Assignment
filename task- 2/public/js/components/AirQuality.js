// Air Quality Component

class AirQuality {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  /**
   * Render air quality data
   */
  render(data) {
    const cardContent = this.container.querySelector('.card-content');
    
    if (!data.list || data.list.length === 0) {
      this.showError('No air quality data available');
      return;
    }
    
    const aqi = data.list[0].main.aqi;
    const components = data.list[0].components;
    const aqiInfo = getAQICategory(aqi);
    
    const html = `
      <div style="width: 100%;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: ${aqiInfo.color}20;
            border: 4px solid ${aqiInfo.color};
            margin-bottom: 1rem;
          ">
            <div style="
              font-size: 3rem;
              font-weight: 700;
              color: ${aqiInfo.color};
            ">${aqi}</div>
          </div>
          
          <div style="
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--color-text-primary);
            margin-bottom: 0.5rem;
          ">${aqiInfo.level}</div>
          
          <div style="
            font-size: 0.875rem;
            color: var(--color-text-muted);
          ">${aqiInfo.description}</div>
        </div>
        
        <div style="
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        ">
          ${this.renderPollutant('PM2.5', components.pm2_5, 'µg/m³')}
          ${this.renderPollutant('PM10', components.pm10, 'µg/m³')}
          ${this.renderPollutant('O₃', components.o3, 'µg/m³')}
          ${this.renderPollutant('NO₂', components.no2, 'µg/m³')}
          ${this.renderPollutant('SO₂', components.so2, 'µg/m³')}
          ${this.renderPollutant('CO', components.co, 'µg/m³')}
        </div>
      </div>
    `;
    
    cardContent.innerHTML = html;
  }

  /**
   * Render individual pollutant
   */
  renderPollutant(name, value, unit) {
    return `
      <div style="
        padding: 0.75rem;
        background: var(--color-bg-card);
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-border);
      ">
        <div style="
          font-size: 0.75rem;
          color: var(--color-text-muted);
          margin-bottom: 0.25rem;
        ">${name}</div>
        <div style="
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-text-primary);
        ">${value.toFixed(1)} ${unit}</div>
      </div>
    `;
  }

  /**
   * Show loading state
   */
  showLoading() {
    const cardContent = this.container.querySelector('.card-content');
    cardContent.innerHTML = '<div class="loading-spinner"></div>';
  }

  /**
   * Show error message
   */
  showError(message) {
    const cardContent = this.container.querySelector('.card-content');
    cardContent.innerHTML = `
      <p style="color: var(--color-text-muted);">⚠️ ${message}</p>
    `;
  }
}
