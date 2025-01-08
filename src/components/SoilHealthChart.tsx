import React from 'react';
import { SoilData } from '../types';

interface Props {
  soilData: SoilData;
}

export function SoilHealthChart({ soilData }: Props) {
  const getHealthStatus = (value: number, type: keyof SoilData): string => {
    switch (type) {
      case 'ph':
        return value >= 6.0 && value <= 7.0 ? 'Optimal' : 'Suboptimal';
      case 'organicMatter':
        return value >= 3.0 ? 'Good' : 'Low';
      default:
        return value > 50 ? 'High' : value > 20 ? 'Medium' : 'Low';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Optimal':
      case 'Good':
      case 'High':
        return 'bg-green-500';
      case 'Medium':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Soil Health Indicators</h3>
      <div className="space-y-4">
        {Object.entries(soilData).map(([key, value]) => {
          const status = getHealthStatus(value, key as keyof SoilData);
          return (
            <div key={key} className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-600 capitalize">
                {key === 'ph' ? 'pH' : key.replace(/([A-Z])/g, ' $1')}
              </div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getStatusColor(status)}`}
                  style={{ width: `${(value / (key === 'ph' ? 14 : 100)) * 100}%` }}
                />
              </div>
              <div className="w-20 text-sm text-gray-600">{status}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}