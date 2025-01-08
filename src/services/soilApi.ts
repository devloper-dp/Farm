import { SensorData } from '../types/sensor';

// Mock sensor data generation
function generateMockSensorData(): SensorData {
  return {
    timestamp: Date.now(),
    soilMoisture: 45 + Math.random() * 10,
    soilTemperature: 22 + Math.random() * 5,
    lightIntensity: 1200 + Math.random() * 400,
    nitrogenLevel: 45 + Math.random() * 15,
    phosphorusLevel: 35 + Math.random() * 10,
    potassiumLevel: 25 + Math.random() * 10,
    ph: 6.5 + Math.random()
  };
}

// Simulate real-time sensor data
export async function getSensorData(): Promise<SensorData[]> {
  // Generate 24 hours of mock data
  const data: SensorData[] = [];
  const now = Date.now();
  
  for (let i = 0; i < 24; i++) {
    data.push({
      ...generateMockSensorData(),
      timestamp: now - (23 - i) * 3600000
    });
  }

  return Promise.resolve(data);
}