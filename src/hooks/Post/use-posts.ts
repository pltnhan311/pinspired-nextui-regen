import { useQuery } from '@tanstack/react-query';
import { PostApi } from '~/api/post-api';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => {
      return PostApi.getPostsByCategory(1, 20);
    }
  });
};
