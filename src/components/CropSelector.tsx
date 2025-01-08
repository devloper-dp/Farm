import React from 'react';
import { CropType } from '../types';
import { crops } from '../data/crops';
import { Sprout } from 'lucide-react';

interface Props {
  selectedCrop: CropType | null;
  onSelect: (crop: CropType) => void;
}

export function CropSelector({ selectedCrop, onSelect }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <Sprout className="w-5 h-5" />
        Select Crop
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {crops.map((crop) => (
          <button
            key={crop.id}
            onClick={() => onSelect(crop)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedCrop?.id === crop.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <h3 className="font-medium text-gray-900">{crop.name}</h3>
            <p className="text-sm text-gray-500">
              pH: {crop.idealPh[0]}-{crop.idealPh[1]}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}