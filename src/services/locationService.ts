import api from './api';

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const response = await api.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    return response.data.display_name;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return 'Location not found';
  }
}

export async function searchLocation(query: string): Promise<LocationData[]> {
  try {
    const response = await api.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&limit=5`
    );
    return response.data.map((item: any) => ({
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      address: item.display_name
    }));
  } catch (error) {
    console.error('Error searching location:', error);
    return [];
  }
}