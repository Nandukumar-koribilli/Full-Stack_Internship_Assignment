// Main Application Controller

// Initialize components
const worldMap = new WorldMap('worldMap');
const currentWeather = new CurrentWeather('currentWeather');
const hourlyForecast = new HourlyForecast('hourlyForecast');
const weeklyForecast = new Forecast('weeklyForecast');
const airQuality = new AirQuality('airQuality');
const weatherDetails = new WeatherDetails('weatherDetails');

// Current location coordinates
let currentLocation = { lat: null, lon: null };

// DOM elements
const locationSearch = document.getElementById('locationSearch');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const searchResults = document.getElementById('searchResults');
const themeToggle = document.getElementById('themeToggle');

/**
 * Initialize the application
 */
async function init() {
  // Set up event listeners
  setupEventListeners();
  
  // Initialize world map
  worldMap.initialize(handleMapLocationSelect);
  
  // Load theme preference
  loadThemePreference();
  
  // Try to get user's location
  await getUserLocation();
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
  // Search button
  searchBtn.addEventListener('click', handleSearch);
  
  // Search input (Enter key)
  locationSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
  
  // Search input (typing)
  locationSearch.addEventListener('input', debounce(handleSearchInput, 300));
  
  // Location button
  locationBtn.addEventListener('click', getUserLocation);
  
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Click outside to close search results
  document.addEventListener('click', (e) => {
    if (!searchResults.contains(e.target) && e.target !== locationSearch) {
      searchResults.classList.remove('show');
    }
  });
}

/**
 * Get user's geolocation
 */
async function getUserLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    // Fallback to default location (New York)
    loadWeatherData(40.7128, -74.0060);
    return;
  }
  
  locationBtn.innerHTML = '<div class="loading-spinner" style="width: 20px; height: 20px; border-width: 2px;"></div>';
  
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      await loadWeatherData(latitude, longitude);
      locationBtn.innerHTML = '<span>📍</span>';
    },
    (error) => {
      console.error('Geolocation error:', error);
      // Fallback to default location (New York)
      loadWeatherData(40.7128, -74.0060);
      locationBtn.innerHTML = '<span>📍</span>';
    }
  );
}

/**
 * Load all weather data for given coordinates
 */
async function loadWeatherData(lat, lon) {
  currentLocation = { lat, lon };
  
  // Update map marker
  worldMap.updateMarker(lat, lon);
  
  // Show loading states
  currentWeather.showLoading();
  hourlyForecast.showLoading();
  weeklyForecast.showLoading();
  airQuality.showLoading();
  weatherDetails.showLoading();
  
  try {
    // Fetch all data in parallel
    const [currentData, forecastData, airQualityData, locationData] = await Promise.all([
      WeatherAPI.getCurrentWeather(lat, lon),
      WeatherAPI.getForecast(lat, lon),
      WeatherAPI.getAirQuality(lat, lon),
      WeatherAPI.reverseGeocode(lat, lon)
    ]);
    
    // Use reverse geocoded name if available for better accuracy
    if (locationData && locationData.length > 0) {
      currentData.name = locationData[0].name;
      // Also update country if available
      if (locationData[0].country) {
        currentData.sys.country = locationData[0].country;
      }
    }
    
    // Render all components
    currentWeather.render(currentData);
    hourlyForecast.render(forecastData);
    weeklyForecast.render(forecastData);
    airQuality.render(airQualityData);
    weatherDetails.render(currentData);
    
  } catch (error) {
    console.error('Error loading weather data:', error);
    currentWeather.showError('Failed to load weather data');
    hourlyForecast.showError('Failed to load forecast');
    weeklyForecast.showError('Failed to load forecast');
    airQuality.showError('Failed to load air quality');
    weatherDetails.showError('Failed to load details');
  }
}

/**
 * Handle search button click
 */
async function handleSearch() {
  const query = locationSearch.value.trim();
  
  if (!query) {
    return;
  }
  
  try {
    const results = await WeatherAPI.searchLocation(query);
    
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div style="padding: 1rem; text-align: center; color: var(--color-text-muted);">
          No locations found
        </div>
      `;
      searchResults.classList.add('show');
      return;
    }
    
    // Load weather for first result
    const firstResult = results[0];
    await loadWeatherData(firstResult.lat, firstResult.lon);
    locationSearch.value = '';
    searchResults.classList.remove('show');
    
  } catch (error) {
    console.error('Search error:', error);
    alert('Failed to search location');
  }
}

/**
 * Handle search input (show suggestions)
 */
async function handleSearchInput() {
  const query = locationSearch.value.trim();
  
  if (query.length < 2) {
    searchResults.classList.remove('show');
    return;
  }
  
  try {
    const results = await WeatherAPI.searchLocation(query);
    displaySearchResults(results);
  } catch (error) {
    console.error('Search error:', error);
  }
}

/**
 * Display search results
 */
function displaySearchResults(results) {
  if (results.length === 0) {
    searchResults.innerHTML = `
      <div style="padding: 1rem; text-align: center; color: var(--color-text-muted);">
        No locations found
      </div>
    `;
    searchResults.classList.add('show');
    return;
  }
  
  const html = results.map(result => `
    <div class="search-result-item" data-lat="${result.lat}" data-lon="${result.lon}">
      <div class="result-name">${result.name}</div>
      <div class="result-details">
        ${result.state ? `${result.state}, ` : ''}${result.country}
      </div>
    </div>
  `).join('');
  
  searchResults.innerHTML = html;
  searchResults.classList.add('show');
  
  // Add click handlers to results
  searchResults.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', async () => {
      const lat = parseFloat(item.dataset.lat);
      const lon = parseFloat(item.dataset.lon);
      
      await loadWeatherData(lat, lon);
      locationSearch.value = '';
      searchResults.classList.remove('show');
    });
  });
}

/**
 * Toggle theme
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update icon
  const icon = themeToggle.querySelector('.theme-icon');
  icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

/**
 * Load theme preference
 */
function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const icon = themeToggle.querySelector('.theme-icon');
  icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

/**
 * Debounce utility
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Handle location selection from map
 */
async function handleMapLocationSelect(lat, lng) {
  await loadWeatherData(lat, lng);
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
