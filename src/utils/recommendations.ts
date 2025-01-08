import { SoilData, WeatherData, CropType, FertilizerRecommendation } from '../types';

export function calculateFertilizerRecommendation(
  userId: string,
  soilData: SoilData,
  weatherData: WeatherData,
  cropType: CropType
): FertilizerRecommendation {
  // Calculate nutrient deficiencies
  const nitrogenDiff = cropType.nutrientRequirements.nitrogen - soilData.nitrogen;
  const phosphorusDiff = cropType.nutrientRequirements.phosphorus - soilData.phosphorus;
  const potassiumDiff = cropType.nutrientRequirements.potassium - soilData.potassium;

  // Adjust for weather conditions
  const weatherFactor = calculateWeatherFactor(weatherData);
  
  // Generate recommendation
  const quantity = Math.max(
    (nitrogenDiff + phosphorusDiff + potassiumDiff) * weatherFactor,
    0
  );

  return {
    id: crypto.randomUUID(),
    userId,
    type: determineFertilizerType(nitrogenDiff, phosphorusDiff, potassiumDiff),
    quantity: Math.round(quantity),
    frequency: determineFrequency(weatherData),
    notes: generateNotes(soilData, cropType),
    date: new Date().toLocaleDateString(),
    soilData,
    weatherData,
    cropType
  };
}

function calculateWeatherFactor(weatherData: WeatherData): number {
  const tempFactor = 1 + (weatherData.temperature - 20) * 0.02;
  const humidityFactor = 1 + (weatherData.humidity - 60) * 0.01;
  const rainfallFactor = 1 - (weatherData.rainfall * 0.05);
  
  return Math.max(0.5, Math.min(1.5, tempFactor * humidityFactor * rainfallFactor));
}

function determineFertilizerType(
  nitrogenDiff: number,
  phosphorusDiff: number,
  potassiumDiff: number
): string {
  if (nitrogenDiff > phosphorusDiff && nitrogenDiff > potassiumDiff) {
    return 'Nitrogen-rich fertilizer';
  } else if (phosphorusDiff > potassiumDiff) {
    return 'Phosphorus-rich fertilizer';
  } else {
    return 'Potassium-rich fertilizer';
  }
}

function determineFrequency(weatherData: WeatherData): string {
  if (weatherData.rainfall > 100) {
    return 'Every 3 weeks';
  } else if (weatherData.rainfall > 50) {
    return 'Every 2 weeks';
  }
  return 'Weekly';
}

function generateNotes(soilData: SoilData, cropType: CropType): string {
  const notes: string[] = [];
  
  if (soilData.ph < cropType.idealPh[0]) {
    notes.push('Consider adding lime to increase soil pH.');
  } else if (soilData.ph > cropType.idealPh[1]) {
    notes.push('Consider adding sulfur to decrease soil pH.');
  }
  
  if (soilData.organicMatter < 3) {
    notes.push('Add organic matter to improve soil structure.');
  }
  
  return notes.join(' ');
}