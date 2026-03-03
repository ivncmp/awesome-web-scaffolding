import { useQuery } from '@tanstack/react-query';
import { fetchHello } from '../example.service';

export function useExample() {
  return useQuery({
    queryKey: ['example', 'hello'],
    queryFn: fetchHello,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
