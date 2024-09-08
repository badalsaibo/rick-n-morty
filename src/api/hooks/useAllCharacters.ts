import { useInfiniteQuery } from '@tanstack/react-query';
import { paginatedFetch } from '../fetcher';
import API_ENDPOINTS from '../api-endpoints.constant';
import { Characters } from '@/types/character.type';

export const useAllCharacters = ({ name = '' }: { name?: string }) => {
  console.log('b===', name);
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['characters', name],
    queryFn: ({ pageParam }) =>
      paginatedFetch<Characters>({ url: API_ENDPOINTS.public.get.characters, page: pageParam, name }),
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
export default useAllCharacters;
