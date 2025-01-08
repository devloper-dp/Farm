import React from 'react';
import { WeatherCondition } from '../../types/weather';
import { CurrentWeather } from './CurrentWeather';
import { SevenDayForecast } from './SevenDayForecast';
import { WeatherImpacts } from './WeatherImpacts';

interface Props {
  weather: WeatherCondition;
}

export function WeatherForecastView({ weather }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Weather Forecast</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CurrentWeather weather={weather.current} />
        <SevenDayForecast forecast={weather.forecast} />
      </div>

      <WeatherImpacts impacts={weather.impacts} />
    </div>
  );
}