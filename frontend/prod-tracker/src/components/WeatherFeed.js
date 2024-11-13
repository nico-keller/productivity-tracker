import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherFeed.css';

// Weather code mapping constants
const WEATHER_CODES = {
  CLEAR: "1000",
  MOSTLY_CLEAR: "1100",
  PARTLY_CLOUDY: "1101",
  MOSTLY_CLOUDY: "1102",
  CLOUDY: "1001",
  FOG: "2000",
  LIGHT_FOG: "2100",
  DRIZZLE: "4000",
  RAIN: "4001",
  LIGHT_RAIN: "4200",
  HEAVY_RAIN: "4201",
  SNOW: "5000",
  FLURRIES: "5001",
  LIGHT_SNOW: "5100",
  HEAVY_SNOW: "5101",
  FREEZING_DRIZZLE: "6000",
  FREEZING_RAIN: "6001",
  LIGHT_FREEZING_RAIN: "6200",
  HEAVY_FREEZING_RAIN: "6201",
  ICE_PELLETS: "7000",
  HEAVY_ICE_PELLETS: "7101",
  LIGHT_ICE_PELLETS: "7102",
  THUNDERSTORM: "8000"
};

const weatherIcons = {
  [WEATHER_CODES.CLEAR]: "☀️",
  [WEATHER_CODES.MOSTLY_CLEAR]: "🌤",
  [WEATHER_CODES.PARTLY_CLOUDY]: "⛅",
  [WEATHER_CODES.MOSTLY_CLOUDY]: "☁️",
  [WEATHER_CODES.CLOUDY]: "☁️",
  [WEATHER_CODES.FOG]: "🌫️",
  [WEATHER_CODES.LIGHT_FOG]: "🌁",
  [WEATHER_CODES.DRIZZLE]: "🌧️",
  [WEATHER_CODES.RAIN]: "🌧️",
  [WEATHER_CODES.LIGHT_RAIN]: "🌦️",
  [WEATHER_CODES.HEAVY_RAIN]: "🌧️",
  [WEATHER_CODES.SNOW]: "❄️",
  [WEATHER_CODES.FLURRIES]: "❄️",
  [WEATHER_CODES.LIGHT_SNOW]: "🌨️",
  [WEATHER_CODES.HEAVY_SNOW]: "❄️",
  [WEATHER_CODES.FREEZING_DRIZZLE]: "🌧️",
  [WEATHER_CODES.FREEZING_RAIN]: "🌧️",
  [WEATHER_CODES.LIGHT_FREEZING_RAIN]: "🌧️",
  [WEATHER_CODES.HEAVY_FREEZING_RAIN]: "🌧️",
  [WEATHER_CODES.ICE_PELLETS]: "🌩️",
  [WEATHER_CODES.HEAVY_ICE_PELLETS]: "🌩️",
  [WEATHER_CODES.LIGHT_ICE_PELLETS]: "🌩️",
  [WEATHER_CODES.THUNDERSTORM]: "⛈️"
};

const getWeatherIcon = (code) => weatherIcons[code] || "☀️";

const WeatherForecastItem = ({ interval }) => {
  const { startTime, values } = interval;
  const { weatherCode, temperatureMax, temperatureMin, windSpeed, precipitationIntensity } = values;

  return (
    <div className="daily-forecast-item">
      <p><strong>{new Date(startTime).toLocaleDateString()}</strong></p>
      <div className="weather-icon">{getWeatherIcon(weatherCode)}</div>
      <p>Max: {temperatureMax} °C</p>
      <p>Min: {temperatureMin} °C</p>
      <p>Wind: {windSpeed} km/h</p>
      <p>Precipitation: {precipitationIntensity} mm/hr</p>
    </div>
  );
};

function WeatherFeed() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/weather');
        setWeather(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to load weather data. Please try again later.");
      }
    };

    fetchWeather();

    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return <div className="weather-feed error">{error}</div>;
  }

  return (
    <div className="weather-feed">
      <h1>5-Day Weather Forecast</h1>
      {weather ? (
        <div className="daily-forecast">
          {weather.data.timelines[0].intervals.map((interval, index) => (
            <WeatherForecastItem key={index} interval={interval} />
          ))}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherFeed;
