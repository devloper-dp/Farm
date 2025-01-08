export interface FertilizerOptimization {
  baseQuantity: number;
  adjustedQuantity: number;
  adjustmentFactors: {
    weather: number;
    soil: number;
    season: number;
  };
  timing: {
    bestTimeOfDay: string;
    daysUntilNext: number;
  };
  efficiency: {
    nutrientUptake: number;
    leachingRisk: number;
    costEffectiveness: number;
  };
  environmentalImpact: {
    carbonFootprint: number;
    waterQualityImpact: number;
    soilHealthImpact: number;
  };
}

export interface OptimizationFactors {
  soilMoisture: number;
  temperature: number;
  rainfall: number;
  cropStage: string;
  previousApplication: Date | null;
}