import { WeatherCondition } from '../types/weather';
import { Sun, Cloud, CloudRain, Wind, Thermometer, Droplets, AlertTriangle } from 'lucide-react';

interface Props {
  weather: {
    data: WeatherCondition | null;
    isLoading: boolean;
    isError: boolean;
  };
}

export function WeatherForecastView({ weather }: Props) {
  if (weather.isError) {
    return (
      <div className="bg-red-50 p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 text-red-800">
          <AlertTriangle className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Weather Data Unavailable</h2>
        </div>
        <p className="mt-2 text-red-600">
          Unable to fetch weather information. Please try again later.
        </p>
      </div>
    );
  }

  if (weather.isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Weather Forecast</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!weather.data) {
    return null;
  }

  const getWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'partly cloudy':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'cloudy':
        return <Cloud className="w-6 h-6 text-gray-600" />;
      case 'light rain':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getImpactSeverityColor = (magnitude: number): string => {
    return magnitude > 1 ? 'text-red-500' : 'text-yellow-500';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Weather Forecast</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Current Weather */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-gray-700 mb-2">Current Conditions</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-red-500" />
              <span>{weather.data.current.temperature.toFixed(1)}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>{weather.data.current.humidity.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span>{weather.data.current.rainfall.toFixed(1)} mm</span>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
          <h3 className="font-medium text-gray-700 mb-2">7-Day Forecast</h3>
          <div className="grid grid-cols-7 gap-2">
            {weather.data.forecast.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-gray-500">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                {getWeatherIcon(day.description)}
                <div className="text-sm font-medium">{day.temperature.toFixed(0)}°C</div>
                <div className="text-xs text-gray-500">{day.rainfall.toFixed(1)}mm</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weather Alerts
      {weather.data.alerts && weather.data.alerts.length > 0 && (
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-medium text-yellow-800">Weather Alerts</h3>
          </div>
          <div className="space-y-2">
            {weather.data.alerts.map((alert, index) => (
              <div key={index} className="text-sm text-yellow-700">
                <span className="font-medium">{alert.parameter}:</span> {alert.message}
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Weather Impacts */}
      {weather.data.impacts.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-gray-700 mb-2">Weather Impacts & Recommendations</h3>
          <div className="space-y-2">
            {weather.data.impacts.map((impact, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className={getImpactSeverityColor(impact.magnitude)}>●</span>
                <div>
                  <div className="font-medium capitalize">{impact.parameter}</div>
                  <p className="text-sm text-gray-600">{impact.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}