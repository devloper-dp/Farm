import React from 'react';
import { SeasonalAdjustment } from '../types/season';
import { Sun, Cloud, Leaf, Snowflake } from 'lucide-react';

interface Props {
  adjustment: SeasonalAdjustment;
}

export function SeasonalRecommendations({ adjustment }: Props) {
  const getSeasonIcon = (season: string) => {
    switch (season) {
      case 'spring':
        return <Leaf className="w-5 h-5 text-green-500" />;
      case 'summer':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'fall':
        return <Cloud className="w-5 h-5 text-orange-500" />;
      case 'winter':
        return <Snowflake className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-green-100">
      <div className="flex items-center gap-2 mb-4">
        {getSeasonIcon(adjustment.season)}
        <h2 className="text-xl font-semibold text-gray-800 capitalize">
          {adjustment.season} Season Recommendations
        </h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Temperature Range:</span>
            <span className="ml-2">
              {adjustment.temperatureRange[0]}°C - {adjustment.temperatureRange[1]}°C
            </span>
          </div>
          <div>
            <span className="text-gray-600">Humidity Range:</span>
            <span className="ml-2">
              {adjustment.humidityRange[0]}% - {adjustment.humidityRange[1]}%
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-2">Recommendations:</h3>
          <ul className="list-disc pl-5 space-y-2">
            {adjustment.recommendations.map((rec, index) => (
              <li key={index} className="text-gray-600">{rec}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 p-3 bg-green-50 rounded-md">
          <p className="text-sm text-green-700">
            Seasonal Adjustment Factor: {adjustment.adjustmentFactor.toFixed(2)}x
          </p>
        </div>
      </div>
    </div>
  );
}