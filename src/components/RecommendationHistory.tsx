import React from 'react';
import { FertilizerRecommendation } from '../types';
import { History } from 'lucide-react';

interface Props {
  recommendations: FertilizerRecommendation[];
}

export function RecommendationHistory({ recommendations }: Props) {
  if (recommendations.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-green-100">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-800">Previous Recommendations</h2>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="border-l-4 border-green-500 pl-4 py-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{rec.cropType.name}</h3>
                <p className="text-sm text-gray-600">{rec.date}</p>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{rec.type}</div>
                <p className="text-sm text-gray-600">
                  {rec.quantity} kg/ha, {rec.frequency}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}