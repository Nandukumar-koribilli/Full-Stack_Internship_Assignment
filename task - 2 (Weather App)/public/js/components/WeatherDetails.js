// Weather Details Component

class WeatherDetails {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  /**
   * Render detailed weather information
   */
  render(currentData) {
    const cardContent = this.container.querySelector('.card-content');
    
    const sunrise = formatTime(currentData.sys.sunrise);
    const sunset = formatTime(currentData.sys.sunset);
    const cloudCover = currentData.clouds.all;
    
    // Calculate UV index (approximation based on cloud cover and time)
    const uvIndex = this.estimateUVIndex(currentData);
    const uvInfo = getUVCategory(uvIndex);
    
    const html = `
      <div style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        width: 100%;
      ">
        <!-- Sunrise/Sunset -->
        <div class="detail-card">
          <div class="detail-header">
            <span style="font-size: 1.5rem;">🌅</span>
            <span>Sunrise & Sunset</span>
          </div>
          <div class="detail-content">
            <div class="detail-row">
              <span class="detail-label">Sunrise</span>
              <span class="detail-value">${sunrise}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Sunset</span>
              <span class="detail-value">${sunset}</span>
            </div>
          </div>
        </div>
        
        <!-- UV Index -->
        <div class="detail-card">
          <div class="detail-header">
            <span style="font-size: 1.5rem;">☀️</span>
            <span>UV Index</span>
          </div>
          <div class="detail-content">
            <div style="
              display: flex;
              align-items: center;
              gap: 1rem;
              margin-bottom: 0.5rem;
            ">
              <div style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: ${uvInfo.color}30;
                border: 3px solid ${uvInfo.color};
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                font-weight: 700;
                color: ${uvInfo.color};
              ">${uvIndex}</div>
              <div>
                <div style="font-weight: 600; color: var(--color-text-primary);">
                  ${uvInfo.level}
                </div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">
                  ${this.getUVAdvice(uvIndex)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Cloud Cover -->
        <div class="detail-card">
          <div class="detail-header">
            <span style="font-size: 1.5rem;">☁️</span>
            <span>Cloud Cover</span>
          </div>
          <div class="detail-content">
            <div style="
              background: var(--color-bg-secondary);
              height: 12px;
              border-radius: 6px;
              overflow: hidden;
              margin-bottom: 0.5rem;
            ">
              <div style="
                width: ${cloudCover}%;
                height: 100%;
                background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
                transition: width 0.5s ease;
              "></div>
            </div>
            <div class="detail-value">${cloudCover}%</div>
          </div>
        </div>
        
        <!-- Wind Details -->
        <div class="detail-card">
          <div class="detail-header">
            <span style="font-size: 1.5rem;">💨</span>
            <span>Wind</span>
          </div>
          <div class="detail-content">
            ${this.renderWindCompass(currentData.wind.deg)}
            <div class="detail-row" style="margin-top: 0.5rem;">
              <span class="detail-label">Speed</span>
              <span class="detail-value">${formatWindSpeed(currentData.wind.speed)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Direction</span>
              <span class="detail-value">${getWindDirection(currentData.wind.deg)} (${currentData.wind.deg}°)</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    cardContent.innerHTML = html;
  }

  /**
   * Render wind compass
   */
  renderWindCompass(degrees) {
    return `
      <div style="
        width: 80px;
        height: 80px;
        margin: 0 auto;
        position: relative;
        border-radius: 50%;
        border: 2px solid var(--color-border);
        background: var(--color-bg-card);
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(${degrees}deg);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 30px solid var(--color-primary);
        "></div>
        <div style="
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-muted);
        ">N</div>
      </div>
    `;
  }

  /**
   * Estimate UV index (simplified)
   */
  estimateUVIndex(data) {
    const cloudCover = data.clouds.all;
    const currentTime = Math.floor(Date.now() / 1000);
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    
    // Base UV index (would normally come from API)
    let baseUV = 7;
    
    // Reduce based on cloud cover
    baseUV *= (1 - cloudCover / 200);
    
    // Reduce if not prime sun hours
    const dayLength = sunset - sunrise;
    const noonTime = sunrise + dayLength / 2;
    const hoursFromNoon = Math.abs(currentTime - noonTime) / 3600;
    
    if (hoursFromNoon > 2) {
      baseUV *= 0.7;
    }
    
    return Math.max(0, Math.min(11, Math.round(baseUV)));
  }

  /**
   * Get UV protection advice
   */
  getUVAdvice(uvIndex) {
    if (uvIndex <= 2) return 'No protection needed';
    if (uvIndex <= 5) return 'Wear sunglasses';
    if (uvIndex <= 7) return 'Use sunscreen SPF 30+';
    if (uvIndex <= 10) return 'Avoid sun exposure';
    return 'Stay indoors';
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
