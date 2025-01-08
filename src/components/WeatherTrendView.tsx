import React from 'react';
import { WeatherTrend } from '../types/weather';
import { Thermometer, Droplets, CloudRain, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Props {
  trends: WeatherTrend[];
}

export function WeatherTrendView({ trends }: Props) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return <Thermometer className="w-5 h-5" />;
      case 'humidity':
        return <Droplets className="w-5 h-5" />;
      case 'rainfall':
        return <CloudRain className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Weather Trends Analysis</h2>
      <div className="grid gap-4">
        {trends.map((trend, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              {getIcon(trend.type)}
              <h3 className="font-medium text-gray-900 capitalize">{trend.type}</h3>
              <div className={`ml-auto flex items-center gap-1 ${getImpactColor(trend.impact)}`}>
                {getTrendIcon(trend.trend)}
                <span className="text-sm capitalize">{trend.trend}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{trend.recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}