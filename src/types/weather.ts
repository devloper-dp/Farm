import { WeatherData } from './index';

export interface WeatherAlert {
  type: 'info' | 'warning' | 'critical';
  parameter: string;
  message: string;
  recommendation: string;
}

export interface WeatherForecast {
  date: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  description: string;
  windSpeed: number;
  solarRadiation: number;
}

export interface WeatherTrend {
  type: 'temperature' | 'humidity' | 'rainfall' | 'wind' | 'solar';
  trend: 'increasing' | 'stable' | 'decreasing';
  impact: 'positive' | 'neutral' | 'negative';
  recommendation: string;
  severity: 'low' | 'medium' | 'high';
}

export interface WeatherImpact {
  parameter: string;
  effect: 'increase' | 'decrease' | 'none';
  magnitude: number;
  recommendation: string;
}

export interface WeatherCondition {
  current: WeatherData;
  forecast: WeatherForecast[];
  trends: WeatherTrend[];
  impacts: WeatherImpact[];
}

