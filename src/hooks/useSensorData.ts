import { useState, useEffect } from 'react';
import { getSensorData } from '../services/soilApi';
import { SensorData } from '../types/sensor';

export function useSensorData() {
  const [data, setData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sensorData = await getSensorData();
        setData(sensorData);
        setIsError(false);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling every 5 seconds
    const interval = setInterval(fetchData, 5000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return {
    data,
    isLoading,
    isError
  };
}