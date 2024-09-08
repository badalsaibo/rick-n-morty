import { useInfiniteQuery } from '@tanstack/react-query';
import { paginatedFetch } from '../fetcher';
import API_ENDPOINTS from '../api-endpoints.constant';
import { Episodes } from '@/types/episode.type';

export const useEpisodes = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['episodes'],
    queryFn: ({ pageParam }) => paginatedFetch<Episodes>(API_ENDPOINTS.public.get.episodes, pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.info.next ? Number(new URL(lastPage.info.next).searchParams.get('page')) : undefined;
    },
  });

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
export default useEpisodes;
