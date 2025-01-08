import { WeatherForecast } from '../../types/weather';

export function calculateSolarRadiation(cloudCover: number): number {
  // Estimate solar radiation based on cloud cover percentage
  const maxRadiation = 1000; // W/m² (maximum solar radiation on a clear day)
  return maxRadiation * (1 - (cloudCover / 100));
}

export function calculateAverageTemperature(forecast: WeatherForecast[]): number {
  return forecast.reduce((sum, day) => sum + day.temperature, 0) / forecast.length;
}

export function calculateTotalRainfall(forecast: WeatherForecast[]): number {
  return forecast.reduce((sum, day) => sum + day.rainfall, 0);
}

export function getOptimalApplicationDays(forecast: WeatherForecast[]): WeatherForecast[] {
  return forecast.filter(day => (
    day.temperature >= 15 && 
    day.temperature <= 25 &&
    day.humidity >= 40 &&
    day.humidity <= 70 &&
    day.rainfall < 5 &&
    day.windSpeed < 15
  ));
}

export function calculateRainfallProbability(forecast: WeatherForecast[]): number {
  const rainyDays = forecast.filter(day => day.rainfall > 0).length;
  return (rainyDays / forecast.length) * 100;
}