import { Season, SeasonalAdjustment } from '../types/season';
import { WeatherData } from '../types';

export const seasonalAdjustments: SeasonalAdjustment[] = [
  {
    season: 'spring',
    temperatureRange: [15, 25],
    humidityRange: [50, 70],
    adjustmentFactor: 1.1,
    recommendations: [
      'Apply fertilizer early in the morning',
      'Monitor soil moisture closely as temperatures rise',
      'Consider split applications for better nutrient uptake'
    ]
  },
  {
    season: 'summer',
    temperatureRange: [25, 35],
    humidityRange: [40, 60],
    adjustmentFactor: 0.9,
    recommendations: [
      'Reduce fertilizer quantity due to increased volatilization',
      'Apply during cooler parts of the day',
      'Increase frequency of smaller applications'
    ]
  },
  {
    season: 'fall',
    temperatureRange: [10, 20],
    humidityRange: [60, 80],
    adjustmentFactor: 1.0,
    recommendations: [
      'Focus on phosphorus and potassium for winter hardiness',
      'Apply before first frost',
      'Consider slow-release fertilizers'
    ]
  },
  {
    season: 'winter',
    temperatureRange: [0, 15],
    humidityRange: [70, 90],
    adjustmentFactor: 0.7,
    recommendations: [
      'Minimize fertilizer application',
      'Focus on soil preparation for spring',
      'Monitor soil temperature before application'
    ]
  }
];

export function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

export function getSeasonalAdjustment(weather: WeatherData): SeasonalAdjustment {
  const currentSeason = getCurrentSeason();
  return seasonalAdjustments.find(adj => adj.season === currentSeason)!;
}