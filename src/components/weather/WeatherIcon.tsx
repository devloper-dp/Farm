import React from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';

interface Props {
  description: string;
}

export function WeatherIcon({ description }: Props) {
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
}