import React from 'react';
import { FertilizerOptimization } from '../types/fertilizer';
import { Scale, Clock, Droplets, Thermometer, Activity } from 'lucide-react';

interface Props {
  optimization: FertilizerOptimization;
}

export function FertilizerOptimizationView({ optimization }: Props) {
  const getEfficiencyColor = (value: number): string => {
    if (value >= 80) return 'text-green-500';
    if (value >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatPercentage = (value: number): string => {
    return `${Math.round(value)}%`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Fertilizer Application Optimization</h2>

      {/* Quantity Recommendations */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="w-5 h-5 text-green-600" />
          <h3 className="font-medium text-gray-700">Application Quantities</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Base Quantity</div>
            <div className="text-lg font-semibold">{optimization.baseQuantity} kg/ha</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Optimized Quantity</div>
            <div className="text-lg font-semibold text-green-600">
              {optimization.adjustedQuantity.toFixed(1)} kg/ha
            </div>
          </div>
        </div>
      </div>

      {/* Timing Recommendations */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium text-gray-700">Application Timing</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Best Time of Day</div>
            <div className="text-lg font-semibold capitalize">{optimization.timing.bestTimeOfDay}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Days Until Next Application</div>
            <div className="text-lg font-semibold">{optimization.timing.daysUntilNext} days</div>
          </div>
        </div>
      </div>

      {/* Efficiency Metrics */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-purple-600" />
          <h3 className="font-medium text-gray-700">Efficiency Metrics</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-600">Nutrient Uptake</div>
            <div className={`text-lg font-semibold ${getEfficiencyColor(optimization.efficiency.nutrientUptake * 100)}`}>
              {formatPercentage(optimization.efficiency.nutrientUptake * 100)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Leaching Risk</div>
            <div className={`text-lg font-semibold ${getEfficiencyColor(100 - optimization.efficiency.leachingRisk * 100)}`}>
              {formatPercentage(optimization.efficiency.leachingRisk * 100)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Cost Effectiveness</div>
            <div className={`text-lg font-semibold ${getEfficiencyColor(optimization.efficiency.costEffectiveness)}`}>
              {formatPercentage(optimization.efficiency.costEffectiveness)}
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="w-5 h-5 text-green-600" />
          <h3 className="font-medium text-gray-700">Environmental Impact</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-600">Carbon Footprint</div>
            <div className="text-lg font-semibold">
              {optimization.environmentalImpact.carbonFootprint.toFixed(1)} kg CO₂e
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Water Quality Impact</div>
            <div className={`text-lg font-semibold ${getEfficiencyColor(100 - optimization.environmentalImpact.waterQualityImpact * 100)}`}>
              {formatPercentage(optimization.environmentalImpact.waterQualityImpact * 100)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Soil Health Impact</div>
            <div className={`text-lg font-semibold ${getEfficiencyColor(100 - optimization.environmentalImpact.soilHealthImpact * 100)}`}>
              {formatPercentage(optimization.environmentalImpact.soilHealthImpact * 100)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}