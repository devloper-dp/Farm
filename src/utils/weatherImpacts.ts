import { WeatherData } from '../types';
import { WeatherForecast, WeatherImpact } from '../types/weather';

const IMPACT_THRESHOLDS = {
  temperature: {
    low: 15,
    high: 30,
    critical: 35
  },
  humidity: {
    low: 40,
    high: 70,
    critical: 85
  },
  rainfall: {
    low: 20,
    high: 100,
    critical: 150
  }
};

export function calculateWeatherImpacts(
  current: WeatherData,
  forecast: WeatherForecast[]
): WeatherImpact[] {
  const impacts: WeatherImpact[] = [];

  // Temperature impacts
  const avgTemp = forecast.reduce((sum, day) => sum + day.temperature, 0) / forecast.length;
  if (avgTemp > IMPACT_THRESHOLDS.temperature.critical) {
    impacts.push({
      parameter: 'temperature',
      effect: 'increase',
      magnitude: 2,
      recommendation: 'Consider additional irrigation and heat protection measures.'
    });
  } else if (avgTemp < IMPACT_THRESHOLDS.temperature.low) {
    impacts.push({
      parameter: 'temperature',
      effect: 'decrease',
      magnitude: 1,
      recommendation: 'Monitor for frost risk and consider protective measures.'
    });
  }

  // Humidity impacts
  const avgHumidity = forecast.reduce((sum, day) => sum + day.humidity, 0) / forecast.length;
  if (avgHumidity > IMPACT_THRESHOLDS.humidity.critical) {
    impacts.push({
      parameter: 'humidity',
      effect: 'increase',
      magnitude: 2,
      recommendation: 'High disease risk. Consider fungicide application.'
    });
  } else if (avgHumidity < IMPACT_THRESHOLDS.humidity.low) {
    impacts.push({
      parameter: 'humidity',
      effect: 'decrease',
      magnitude: 1,
      recommendation: 'Increase irrigation frequency.'
    });
  }

  // Rainfall impacts
  const totalRainfall = forecast.reduce((sum, day) => sum + day.rainfall, 0);
  if (totalRainfall > IMPACT_THRESHOLDS.rainfall.critical) {
    impacts.push({
      parameter: 'rainfall',
      effect: 'increase',
      magnitude: 2,
      recommendation: 'Delay fertilizer application. Monitor drainage.'
    });
  } else if (totalRainfall < IMPACT_THRESHOLDS.rainfall.low) {
    impacts.push({
      parameter: 'rainfall',
      effect: 'decrease',
      magnitude: 1,
      recommendation: 'Consider irrigation scheduling.'
    });
  }

  return impacts;
}