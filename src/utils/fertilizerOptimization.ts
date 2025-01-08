import { FertilizerOptimization, OptimizationFactors } from '../types/fertilizer';
import { WeatherData } from '../types';
import { SoilData } from '../types';

const OPTIMAL_CONDITIONS = {
  soilMoisture: { min: 40, max: 60 },
  temperature: { min: 15, max: 25 },
  rainfall: { min: 10, max: 30 }
};

export function optimizeFertilizerApplication(
  baseQuantity: number,
  soilData: SoilData,
  weatherData: WeatherData,
  factors: OptimizationFactors
): FertilizerOptimization {
  // Calculate weather adjustment factor
  const weatherFactor = calculateWeatherFactor(weatherData, factors);
  
  // Calculate soil condition factor
  const soilFactor = calculateSoilFactor(soilData);
  
  // Calculate seasonal factor
  const seasonFactor = calculateSeasonalFactor(new Date());
  
  // Calculate adjusted quantity
  const adjustedQuantity = baseQuantity * weatherFactor * soilFactor * seasonFactor;

  return {
    baseQuantity,
    adjustedQuantity,
    adjustmentFactors: {
      weather: weatherFactor,
      soil: soilFactor,
      season: seasonFactor
    },
    timing: calculateOptimalTiming(weatherData, factors),
    efficiency: calculateEfficiencyMetrics(soilData, weatherData, factors),
    environmentalImpact: calculateEnvironmentalImpact(adjustedQuantity, soilData, weatherData)
  };
}

function calculateWeatherFactor(weather: WeatherData, factors: OptimizationFactors): number {
  const tempFactor = calculateRangeFactor(
    weather.temperature,
    OPTIMAL_CONDITIONS.temperature.min,
    OPTIMAL_CONDITIONS.temperature.max
  );
  
  const moistureFactor = calculateRangeFactor(
    factors.soilMoisture,
    OPTIMAL_CONDITIONS.soilMoisture.min,
    OPTIMAL_CONDITIONS.soilMoisture.max
  );
  
  const rainfallFactor = calculateRangeFactor(
    weather.rainfall,
    OPTIMAL_CONDITIONS.rainfall.min,
    OPTIMAL_CONDITIONS.rainfall.max
  );

  return (tempFactor + moistureFactor + rainfallFactor) / 3;
}

function calculateSoilFactor(soil: SoilData): number {
  const phFactor = calculateRangeFactor(soil.ph, 6.0, 7.0);
  const organicMatterFactor = soil.organicMatter / 5; // Assuming 5% is optimal
  
  return (phFactor + organicMatterFactor) / 2;
}

function calculateSeasonalFactor(date: Date): number {
  const month = date.getMonth();
  // Adjust based on growing season (Northern Hemisphere)
  if (month >= 3 && month <= 8) return 1.0; // Growing season
  if (month >= 9 && month <= 11) return 0.8; // Fall
  return 0.6; // Winter
}

function calculateRangeFactor(value: number, min: number, max: number): number {
  if (value < min) return 0.7;
  if (value > max) return 0.8;
  return 1.0;
}

function calculateOptimalTiming(weather: WeatherData, factors: OptimizationFactors) {
  // Determine best time of day based on temperature and humidity
  const bestTimeOfDay = weather.temperature > 25 ? 'early morning' : 'late afternoon';
  
  // Calculate days until next application
  const daysUntilNext = calculateDaysUntilNext(weather, factors);
  
  return {
    bestTimeOfDay,
    daysUntilNext
  };
}

function calculateDaysUntilNext(weather: WeatherData, factors: OptimizationFactors): number {
  let baseDays = 14; // Default interval
  
  // Adjust based on rainfall
  if (weather.rainfall > 30) baseDays += 3;
  if (weather.rainfall < 10) baseDays -= 2;
  
  // Adjust based on temperature
  if (weather.temperature > 30) baseDays -= 2;
  if (weather.temperature < 15) baseDays += 2;
  
  return Math.max(7, Math.min(21, baseDays));
}

function calculateEfficiencyMetrics(
  soil: SoilData,
  weather: WeatherData,
  factors: OptimizationFactors
) {
  const nutrientUptake = calculateNutrientUptake(soil, weather);
  const leachingRisk = calculateLeachingRisk(weather, factors);
  const costEffectiveness = calculateCostEffectiveness(nutrientUptake, leachingRisk);
  
  return {
    nutrientUptake,
    leachingRisk,
    costEffectiveness
  };
}

function calculateNutrientUptake(soil: SoilData, weather: WeatherData): number {
  const baseUptake = 0.7; // Base uptake efficiency
  const phFactor = soil.ph >= 6.0 && soil.ph <= 7.0 ? 1.0 : 0.8;
  const tempFactor = weather.temperature >= 15 && weather.temperature <= 25 ? 1.0 : 0.9;
  
  return baseUptake * phFactor * tempFactor;
}

function calculateLeachingRisk(weather: WeatherData, factors: OptimizationFactors): number {
  const baseRisk = 0.3;
  const rainfallFactor = weather.rainfall > 30 ? 1.5 : 1.0;
  const moistureFactor = factors.soilMoisture > 60 ? 1.3 : 1.0;
  
  return baseRisk * rainfallFactor * moistureFactor;
}

function calculateCostEffectiveness(nutrientUptake: number, leachingRisk: number): number {
  return (nutrientUptake * (1 - leachingRisk)) * 100;
}

function calculateEnvironmentalImpact(
  quantity: number,
  soil: SoilData,
  weather: WeatherData
) {
  return {
    carbonFootprint: quantity * 0.1, // kg CO2 equivalent
    waterQualityImpact: calculateWaterImpact(quantity, weather),
    soilHealthImpact: calculateSoilImpact(quantity, soil)
  };
}

function calculateWaterImpact(quantity: number, weather: WeatherData): number {
  const baseImpact = quantity * 0.05;
  const rainfallFactor = weather.rainfall > 30 ? 1.5 : 1.0;
  return baseImpact * rainfallFactor;
}

function calculateSoilImpact(quantity: number, soil: SoilData): number {
  const baseImpact = quantity * 0.03;
  const organicMatterFactor = soil.organicMatter < 3 ? 1.3 : 1.0;
  return baseImpact * organicMatterFactor;
}