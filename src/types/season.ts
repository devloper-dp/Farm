export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface SeasonalAdjustment {
  season: Season;
  temperatureRange: [number, number];
  humidityRange: [number, number];
  adjustmentFactor: number;
  recommendations: string[];
}

export interface SeasonalReport {
  date: string;
  season: Season;
  recommendations: string[];
  adjustedQuantity: number;
  originalQuantity: number;
}