import React from 'react';
import { WeatherImpact } from '../../types/weather';

interface Props {
  impacts: WeatherImpact[];
}

export function WeatherImpacts({ impacts }: Props) {
  if (impacts.length === 0) return null;

  const getImpactSeverityColor = (magnitude: number): string => {
    return magnitude > 1 ? 'text-red-500' : 'text-yellow-500';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium text-gray-700 mb-2">Weather Impacts & Recommendations</h3>
      <div className="space-y-2">
        {impacts.map((impact, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className={getImpactSeverityColor(impact.magnitude)}>●</span>
            <div>
              <div className="font-medium capitalize">{impact.parameter}</div>
              <p className="text-sm text-gray-600">{impact.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}