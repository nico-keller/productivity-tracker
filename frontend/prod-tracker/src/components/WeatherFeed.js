import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherFeed.css';

// Mapping weather codes to icons based on Tomorrow.io weather codes
const weatherIcons = {
  "1000": "☀️",         // Clear
  "1100": "🌤",         // Mostly Clear
  "1101": "⛅",         // Partly Cloudy
  "1102": "☁️",         // Mostly Cloudy
  "1001": "☁️",         // Cloudy
  "2000": "🌫️",         // Fog
  "2100": "🌁",         // Light Fog
  "4000": "🌧️",         // Drizzle
  "4001": "🌧️",         // Rain
  "4200": "🌦️",         // Light Rain
  "4201": "🌧️",         // Heavy Rain
  "5000": "❄️",         // Snow
  "5001": "❄️",         // Flurries
  "5100": "🌨️",         // Light Snow
  "5101": "❄️",         // Heavy Snow
  "6000": "🌧️",         // Freezing Drizzle
  "6001": "🌧️",         // Freezing Rain
  "6200": "🌧️",         // Light Freezing Rain
  "6201": "🌧️",         // Heavy Freezing Rain
  "7000": "🌩️",         // Ice Pellets
  "7101": "🌩️",         // Heavy Ice Pellets
  "7102": "🌩️",         // Light Ice Pellets
  "8000": "⛈️"          // Thunderstorm
};

function getWeatherIcon(code) {
  // Map `weatherCode` values to emojis/icons
  return weatherIcons[code] || "☀️"; // Default to sun if no match is found
}

function WeatherFeed() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/weather');
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="weather-feed">
      <h1>5-Day Weather Forecast</h1>
      {weather ? (
        <div className="daily-forecast">
          {weather.data.timelines[0].intervals.map((interval, index) => (
            <div key={index} className="daily-forecast-item">
              <p><strong>{new Date(interval.startTime).toLocaleDateString()}</strong></p>
              <div className="weather-icon">{getWeatherIcon(interval.values.weatherCode)}</div>
              <p>Max: {interval.values.temperatureMax} °C</p>
              <p>Min: {interval.values.temperatureMin} °C</p>
              <p>Wind: {interval.values.windSpeed} km/h</p>
              <p>Precipitation: {interval.values.precipitationIntensity} mm/hr</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherFeed;
