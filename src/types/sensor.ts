export interface SensorData {
  timestamp: number;
  soilMoisture: number;
  soilTemperature: number;
  lightIntensity: number;
  nitrogenLevel: number;
  phosphorusLevel: number;
  potassiumLevel: number;
  ph: number;
}

export interface SensorStats {
  average: number;
  min: number;
  max: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  status: 'optimal' | 'warning' | 'critical';
}

export interface SensorMetrics {
  soilMoisture: SensorStats;
  soilTemperature: SensorStats;
  lightIntensity: SensorStats;
  nitrogenLevel: SensorStats;
  phosphorusLevel: SensorStats;
  potassiumLevel: SensorStats;
  ph: SensorStats;
}

export interface SensorAlert {
  type: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: number;
  parameter: string;
  value: number;
  threshold: number;
}