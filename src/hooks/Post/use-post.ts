import { useQuery } from '@tanstack/react-query';
import { PostApi } from '~/api/post-api';

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => {
      return PostApi.getPostById(id);
    },
    enabled: !!id
  });
};
