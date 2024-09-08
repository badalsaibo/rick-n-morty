import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import API_ENDPOINTS from '../api-endpoints.constant';
import { Episode } from '@/types/episode.type';

const useEpisode = (id: number) => {
  return useQuery({
    queryKey: ['episode', id],
    queryFn: () => fetcher<Episode>(API_ENDPOINTS.public.get.episode(id)),
    enabled: !!id,
  });
};

export default useEpisode;
