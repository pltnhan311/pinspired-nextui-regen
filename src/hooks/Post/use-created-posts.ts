import { useQuery } from '@tanstack/react-query';
import { PostApi } from '~/api/post-api';

export const useCreatedPostsByUser = (userId: string) => {
  return useQuery({
    queryKey: ['created-posts'],
    queryFn: () => {
      return PostApi.getCreatedPostsByUser(userId);
    }
  });
};
