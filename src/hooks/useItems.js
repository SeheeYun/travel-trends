import { useQuery } from '@tanstack/react-query';
import { fetchItems } from '../api/fetchItems';

export const useItems = code => {
  return useQuery({
    queryKey: ['items', code],
    queryFn: () => fetchItems(code),
    staleTime: 1000 * 60 * 60,
  });
};
