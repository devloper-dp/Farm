import React from 'react';
import { SensorData, SensorMetrics, SensorStats } from '../types/sensor';
import { Thermometer, Droplets, Sun, Activity, AlarmClock } from 'lucide-react';
import { generateSensorAlerts } from '../utils/sensorAnalytics';

interface Props {
  sensorData: SensorData[];
  metrics: SensorMetrics;
}

export function SensorDataView({ sensorData, metrics }: Props) {
  const alerts = generateSensorAlerts(metrics);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'optimal':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const renderMetric = (
    icon: React.ReactNode,
    title: string,
    value: number,
    unit: string,
    stats: SensorStats
  ) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="font-medium text-gray-900">{title}</h3>
        <span className={`ml-auto ${getStatusColor(stats.status)}`}>●</span>
      </div>
      <div className="text-2xl font-bold mb-2">
        {value.toFixed(1)} {unit}
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <div className="text-gray-500">Min</div>
          <div>{stats.min.toFixed(1)}</div>
        </div>
        <div>
          <div className="text-gray-500">Avg</div>
          <div>{stats.average.toFixed(1)}</div>
        </div>
        <div>
          <div className="text-gray-500">Max</div>
          <div>{stats.max.toFixed(1)}</div>
        </div>
      </div>
      <div className={`text-sm mt-2 ${getStatusColor(stats.status)}`}>
        {stats.status.charAt(0).toUpperCase() + stats.status.slice(1)}
      </div>
    </div>
  );

  const latestData = sensorData[sensorData.length - 1];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Real-time Sensor Data</h2>
        {alerts.length > 0 && (
          <span className="text-red-500 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            {alerts.length} Alert{alerts.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {alerts.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className={`text-${alert.type === 'critical' ? 'red' : 'yellow'}-500`}>●</span>
                <p className="text-sm text-gray-800">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {latestData && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {renderMetric(
            <Droplets className="w-5 h-5 text-blue-500" />,
            'Soil Moisture',
            latestData.soilMoisture,
            '%',
            metrics.soilMoisture
          )}
          {renderMetric(
            <Thermometer className="w-5 h-5 text-red-500" />,
            'Soil Temperature',
            latestData.soilTemperature,
            '°C',
            metrics.soilTemperature
          )}
          {renderMetric(
            <Sun className="w-5 h-5 text-yellow-500" />,
            'Light Intensity',
            latestData.lightIntensity,
            'lux',
            metrics.lightIntensity
          )}
          {renderMetric(
            <AlarmClock className="w-5 h-5 text-purple-500" />,
            'pH Level',
            latestData.ph,
            '',
            metrics.ph
          )}
          {renderMetric(
            <AlarmClock className="w-5 h-5 text-green-500" />,
            'Nitrogen',
            latestData.nitrogenLevel,
            'ppm',
            metrics.nitrogenLevel
          )}
          {renderMetric(
            <AlarmClock className="w-5 h-5 text-blue-500" />,
            'Phosphorus',
            latestData.phosphorusLevel,
            'ppm',
            metrics.phosphorusLevel
          )}
          {renderMetric(
            <AlarmClock className="w-5 h-5 text-yellow-500" />,
            'Potassium',
            latestData.potassiumLevel,
            'ppm',
            metrics.potassiumLevel
          )}
        </div>
      )}
    </div>
  );
}