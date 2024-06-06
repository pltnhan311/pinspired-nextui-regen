import { usePosts } from '~/hooks/Post/use-posts';

import PostGridLayout from '~/components/layouts/post-grid-layout';
import { IPost } from '~/types/types';
import { Spinner } from '@nextui-org/react';

const HomePage = () => {
  const { data: posts, isLoading } = usePosts();

  return (
    <div className='flex items-center min-h-screen justify-center p-4'>
      {isLoading && <Spinner label='Loading...' color='current' labelColor='foreground' />}
      <PostGridLayout data={posts?.data as IPost[]} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
