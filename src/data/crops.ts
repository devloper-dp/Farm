import { CropType } from '../types';

export const crops: CropType[] = [
  {
    id: 'wheat',
    name: 'Wheat',
    idealPh: [6.0, 7.0],
    nutrientRequirements: {
      nitrogen: 120,
      phosphorus: 60,
      potassium: 40,
    },
    growthPeriod: 120,
    waterRequirement: 450,
    description: 'A cereal grain that is a worldwide staple food.',
  },
  {
    id: 'rice',
    name: 'Rice',
    idealPh: [5.5, 6.5],
    nutrientRequirements: {
      nitrogen: 100,
      phosphorus: 50,
      potassium: 50,
    },
    growthPeriod: 150,
    waterRequirement: 1200,
    description: 'A staple grain that thrives in flooded conditions.',
  },
  {
    id: 'corn',
    name: 'Corn',
    idealPh: [5.8, 7.0],
    nutrientRequirements: {
      nitrogen: 150,
      phosphorus: 65,
      potassium: 40,
    },
    growthPeriod: 90,
    waterRequirement: 600,
    description: 'A versatile crop with high nitrogen demand.',
  },
];