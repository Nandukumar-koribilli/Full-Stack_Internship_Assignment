# Weather Application

A stunning, full-featured weather application that integrates with OpenWeatherMap API to provide comprehensive weather data, forecasts, air quality information, and beautiful visualizations.

![Weather App](https://img.shields.io/badge/Status-Complete-success)
![API](https://img.shields.io/badge/API-OpenWeatherMap-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

### Core Weather Features

- **Current Weather**: Real-time weather data with temperature, conditions, humidity, pressure, visibility, and wind
- **7-Day Forecast**: Daily weather predictions with high/low temperatures and precipitation probability
- **24-Hour Forecast**: Hourly temperature and precipitation chart for the next 24 hours
- **Air Quality Index**: Comprehensive AQI with pollutant breakdown (PM2.5, PM10, O₃, NO₂, SO₂, CO)
- **Weather Details**:
  - UV Index with protection recommendations
  - Sunrise/Sunset times
  - Animated wind compass with direction and speed
  - Cloud cover visualization

### User Experience

- **Premium UI/UX**: Glassmorphism design with smooth gradients and animations
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Weather-Based Backgrounds**: Dynamic gradient backgrounds that change based on weather conditions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Location Features**:
  - Automatic geolocation detection
  - City search with autocomplete suggestions
  - Support for worldwide locations

### Technical Features

- **Smart Caching**: 5-minute cache to reduce API calls and improve performance
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Interactive Charts**: Chart.js visualizations for hourly forecast data
- **Component Architecture**: Modular, reusable component structure

## 🚀 Technology Stack

### Backend

- **Node.js + Express**: RESTful API server
- **Axios**: HTTP client for external API calls
- **Node-Cache**: In-memory caching system
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend

- **Vanilla JavaScript**: Pure JS for maximum performance
- **HTML5**: Semantic markup with SEO optimization
- **CSS3**: Modern CSS with custom properties, glassmorphism, and animations
- **Chart.js**: Interactive data visualizations
- **Google Fonts**: Inter and Outfit typography

### API

- **OpenWeatherMap API**:
  - Current Weather Data API
  - 5-Day/3-Hour Forecast API
  - Air Pollution API
  - Geocoding API

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (free tier available)

### Setup Steps

1. **Clone or navigate to the project directory**

   ```bash
   cd "full stack task 2"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API Key**

   The `.env` file is already configured with your API key. If you need to change it:

   ```
   OPENWEATHER_API_KEY=your_api_key_here
   PORT=3000
   ```

4. **Start the server**

   ```bash
   npm run dev
   ```

   Or for production:

   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
full stack task 2/
├── server.js                 # Express server with API endpoints
├── package.json             # Dependencies and scripts
├── .env                     # Environment variables (API key)
├── .env.example            # Example environment file
├── .gitignore              # Git ignore rules
├── README.md               # This file
│
└── public/                 # Frontend files
    ├── index.html         # Main HTML file
    │
    ├── css/
    │   └── styles.css     # Complete design system
    │
    ├── js/
    │   ├── app.js         # Main application controller
    │   ├── api.js         # API service layer
    │   │
    │   ├── components/    # UI Components
    │   │   ├── CurrentWeather.js
    │   │   ├── HourlyForecast.js
    │   │   ├── Forecast.js
    │   │   ├── AirQuality.js
    │   │   └── WeatherDetails.js
    │   │
    │   └── utils/         # Utility functions
    │       ├── formatters.js
    │       └── weatherIcons.js
    │
    └── assets/            # Static assets (if needed)
```

## 🎨 Design Philosophy

This application follows modern web design principles:

- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Gradient Accents**: No generic colors - curated HSL palette
- **Micro-animations**: Smooth transitions and hover effects
- **Premium Typography**: Professional font pairing (Inter + Outfit)
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Dark Mode Support**: Complete theme system with CSS custom properties

## 🔧 API Endpoints

### Backend Endpoints

- `GET /api/weather/current?lat={lat}&lon={lon}` - Current weather
- `GET /api/weather/forecast?lat={lat}&lon={lon}` - 5-day forecast
- `GET /api/weather/air-quality?lat={lat}&lon={lon}` - Air quality data
- `GET /api/geocode/search?q={city}` - Search locations
- `GET /api/geocode/reverse?lat={lat}&lon={lon}` - Reverse geocode
- `GET /api/health` - Server health check

## 🎯 Key Differentiators

This weather app stands out with:

1. **Comprehensive Data**: 10+ weather metrics beyond basic temperature
2. **Premium Design**: Glassmorphism and gradient-based UI that looks expensive
3. **Smart Features**: Caching, geolocation, search suggestions
4. **Advanced Visualizations**: Charts, gauges, wind compass, UV meter
5. **Professional Architecture**: Clean separation of concerns, modular components
6. **Performance Optimized**: Efficient caching and parallel API calls


## 👨‍💻 Development

Built as an intern project to demonstrate full-stack development skills including:

- RESTful API design
- Third-party API integration
- Modern frontend development
- Responsive UI design
- Component architecture
- Error handling and caching strategies

---

** made with OpenWeatherMap API** 
