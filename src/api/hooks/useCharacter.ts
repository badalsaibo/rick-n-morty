import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import API_ENDPOINTS from '../api-endpoints.constant';

export const useCharacter = (id: number): UseQueryResult<Character, Error> => {
  return useQuery<Character, Error>({
    queryKey: ['character', id],
    queryFn: () => fetcher(API_ENDPOINTS.public.get.character(id)),
    enabled: !!id, // Only run the query if the ID is provided
  });
};
