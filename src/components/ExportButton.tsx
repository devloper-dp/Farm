import React from 'react';
import { Download } from 'lucide-react';
import { FertilizerRecommendation } from '../types';
import { generateCSV, downloadCSV } from '../utils/exportUtils';

interface Props {
  recommendations: FertilizerRecommendation[];
}

export function ExportButton({ recommendations }: Props) {
  const handleExport = () => {
    const csv = generateCSV(recommendations);
    const filename = `fertilizer-recommendations-${new Date().toISOString().split('T')[0]}.csv`;
    downloadCSV(csv, filename);
  };

  return (
    <button
      onClick={handleExport}
      disabled={recommendations.length === 0}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors ${
        recommendations.length > 0
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-gray-400 cursor-not-allowed'
      }`}
    >
      <Download className="w-4 h-4" />
      Export Recommendations
    </button>
  );
}