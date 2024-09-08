import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import API_ENDPOINTS from '../api-endpoints.constant';
import { Location } from '@/types/location.type';

const useLocation = (id: number) => {
  return useQuery({
    queryKey: ['location', id],
    queryFn: () => fetcher<Location>(API_ENDPOINTS.public.get.location(id)),
    enabled: !!id,
  });
};

export default useLocation;
