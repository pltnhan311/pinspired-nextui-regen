import { useQuery } from '@tanstack/react-query';
import { PostApi } from '~/api/post-api';

export const useSavedPostsByUser = (userId: string) => {
  return useQuery({
    queryKey: ['saved-posts'],
    queryFn: () => {
      return PostApi.getSavedPostsByUser(userId);
    }
  });
};
