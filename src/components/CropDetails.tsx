import React from 'react';
import { CropType } from '../types';
import { Calendar, Droplets } from 'lucide-react';

interface Props {
  crop: CropType;
}

export function CropDetails({ crop }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{crop.name} Details</h3>
      <p className="text-gray-600 mb-4">{crop.description}</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-green-600" />
          <div>
            <div className="text-sm text-gray-600">Growth Period</div>
            <div className="font-medium">{crop.growthPeriod} days</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-green-600" />
          <div>
            <div className="text-sm text-gray-600">Water Requirement</div>
            <div className="font-medium">{crop.waterRequirement} mm/season</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Nutrient Requirements</h4>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(crop.nutrientRequirements).map(([nutrient, value]) => (
            <div key={nutrient} className="bg-gray-50 p-2 rounded">
              <div className="text-xs text-gray-600 capitalize">{nutrient}</div>
              <div className="font-medium">{value} ppm</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}