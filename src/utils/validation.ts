import { SoilData, WeatherData, ValidationError } from '../types';

export function validateSoilData(data: SoilData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (data.ph < 0 || data.ph > 14) {
    errors.push({ field: 'ph', message: 'pH must be between 0 and 14' });
  }

  if (data.nitrogen < 0) {
    errors.push({ field: 'nitrogen', message: 'Nitrogen cannot be negative' });
  }

  if (data.phosphorus < 0) {
    errors.push({ field: 'phosphorus', message: 'Phosphorus cannot be negative' });
  }

  if (data.potassium < 0) {
    errors.push({ field: 'potassium', message: 'Potassium cannot be negative' });
  }

  if (data.organicMatter < 0 || data.organicMatter > 100) {
    errors.push({ field: 'organicMatter', message: 'Organic matter must be between 0 and 100' });
  }

  return errors;
}

export function validateWeatherData(data: WeatherData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (data.temperature < -50 || data.temperature > 60) {
    errors.push({ field: 'temperature', message: 'Temperature must be between -50°C and 60°C' });
  }

  if (data.humidity < 0 || data.humidity > 100) {
    errors.push({ field: 'humidity', message: 'Humidity must be between 0% and 100%' });
  }

  if (data.rainfall < 0) {
    errors.push({ field: 'rainfall', message: 'Rainfall cannot be negative' });
  }

  return errors;
}