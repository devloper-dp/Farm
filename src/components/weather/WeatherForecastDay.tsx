import React from 'react';
import { WeatherForecast } from '../../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface Props {
  forecast: WeatherForecast;
}

export function WeatherForecastDay({ forecast }: Props) {
  return (
    <div className="text-center">
      <div className="text-sm text-gray-500">
        {new Date(forecast.date).toLocaleDateString('en-US', { weekday: 'short' })}
      </div>
      <WeatherIcon description={forecast.description} />
      <div className="text-sm font-medium">{forecast.temperature.toFixed(0)}°C</div>
      <div className="text-xs text-gray-500">{forecast.rainfall.toFixed(1)}mm</div>
    </div>
  );
}