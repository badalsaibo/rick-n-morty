import { useInfiniteQuery } from '@tanstack/react-query';
import { paginatedFetch } from '../fetcher';
import API_ENDPOINTS from '../api-endpoints.constant';
import { Locations } from '@/types/location.type';

export const useLocations = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['locations'],
    queryFn: ({ pageParam }) => paginatedFetch<Locations>({ url: API_ENDPOINTS.public.get.locations, page: pageParam }),
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
export default useLocations;
