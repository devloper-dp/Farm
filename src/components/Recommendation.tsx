import React from 'react';
import { FertilizerRecommendation } from '../types';
import { Home, Calendar, AlertCircle } from 'lucide-react';
import { CostAnalysisView } from './CostAnalysis';
import { calculateFertilizerCosts } from '../utils/costCalculator';

interface Props {
  recommendation: FertilizerRecommendation | null;
}

export function Recommendation({ recommendation }: Props) {
  if (!recommendation) return null;

  const costAnalysis = calculateFertilizerCosts(
    recommendation.quantity,
    recommendation.type,
    recommendation.cropType
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-green-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fertilizer Recommendation</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Home className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h3 className="font-medium text-gray-700">Recommended Fertilizer</h3>
              <p className="text-gray-900">{recommendation.type}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h3 className="font-medium text-gray-700">Application Schedule</h3>
              <p className="text-gray-900">
                {recommendation.quantity} kg/hectare, {recommendation.frequency}
              </p>
            </div>
          </div>

          {recommendation.notes && (
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 mt-1" />
              <div>
                <h3 className="font-medium text-gray-700">Additional Notes</h3>
                <p className="text-gray-900">{recommendation.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <CostAnalysisView analysis={costAnalysis} />
    </div>
  );
}