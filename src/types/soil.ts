export interface SoilNutrientLevel {
  value: number;
  status: 'deficient' | 'optimal' | 'excessive';
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface SoilHealthStatus {
  ph: SoilNutrientLevel;
  nitrogen: SoilNutrientLevel;
  phosphorus: SoilNutrientLevel;
  potassium: SoilNutrientLevel;
  organicMatter: SoilNutrientLevel;
}

export interface SoilHealthReport {
  status: SoilHealthStatus;
  recommendations: string[];
  alerts: string[];
  sustainabilityScore: number;
  lastUpdated: Date;
}

export interface SoilTrend {
  parameter: string;
  historicalData: number[];
  trend: 'improving' | 'declining' | 'stable';
  recommendation: string;
}