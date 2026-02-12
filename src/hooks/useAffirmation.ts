import { useState, useCallback } from 'react';
import { AffirmationRequest, UseAffirmationReturn } from '../types';
import { fetchAffirmation, ApiError } from '../services/api';

export const useAffirmation = (): UseAffirmationReturn => {
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitRequest = useCallback(async (data: AffirmationRequest): Promise<void> => {
    setAffirmation(null);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetchAffirmation(data);

      if (response.data?.affirmation) {
        setAffirmation(response.data.affirmation);
      } else {
        setError('Received an unexpected response. Please try again.');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    affirmation,
    error,
    isLoading,
    submitRequest,
  };
};

export default useAffirmation;
