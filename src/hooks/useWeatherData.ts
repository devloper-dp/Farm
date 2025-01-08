import useSWR from 'swr';
import { WeatherCondition } from '../types/weather';
import { getCurrentWeather, getWeatherForecast} from '../services/weatherApi';
import { analyzeWeatherTrends } from '../utils/weatherAnalysis';
import { calculateWeatherImpacts } from '../utils/weatherImpacts';

export function useWeatherData() {
  const { data: currentWeather, error: currentError } = useSWR(
    'current-weather',
    async () => {
      try {
        // Using default coordinates until location service is implemented
        return await getCurrentWeather(40.7128, -74.0060);
      } catch (error) {
        console.error('Error fetching current weather:', error);
        return null;
      }
    },
    { refreshInterval: 900000 } // Refresh every 15 minutes
  );

  const { data: forecast, error: forecastError } = useSWR(
    'weather-forecast',
    async () => {
      try {
        // Using default coordinates until location service is implemented
        return await getWeatherForecast(40.7128, -74.0060);
      } catch (error) {
        console.error('Error fetching forecast:', error);
        return null;
      }
    },
    { refreshInterval: 3600000 } // Refresh every hour
  );
  const weatherCondition: WeatherCondition | null = currentWeather && forecast ? {
    current: currentWeather,
    forecast: forecast,
    trends: analyzeWeatherTrends(currentWeather, forecast),
    impacts: calculateWeatherImpacts(currentWeather, forecast),
  } : null;

  return {
    data: weatherCondition,
    isLoading: (!currentWeather || !forecast) && !currentError && !forecastError,
    isError: currentError || forecastError 
  };
}