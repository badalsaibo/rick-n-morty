import { useInfiniteQuery } from '@tanstack/react-query';
import { paginatedFetch } from '../fetcher';
import API_ENDPOINTS from '../api-endpoints.constant';

export const useAllCharacters = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['characters'],
    queryFn: ({ pageParam }) =>
      paginatedFetch(API_ENDPOINTS.public.get.characters, pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.info.next
        ? Number(new URL(lastPage.info.next).searchParams.get('page'))
        : undefined;
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
export default useAllCharacters;
