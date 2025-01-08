import React from 'react';
import { WeatherForecast } from '../../types/weather';
import { WeatherForecastDay } from './WeatherForecastDay';

interface Props {
  forecast: WeatherForecast[];
}

export function SevenDayForecast({ forecast }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
      <h3 className="font-medium text-gray-700 mb-2">7-Day Forecast</h3>
      <div className="grid grid-cols-7 gap-2">
        {forecast.map((day, index) => (
          <WeatherForecastDay key={index} forecast={day} />
        ))}
      </div>
    </div>
  );
}