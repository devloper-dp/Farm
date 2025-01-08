import React from 'react';
import { WeatherData } from '../types';
import { CloudRain, Thermometer, Droplets } from 'lucide-react';

interface Props {
  weatherData: WeatherData;
  onChange: (data: WeatherData) => void;
}

export function WeatherInput({ weatherData, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...weatherData,
      [name]: parseFloat(value),
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Weather Conditions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4" />
              Temperature (°C)
            </div>
          </label>
          <input
            type="number"
            name="temperature"
            value={weatherData.temperature}
            onChange={handleChange}
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Humidity (%)
            </div>
          </label>
          <input
            type="number"
            name="humidity"
            value={weatherData.humidity}
            onChange={handleChange}
            min="0"
            max="100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4" />
              Rainfall (mm)
            </div>
          </label>
          <input
            type="number"
            name="rainfall"
            value={weatherData.rainfall}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );
}