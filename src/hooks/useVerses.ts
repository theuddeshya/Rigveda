import { useQuery } from '@tanstack/react-query';
import { loadVerses, loadMandala } from '../utils/verseLoader';

/**
 * Hook to fetch all verses using React Query
 * Data is cached for 1 hour and persists for 24 hours
 */
export const useVerses = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['verses', 'all'],
    queryFn: loadVerses,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    verses: data || [],
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to load verses') : null,
  };
};

/**
 * Hook to fetch a specific mandala using React Query
 * Each mandala is cached separately for efficient loading
 */
export const useMandala = (mandalaNumber: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['mandala', mandalaNumber],
    queryFn: () => loadMandala(mandalaNumber),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: mandalaNumber >= 1 && mandalaNumber <= 10, // Only fetch valid mandalas
  });

  return {
    verses: data || [],
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to load mandala') : null,
  };
};
