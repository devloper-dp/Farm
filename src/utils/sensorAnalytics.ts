import { SensorData, SensorMetrics, SensorStats, SensorAlert } from '../types/sensor';

const OPTIMAL_RANGES = {
  soilMoisture: { min: 40, max: 60 },
  soilTemperature: { min: 18, max: 28 },
  lightIntensity: { min: 800, max: 2000 },
  nitrogenLevel: { min: 30, max: 80 },
  phosphorusLevel: { min: 20, max: 60 },
  potassiumLevel: { min: 15, max: 50 },
  ph: { min: 6.0, max: 7.5 }
};

export function calculateSensorMetrics(data: SensorData[]): SensorMetrics {
  // Ensure data is an array and not empty
  if (!Array.isArray(data) || data.length === 0) {
    // Return default metrics if no data
    return getDefaultMetrics();
  }

  const calculateStats = (values: number[], key: keyof typeof OPTIMAL_RANGES): SensorStats => {
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Calculate trend based on last 5 readings
    const recentValues = values.slice(-5);
    const trend = recentValues.every((val, i) => 
      i === 0 || val >= recentValues[i - 1]
    ) ? 'increasing' : recentValues.every((val, i) => 
      i === 0 || val <= recentValues[i - 1]
    ) ? 'decreasing' : 'stable';

    // Determine status based on optimal ranges
    const range = OPTIMAL_RANGES[key];
    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    
    if (average < range.min || average > range.max) {
      status = Math.abs(average - (range.max + range.min) / 2) > (range.max - range.min)
        ? 'critical'
        : 'warning';
    }

    return { average, min, max, trend, status };
  };

  return {
    soilMoisture: calculateStats(data.map(d => d.soilMoisture), 'soilMoisture'),
    soilTemperature: calculateStats(data.map(d => d.soilTemperature), 'soilTemperature'),
    lightIntensity: calculateStats(data.map(d => d.lightIntensity), 'lightIntensity'),
    nitrogenLevel: calculateStats(data.map(d => d.nitrogenLevel), 'nitrogenLevel'),
    phosphorusLevel: calculateStats(data.map(d => d.phosphorusLevel), 'phosphorusLevel'),
    potassiumLevel: calculateStats(data.map(d => d.potassiumLevel), 'potassiumLevel'),
    ph: calculateStats(data.map(d => d.ph), 'ph')
  };
}

function getDefaultMetrics(): SensorMetrics {
  const defaultStats: SensorStats = {
    average: 0,
    min: 0,
    max: 0,
    trend: 'stable',
    status: 'warning'
  };

  return {
    soilMoisture: defaultStats,
    soilTemperature: defaultStats,
    lightIntensity: defaultStats,
    nitrogenLevel: defaultStats,
    phosphorusLevel: defaultStats,
    potassiumLevel: defaultStats,
    ph: defaultStats
  };
}

export function generateSensorAlerts(metrics: SensorMetrics): SensorAlert[] {
  const alerts: SensorAlert[] = [];
  
  Object.entries(metrics).forEach(([key, stats]) => {
    if (stats.status === 'critical') {
      alerts.push({
        type: 'critical',
        parameter: key,
        value: stats.average,
        threshold: OPTIMAL_RANGES[key as keyof typeof OPTIMAL_RANGES].max,
        message: `Critical ${key} levels detected. Immediate action required.`,
        timestamp: Date.now()
      });
    } else if (stats.status === 'warning') {
      alerts.push({
        type: 'warning',
        parameter: key,
        value: stats.average,
        threshold: OPTIMAL_RANGES[key as keyof typeof OPTIMAL_RANGES].max,
        message: `${key} levels are outside optimal range.`,
        timestamp: Date.now()
      });
    }
  });
  
  return alerts;
}