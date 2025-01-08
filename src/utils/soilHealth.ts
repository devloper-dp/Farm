import { SoilData } from '../types';
import { SoilHealthStatus, SoilHealthReport, SoilNutrientLevel, SoilTrend } from '../types/soil';

const NUTRIENT_THRESHOLDS = {
  nitrogen: { deficient: 30, optimal: 60, excessive: 90 },
  phosphorus: { deficient: 20, optimal: 45, excessive: 70 },
  potassium: { deficient: 15, optimal: 35, excessive: 60 },
  ph: { deficient: 5.5, optimal: 6.5, excessive: 7.5 },
  organicMatter: { deficient: 2, optimal: 4, excessive: 8 }
};

function assessNutrientLevel(
  value: number,
  thresholds: { deficient: number; optimal: number; excessive: number }
): SoilNutrientLevel['status'] {
  if (value < thresholds.deficient) return 'deficient';
  if (value > thresholds.excessive) return 'excessive';
  return 'optimal';
}

function calculateSustainabilityScore(status: SoilHealthStatus): number {
  const weights = {
    ph: 0.2,
    nitrogen: 0.2,
    phosphorus: 0.2,
    potassium: 0.2,
    organicMatter: 0.2
  };

  let score = 0;
  Object.entries(status).forEach(([key, value]) => {
    const nutrientScore = value.status === 'optimal' ? 1 :
      value.status === 'deficient' ? 0.5 : 0.3;
    score += nutrientScore * weights[key as keyof typeof weights];
  });

  return Math.round(score * 100);
}

export function analyzeSoilHealth(
  currentData: SoilData,
  historicalData: SoilData[] = []
): SoilHealthReport {
  const status: SoilHealthStatus = {
    ph: {
      value: currentData.ph,
      status: assessNutrientLevel(currentData.ph, NUTRIENT_THRESHOLDS.ph),
      trend: 'stable'
    },
    nitrogen: {
      value: currentData.nitrogen,
      status: assessNutrientLevel(currentData.nitrogen, NUTRIENT_THRESHOLDS.nitrogen),
      trend: 'stable'
    },
    phosphorus: {
      value: currentData.phosphorus,
      status: assessNutrientLevel(currentData.phosphorus, NUTRIENT_THRESHOLDS.phosphorus),
      trend: 'stable'
    },
    potassium: {
      value: currentData.potassium,
      status: assessNutrientLevel(currentData.potassium, NUTRIENT_THRESHOLDS.potassium),
      trend: 'stable'
    },
    organicMatter: {
      value: currentData.organicMatter,
      status: assessNutrientLevel(currentData.organicMatter, NUTRIENT_THRESHOLDS.organicMatter),
      trend: 'stable'
    }
  };

  // Calculate trends if historical data is available
  if (historicalData.length > 0) {
    Object.keys(status).forEach((key) => {
      const values = historicalData.map(d => d[key as keyof SoilData]);
      const trend = calculateTrend(values);
      status[key as keyof SoilHealthStatus].trend = trend;
    });
  }

  const recommendations = generateRecommendations(status);
  const alerts = generateAlerts(status);
  const sustainabilityScore = calculateSustainabilityScore(status);

  return {
    status,
    recommendations,
    alerts,
    sustainabilityScore,
    lastUpdated: new Date()
  };
}

function calculateTrend(values: number[]): 'increasing' | 'decreasing' | 'stable' {
  if (values.length < 2) return 'stable';
  
  const recentValues = values.slice(-3);
  const isIncreasing = recentValues.every((val, i) => 
    i === 0 || val >= recentValues[i - 1]
  );
  const isDecreasing = recentValues.every((val, i) => 
    i === 0 || val <= recentValues[i - 1]
  );

  return isIncreasing ? 'increasing' : isDecreasing ? 'decreasing' : 'stable';
}

function generateRecommendations(status: SoilHealthStatus): string[] {
  const recommendations: string[] = [];

  if (status.ph.status === 'deficient') {
    recommendations.push('Apply lime to increase soil pH');
  } else if (status.ph.status === 'excessive') {
    recommendations.push('Apply sulfur to decrease soil pH');
  }

  if (status.nitrogen.status === 'deficient') {
    recommendations.push('Apply nitrogen-rich organic fertilizer or compost');
  }

  if (status.phosphorus.status === 'deficient') {
    recommendations.push('Add rock phosphate or bone meal to improve phosphorus levels');
  }

  if (status.potassium.status === 'deficient') {
    recommendations.push('Incorporate wood ash or kelp meal for potassium');
  }

  if (status.organicMatter.status === 'deficient') {
    recommendations.push('Add compost or cover crops to improve organic matter content');
  }

  return recommendations;
}

function generateAlerts(status: SoilHealthStatus): string[] {
  const alerts: string[] = [];

  Object.entries(status).forEach(([key, value]) => {
    if (value.status === 'deficient') {
      alerts.push(`Critical: Low ${key} levels detected`);
    } else if (value.status === 'excessive') {
      alerts.push(`Warning: High ${key} levels detected`);
    }
  });

  return alerts;
}