import axios from 'axios';
import { WeatherForecast } from '../types/weather';
import { WeatherData } from '../types';
import { calculateSolarRadiation } from '../utils/weather/weatherUtils';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });

    return {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      rainfall: response.data.rain?.['1h'] || 0
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw new Error('Failed to fetch current weather data');
  }
}

export async function getWeatherForecast(lat: number, lon: number): Promise<WeatherForecast[]> {
  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });

    return response.data.list.map((item: any) => ({
      date: item.dt_txt.split(' ')[0],
      temperature: item.main.temp,
      humidity: item.main.humidity,
      rainfall: item.rain?.['3h'] || 0,
      description: item.weather[0].main,
      windSpeed: item.wind.speed,
      solarRadiation: calculateSolarRadiation(item.clouds.all)
    }));
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw new Error('Failed to fetch weather forecast data');
  }
}