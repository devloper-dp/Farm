import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { searchLocation } from '../services/locationService';
import { useLocation } from '../hooks/useLocation';

interface Props {
  onLocationSelect: (lat: number, lon: number) => void;
}

export function LocationSelector({ onLocationSelect }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{
    latitude: number;
    longitude: number;
    address: string;
  }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const locations = await searchLocation(query);
      setResults(locations);
    } catch (error) {
      console.error('Error searching locations:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search location..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-500 border-t-transparent" />
            </div>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {location.isLoading ? (
        <div className="text-center text-gray-600">Detecting your location...</div>
      ) : location.error ? (
        <div className="text-center text-red-600">{location.error}</div>
      ) : location.address && (
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600">Current Location:</div>
          <div className="font-medium">{location.address}</div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">Search Results:</h3>
          <div className="bg-white rounded-lg shadow divide-y">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => onLocationSelect(result.latitude, result.longitude)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm text-gray-900">{result.address}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}