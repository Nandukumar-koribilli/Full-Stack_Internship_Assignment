# Weather Application - Task 2 Integration

A fully functional, premium weather application built to satisfy the **"Integrate a Third-Party API"** internship task. This project successfully integrates the OpenWeatherMap API with a dedicated backend and a responsive frontend.

![Status](https://img.shields.io/badge/Status-Complete-success)
![API](https://img.shields.io/badge/API-OpenWeatherMap-blue)

## ✅ Task Fulfillment Checklist

This project covers all requirements specified in **Task 2**:

1.  **Backend Integration** ✅

    - Created robust endpoints in `server.js` (`/api/weather/current`, `/api/weather/forecast`) to act as a secure gateway.
    - Utilized **Axios** to make server-side HTTP requests to the OpenWeatherMap API.

2.  **Frontend Implementation** ✅

    - Developed specific components (`CurrentWeather.js`, `Forecast.js`, `AirQuality.js`) to display data.
    - Used **Fetch API** to retrieve data from our backend endpoints.
    - Implemented a "Glassmorphism" design for a modern, premium look.

3.  **API Integration** ✅
    - Fully integrated **OpenWeatherMap** for Real-time Weather, 5-Day Forecasts, and Air Quality Index (AQI).

---

## � Project Screenshots

### Main Dashboard

Current weather conditions, air quality, and dynamic background.
![Weather Dashboard](images/weather%201.png)

### 7-Day Forecast

Detailed forecast view with daily high/low temperatures.
![Forecast View](images/weather%202.png)

### Search & Details

City search functionality and detailed weather metrics available worldwide.
![Details View](images/weather%203.png)

---

## � How to Install & Run

Follow these simple steps to get the app running on your machine.

### 1. Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

### 2. Configure API Key

The `.env` file is **already included** in the project directory, so you do **not** need to create it.

It comes pre-configured. However, if you want to use your own OpenWeatherMap API key, simply open the `.env` file and update it:

````env
OPENWEATHER_API_KEY=your_api_key_here
PORT=3000
```_

### 3. Start the Application

Run the development server:

```bash
npm run dev
````

### 4. Open in Browser

Visit the following URL to see the app:

```
http://localhost:3000
```

---

## � Key Files Structure

We kept the project structure clean and modular:

- **`server.js`**: The backend server that handles API calls (Task Requirement).
- **`public/index.html`**: The main entry point for the frontend.
- **`public/js/app.js`**: Main logic controller.
- **`public/js/api.js`**: Handles all `fetch` requests to the backend.
- **`public/js/components/`**:
  - `CurrentWeather.js`: component for current data.
  - `Forecast.js`: component for future data.

---

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3 (Glassmorphism), JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **API**: OpenWeatherMap
- **Tools**: Axios, Dotenv, Node-Cache

**Made for Full Stack Internship - Task 2**
