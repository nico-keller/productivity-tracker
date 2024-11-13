import requests
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone

# Load environment variables
load_dotenv()

API_KEY = os.getenv("WEATHER_API_KEY")
if not API_KEY:
    raise ValueError("WEATHER_API_KEY is not set in the environment variables")

# Set the Tomorrow.io Timelines endpoint
BASE_URL = "https://api.tomorrow.io/v4/timelines"

# Function to fetch weather forecast
def fetch_weather_forecast(latitude, longitude):
    # Define the fields we want in the forecast
    fields = [
        "temperatureMax",
        "temperatureMin",
        "temperature",  # Fallback for calculation
        "precipitationIntensity",
        "windSpeed",
        "windGust",
        "weatherCode",
    ]

    # Set units to metric, timesteps, timezone, and time frame
    units = "metric"
    timesteps = ["1d"]
    timezone_str = "Europe/Zurich"
    start_time = datetime.now(timezone.utc).isoformat()
    end_time = (datetime.now(timezone.utc) + timedelta(days=5)).isoformat()

    # Set query parameters
    params = {
        "apikey": API_KEY,
        "location": f"{latitude},{longitude}",
        "fields": ",".join(fields),
        "units": units,
        "timesteps": ",".join(timesteps),
        "startTime": start_time,
        "endTime": end_time,
        "timezone": timezone_str,
    }

    # Make the request to Tomorrow.io
    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        return response.json()  # Return the weather data as JSON
    except requests.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return None
