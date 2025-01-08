import React from 'react';
import { SoilHealthReport } from '../types/soil';
import { AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Props {
  report: SoilHealthReport;
}

export function SoilHealthReport({ report }: Props) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'text-green-500';
      case 'deficient':
        return 'text-red-500';
      case 'excessive':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Soil Health Report</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sustainability Score:</span>
          <span className={`text-lg font-bold ${
            report.sustainabilityScore >= 80 ? 'text-green-500' :
            report.sustainabilityScore >= 60 ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {report.sustainabilityScore}%
          </span>
        </div>
      </div>

      {/* Nutrient Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(report.status).map(([key, value]) => (
          <div key={key} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-700 capitalize">{key}</h3>
              {getTrendIcon(value.trend)}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-semibold ${getStatusColor(value.status)}`}>
                {value.value.toFixed(1)}
              </span>
              <span className={`text-sm ${getStatusColor(value.status)}`}>
                ({value.status})
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {report.alerts.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <h3 className="font-medium text-red-800">Alerts</h3>
          </div>
          <ul className="space-y-1">
            {report.alerts.map((alert, index) => (
              <li key={index} className="text-sm text-red-700">{alert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-green-50 p-4 rounded">
        <div className="flex items-center mb-2">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          <h3 className="font-medium text-green-800">Recommendations</h3>
        </div>
        <ul className="space-y-1">
          {report.recommendations.map((rec, index) => (
            <li key={index} className="text-sm text-green-700">{rec}</li>
          ))}
        </ul>
      </div>

      <div className="text-sm text-gray-500 text-right">
        Last updated: {report.lastUpdated.toLocaleString()}
      </div>
    </div>
  );
}