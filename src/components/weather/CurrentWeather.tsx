import { WeatherData } from '../../types/index';
import { Thermometer, Droplets, CloudRain } from 'lucide-react';

interface Props {
  weather: WeatherData;
}

export function CurrentWeather({ weather }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium text-gray-700 mb-2">Current Conditions</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-red-500" />
          <span>{weather.temperature.toFixed(1)}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          <span>{weather.humidity.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-blue-400" />
          <span>{weather.rainfall.toFixed(1)} mm</span>
        </div>
      </div>
    </div>
  );
}