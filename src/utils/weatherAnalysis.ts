import { WeatherData, WeatherForecast, WeatherTrend } from '../types/weather';

export function analyzeWeatherTrends(
  current: WeatherData,
  forecast: WeatherForecast[]
): WeatherTrend[] {
  const trends: WeatherTrend[] = [];
  
  // Analyze temperature trends
  const avgTemp = forecast.reduce((sum, day) => sum + day.temperature, 0) / forecast.length;
  const tempTrend: WeatherTrend = {
    type: 'temperature',
    trend: avgTemp > current.temperature ? 'increasing' : 
           avgTemp < current.temperature ? 'decreasing' : 'stable',
    impact: getTemperatureImpact(avgTemp),
    recommendation: getTemperatureRecommendation(avgTemp)
  };
  trends.push(tempTrend);

  // Analyze humidity trends
  const avgHumidity = forecast.reduce((sum, day) => sum + day.humidity, 0) / forecast.length;
  const humidityTrend: WeatherTrend = {
    type: 'humidity',
    trend: avgHumidity > current.humidity ? 'increasing' : 
           avgHumidity < current.humidity ? 'decreasing' : 'stable',
    impact: getHumidityImpact(avgHumidity),
    recommendation: getHumidityRecommendation(avgHumidity)
  };
  trends.push(humidityTrend);

  // Analyze rainfall trends
  const totalRainfall = forecast.reduce((sum, day) => sum + day.rainfall, 0);
  const rainfallTrend: WeatherTrend = {
    type: 'rainfall',
    trend: totalRainfall > current.rainfall * forecast.length ? 'increasing' : 
           totalRainfall < current.rainfall * forecast.length ? 'decreasing' : 'stable',
    impact: getRainfallImpact(totalRainfall / forecast.length),
    recommendation: getRainfallRecommendation(totalRainfall / forecast.length)
  };
  trends.push(rainfallTrend);

  return trends;
}

function getTemperatureImpact(temp: number): 'positive' | 'neutral' | 'negative' {
  if (temp >= 20 && temp <= 30) return 'positive';
  if (temp >= 15 && temp <= 35) return 'neutral';
  return 'negative';
}

function getHumidityImpact(humidity: number): 'positive' | 'neutral' | 'negative' {
  if (humidity >= 40 && humidity <= 70) return 'positive';
  if (humidity >= 30 && humidity <= 80) return 'neutral';
  return 'negative';
}

function getRainfallImpact(rainfall: number): 'positive' | 'neutral' | 'negative' {
  if (rainfall >= 20 && rainfall <= 100) return 'positive';
  if (rainfall >= 10 && rainfall <= 150) return 'neutral';
  return 'negative';
}

function getTemperatureRecommendation(temp: number): string {
  if (temp > 35) return 'Consider additional irrigation and shade protection';
  if (temp < 15) return 'Monitor for frost risk and consider protective measures';
  return 'Temperature conditions are favorable for crop growth';
}

function getHumidityRecommendation(humidity: number): string {
  if (humidity > 80) return 'Monitor for disease risk and ensure good air circulation';
  if (humidity < 30) return 'Consider irrigation or humidity management techniques';
  return 'Humidity levels are suitable for crop development';
}

function getRainfallRecommendation(rainfall: number): string {
  if (rainfall > 150) return 'Ensure proper drainage and monitor for waterlogging';
  if (rainfall < 10) return 'Implement irrigation schedule to maintain soil moisture';
  return 'Rainfall levels are adequate for crop needs';
}