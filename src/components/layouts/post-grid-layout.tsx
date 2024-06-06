import { Image, Skeleton } from '@nextui-org/react';
import { IPost } from '~/types/types';
import { HeartIcon } from 'lucide-react';

import { Button } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';

interface IProps {
  data: IPost[];
  isLoading: boolean;
}

const PostGridLayout = (data: IProps) => {
  return (
    <div className='post-container my-auto max-w-full p-4' style={{ columnCount: 6, columnGap: '1.2rem' }}>
      {data?.data?.map((item: IPost) => (
        <div style={{ marginBottom: '1rem', breakInside: 'avoid' }}>
          <Skeleton isLoaded={!data.isLoading} className='rounded-lg'>
            <NavLink to={`/pin/${item._id}`}>
              <div key={item._id} className='relative flex w-full flex-none flex-col gap-2'>
                <Button
                  isIconOnly
                  color='default'
                  variant='shadow'
                  aria-label='Love it'
                  className='rounded-full absolute right-3 top-3 z-20 bg-background/60 dark:bg-default-100/50'
                  size='sm'
                >
                  <HeartIcon size={14} color='#fdfdfd65' fill='#fdfdfd6f' />
                </Button>
                <Image
                  isZoomed
                  isBlurred
                  radius='lg'
                  width='100%'
                  alt={item.Title}
                  className='w-full'
                  src={item.Attachment?.Thumbnail}
                />
                {/* <div className='mt-1 flex flex-col gap-2 px-1'>
                  <div className='flex items-start justify-between gap-1'>
                    <h3 className='text-small font-medium text-default-500'>{item.Created?.UserName}</h3>
                    <div className='flex items-center gap-1 mb-2'>
                      <HeartIcon size={14} color='#f22828d7' fill='#f22828d7' />
                      <span className='text-small text-default-500'>4.5</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </NavLink>
          </Skeleton>
        </div>
      ))}
    </div>
  );
};

export default PostGridLayout;
