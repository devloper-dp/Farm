import React from 'react';
import { CostAnalysis } from '../types/fertilizer';
import { DollarSign, TrendingUp, BarChart } from 'lucide-react';

interface Props {
  analysis: CostAnalysis;
}

export function CostAnalysisView({ analysis }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-green-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-green-600" />
        Cost Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-600">Fertilizer Cost</div>
            <div className="text-lg font-semibold">Rs.{analysis.fertilizerCost.toFixed(2)}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-600">Application Cost</div>
            <div className="text-lg font-semibold">Rs.{analysis.applicationCost.toFixed(2)}</div>
          </div>
          
          <div className="pt-2 border-t">
            <div className="text-sm text-gray-600">Total Cost</div>
            <div className="text-xl font-bold text-green-600">
              Rs.{analysis.totalCost.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-sm text-gray-600">Estimated Yield Increase</div>
              <div className="text-lg font-semibold">
                {analysis.estimatedYieldIncrease.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <BarChart className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-sm text-gray-600">Return on Investment</div>
              <div className="text-lg font-semibold">
                {analysis.roi.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}