// Hourly Forecast Component

class HourlyForecast {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.chart = null;
  }

  /**
   * Render hourly forecast (next 24 hours)
   */
  render(forecastData) {
    const cardContent = this.container.querySelector('.card-content');
    
    // Get next 8 periods (24 hours with 3-hour intervals)
    const hourlyData = forecastData.list.slice(0, 8);
    
    // Prepare data for chart
    const labels = hourlyData.map(item => formatTime(item.dt, { hour: 'numeric' }));
    const temps = hourlyData.map(item => Math.round(item.main.temp));
    const precipitation = hourlyData.map(item => (item.pop * 100).toFixed(0));
    
    // Create canvas for chart
    cardContent.innerHTML = `
      <div style="width: 100%; height: 250px;">
        <canvas id="hourlyChart"></canvas>
      </div>
    `;
    
    const ctx = document.getElementById('hourlyChart').getContext('2d');
    
    // Destroy existing chart if any
    if (this.chart) {
      this.chart.destroy();
    }
    
    // Create new chart
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temps,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
            yAxisID: 'y'
          },
          {
            label: 'Precipitation (%)',
            data: precipitation,
            borderColor: 'rgb(139, 92, 246)',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            tension: 0.4,
            fill: true,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: getComputedStyle(document.documentElement)
                .getPropertyValue('--color-text-primary').trim(),
              font: {
                family: 'Inter'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            borderRadius: 8,
            titleFont: {
              family: 'Inter',
              size: 14
            },
            bodyFont: {
              family: 'Inter',
              size: 13
            }
          }
        },
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            grid: {
              color: 'rgba(128, 128, 128, 0.1)'
            },
            ticks: {
              color: getComputedStyle(document.documentElement)
                .getPropertyValue('--color-text-secondary').trim(),
              callback: function(value) {
                return value + '°';
              }
            }
          },
          y1: {
            type: 'linear',
            position: 'right',
            grid: {
              display: false
            },
            ticks: {
              color: getComputedStyle(document.documentElement)
                .getPropertyValue('--color-text-secondary').trim(),
              callback: function(value) {
                return value + '%';
              }
            },
            min: 0,
            max: 100
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: getComputedStyle(document.documentElement)
                .getPropertyValue('--color-text-secondary').trim()
            }
          }
        }
      }
    });
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
