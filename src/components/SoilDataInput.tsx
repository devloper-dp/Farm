import React from 'react';
import { SoilData } from '../types';

interface Props {
  soilData: SoilData;
  onChange: (data: SoilData) => void;
}

export function SoilDataInput({ soilData, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...soilData,
      [name]: parseFloat(value),
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Soil Analysis Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">pH Level</label>
          <input
            type="number"
            name="ph"
            value={soilData.ph}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="14"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nitrogen (ppm)</label>
          <input
            type="number"
            name="nitrogen"
            value={soilData.nitrogen}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phosphorus (ppm)</label>
          <input
            type="number"
            name="phosphorus"
            value={soilData.phosphorus}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Potassium (ppm)</label>
          <input
            type="number"
            name="potassium"
            value={soilData.potassium}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Organic Matter (%)</label>
          <input
            type="number"
            name="organicMatter"
            value={soilData.organicMatter}
            onChange={handleChange}
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );
}