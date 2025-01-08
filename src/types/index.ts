export interface User {
  id: string;
  email: string;
  fullName: string;
  farmLocation: string;
}

export interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
}

export interface CropType {
  id: string;
  name: string;
  idealPh: [number, number];
  nutrientRequirements: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  growthPeriod: number;
  waterRequirement: number;
  description: string;
}

export interface FertilizerRecommendation {
  id: string;
  userId: string;
  cropType: CropType;
  soilData: SoilData;
  weatherData: WeatherData;
  type: string;
  quantity: number;
  frequency: string;
  notes: string;
  date: string;
}

export interface ValidationError {
  field: string;
  message: string;
}