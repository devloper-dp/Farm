import React, { useState } from 'react';
import { useAuth } from './auth/AuthContext';
import { storage } from '../lib/storage';
import { SoilDataInput } from './SoilDataInput';
import { WeatherInput } from './WeatherInput';
import { CropSelector } from './CropSelector';
import { Recommendation } from './Recommendation';
import { KnowledgeBase } from './knowledge/KnowledgeBase';
import { SoilHealthChart } from './SoilHealthChart';
import { WeatherForecastView } from './WeatherForecastView';
import { useWeatherData } from '../hooks/useWeatherData';
import { useSensorData } from '../hooks/useSensorData';
import { SensorDataView } from './SensorDataView';
import { calculateSensorMetrics } from '../utils/sensorAnalytics';
import { SoilData, WeatherData, CropType } from '../types';
import { calculateFertilizerRecommendation } from '../utils/recommendations';
import toast from 'react-hot-toast';

export function Dashboard() {
  const { user } = useAuth();
  const weather = useWeatherData();
  const { data: sensorData, isLoading: isSensorLoading, isError: isSensorError } = useSensorData();
  const sensorMetrics = calculateSensorMetrics(sensorData);

  const [soilData, setSoilData] = useState<SoilData>({
    ph: 6.5,
    nitrogen: 40,
    phosphorus: 30,
    potassium: 20,
    organicMatter: 2.5,
  });

  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 25,
    humidity: 60,
    rainfall: 50,
  });

  const [selectedCrop, setSelectedCrop] = useState<CropType | null>(null);
  const recommendations = storage.getRecommendations(user?.id || '');

  const handleCalculateRecommendation = () => {
    if (!selectedCrop || !user) {
      toast.error('Please select a crop first');
      return;
    }

    try {
      const recommendation = calculateFertilizerRecommendation(
        user.id,
        soilData,
        weatherData,
        selectedCrop
      );

      storage.saveRecommendation(recommendation);
      storage.saveSoilRecord(user.id, soilData);
      toast.success('New recommendation generated successfully!');
    } catch (error) {
      toast.error('Failed to generate recommendation. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Please log in to access the dashboard
          </h2>
        </div>
      </div>
    );
  }

  if (isSensorError) {
    toast.error('Failed to load sensor data');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {!isSensorError && sensorData && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <SensorDataView sensorData={sensorData} metrics={sensorMetrics} />
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <WeatherForecastView weather={weather} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <SoilDataInput soilData={soilData} onChange={setSoilData} />
            <SoilHealthChart soilData={soilData} />
          </div>
          <div className="space-y-6">
            <WeatherInput weatherData={weatherData} onChange={setWeatherData} />
            <CropSelector selectedCrop={selectedCrop} onSelect={setSelectedCrop} />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleCalculateRecommendation}
            disabled={!selectedCrop}
            className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
              selectedCrop
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Calculate Recommendation
          </button>
        </div>

        {recommendations.length > 0 && (
          <div className="space-y-6">
            <Recommendation recommendation={recommendations[0]} />
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Previous Recommendations</h2>
              <div className="space-y-4">
                {recommendations.slice(1).map((rec) => (
                  <div
                    key={rec.id}
                    className="border-l-4 border-green-500 pl-4 py-2"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{rec.cropType.name}</h3>
                        <p className="text-sm text-gray-600">{rec.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{rec.type}</div>
                        <p className="text-sm text-gray-600">
                          {rec.quantity} kg/ha, {rec.frequency}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <KnowledgeBase />
        </div>
      </div>
    </div>
  );
}
