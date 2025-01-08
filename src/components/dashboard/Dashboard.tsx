import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { storage } from '../../lib/storage';
import { SoilDataInput } from '../SoilDataInput';
import { WeatherInput } from '../WeatherInput';
import { CropSelector } from '../CropSelector';
import { Recommendation } from '../Recommendation';
import { KnowledgeBase } from '../knowledge/KnowledgeBase';
import { SoilHealthChart } from '../SoilHealthChart';
import { WeatherForecastView } from '../WeatherForecastView';
import { useWeatherData } from '../../hooks/useWeatherData';
import { useSensorData } from '../../hooks/useSensorData';
import { SensorDataView } from '../SensorDataView';
import { calculateSensorMetrics } from '../../utils/sensorAnalytics';
import { SoilData, WeatherData, CropType, FertilizerRecommendation } from '../../types';
import { calculateFertilizerRecommendation } from '../../utils/recommendations';

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
  const [recommendations, setRecommendations] = useState<FertilizerRecommendation[]>(
    storage.getRecommendations(user.id)
  );

  const handleCalculateRecommendation = () => {
    if (!selectedCrop) return;

    const recommendation = calculateFertilizerRecommendation(
      soilData,
      weatherData,
      selectedCrop
    );

    const fullRecommendation: FertilizerRecommendation = {
      ...recommendation,
      date: new Date().toLocaleDateString(),
      soilData,
      weatherData,
      cropType: selectedCrop,
    };

    storage.saveRecommendation(fullRecommendation);
    storage.saveSoilRecord(user.id, soilData);
    
    setRecommendations([fullRecommendation, ...recommendations]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Sensor Data Section */}
        {!isSensorError && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <SensorDataView
              sensorData={sensorData}
              metrics={sensorMetrics}
            />
          </div>
        )}

        {/* Weather Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <WeatherForecastView weather={weather} />
        </div>

        {/* Input Section */}
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

        {/* Action Button */}
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

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-6">
            <Recommendation recommendation={recommendations[0]} />
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Previous Recommendations</h2>
              <div className="space-y-4">
                {recommendations.slice(1).map((rec, index) => (
                  <div
                    key={index}
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

        {/* Knowledge Base */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <KnowledgeBase />
        </div>
      </div>
    </div>
  );
}