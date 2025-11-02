import { QueryClient } from '@tanstack/react-query';

/**
 * React Query client configuration
 * Optimized for the Rigveda application
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: How long data is considered fresh (1 hour)
      staleTime: 1000 * 60 * 60,

      // Cache time: How long unused data stays in cache (24 hours)
      gcTime: 1000 * 60 * 60 * 24,

      // Don't refetch on window focus for static content
      refetchOnWindowFocus: false,

      // Don't refetch on mount if data is fresh
      refetchOnMount: false,

      // Retry failed requests
      retry: 2,

      // Retry delay (exponential backoff)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
