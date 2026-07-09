import { useQuery, type QueryKey, type UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';

/**
 * A generic hook for GET requests using TanStack Query and Axios.
 * * @param queryKey - The unique key for TanStack Query caching
 * @param url - The API endpoint
 * @param options - Optional TanStack Query configurations
 */
export function useFetch<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<AxiosResponse<T>>,
  options?: Omit<UseQueryOptions<T, AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T, AxiosError>({
    queryKey,
    queryFn: async (): Promise<T> => {
      const response = await queryFn();
      return response.data;
    },
    ...options,
  });
}