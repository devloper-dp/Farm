import { FertilizerCost, CostAnalysis } from '../types/fertilizer';
import { CropType } from '../types';

export function calculateFertilizerCosts(
  quantity: number,
  fertilizerType: string,
  cropType: CropType
): CostAnalysis {
  const costs: Record<string, FertilizerCost> = {
    'Nitrogen-rich fertilizer': {
      type: 'Nitrogen-rich fertilizer',
      pricePerKg: 1.2,
      applicationCost: 0.3
    },
    'Phosphorus-rich fertilizer': {
      type: 'Phosphorus-rich fertilizer',
      pricePerKg: 1.5,
      applicationCost: 0.3
    },
    'Potassium-rich fertilizer': {
      type: 'Potassium-rich fertilizer',
      pricePerKg: 1.3,
      applicationCost: 0.3
    }
  };

  const fertilizer = costs[fertilizerType];
  const fertilizerCost = quantity * fertilizer.pricePerKg;
  const applicationCost = quantity * fertilizer.applicationCost;
  const totalCost = fertilizerCost + applicationCost;

  // Estimate yield increase based on crop type and fertilizer quantity
  const baseYieldIncrease = 0.15; // 15% base yield increase
  const estimatedYieldIncrease = baseYieldIncrease * (quantity / cropType.nutrientRequirements.nitrogen);
  
  // Calculate ROI (Return on Investment)
  const averageCropPrice = 2.5; // Average price per kg of crop
  const expectedYield = 1000; // Base yield in kg/hectare
  const additionalYield = expectedYield * estimatedYieldIncrease;
  const additionalRevenue = additionalYield * averageCropPrice;
  const roi = (additionalRevenue - totalCost) / totalCost;

  return {
    fertilizerCost,
    applicationCost,
    totalCost,
    estimatedYieldIncrease: estimatedYieldIncrease * 100, // Convert to percentage
    roi: roi * 100 // Convert to percentage
  };
}