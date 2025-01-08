import { useState, useEffect } from 'react';
import { reverseGeocode } from '../services/locationService';
import { useGeolocation } from './useGeolocation';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  error: string | null;
  isLoading: boolean;
}

export function useLocation() {
  const { latitude, longitude, error: geoError } = useGeolocation();
  const [state, setState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    address: null,
    error: null,
    isLoading: true
  });

  useEffect(() => {
    if (latitude && longitude) {
      reverseGeocode(latitude, longitude)
        .then(address => {
          setState({
            latitude,
            longitude,
            address,
            error: null,
            isLoading: false
          });
        })
        .catch(error => {
          setState({
            latitude,
            longitude,
            address: null,
            error: error.message,
            isLoading: false
          });
        });
    } else if (geoError) {
      setState(prev => ({
        ...prev,
        error: geoError,
        isLoading: false
      }));
    }
  }, [latitude, longitude, geoError]);

  return state;
}