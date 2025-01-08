import { FertilizerRecommendation } from '../types';

export function generateCSV(recommendations: FertilizerRecommendation[]): string {
  const headers = [
    'Date',
    'Crop',
    'Fertilizer Type',
    'Quantity (kg/ha)',
    'Frequency',
    'Soil pH',
    'Nitrogen (ppm)',
    'Phosphorus (ppm)',
    'Potassium (ppm)',
    'Temperature (°C)',
    'Humidity (%)',
    'Rainfall (mm)',
    'Notes'
  ].join(',');

  const rows = recommendations.map(rec => [
    rec.date,
    rec.cropType.name,
    rec.type,
    rec.quantity,
    rec.frequency,
    rec.soilData.ph,
    rec.soilData.nitrogen,
    rec.soilData.phosphorus,
    rec.soilData.potassium,
    rec.weatherData.temperature,
    rec.weatherData.humidity,
    rec.weatherData.rainfall,
    `"${rec.notes}"`
  ].join(','));

  return [headers, ...rows].join('\\n');
}

export function downloadCSV(data: string, filename: string) {
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}