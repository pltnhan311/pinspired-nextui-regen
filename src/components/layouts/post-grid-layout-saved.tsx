import { Image } from '@nextui-org/react';
import { IPostSaved } from '~/types/types';
import { HeartIcon } from 'lucide-react';

import { Button } from '@nextui-org/react';

interface IProps {
  data: IPostSaved[];
}

const PostGridLayoutSaved = (data: IProps) => {
  return (
    <div className='my-auto grid max-w-full grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {data?.data?.map((item: IPostSaved) => (
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
            // shadow='md'
            radius='lg'
            width='100%'
            alt={item.Post?.Title}
            className='w-full object-cover h-[350px]'
            src={item.Post?.Attachment?.Thumbnail}
          />
          <div className='mt-1 flex flex-col gap-2 px-1'>
            <div className='flex items-start justify-between gap-1'>
              <h3 className='text-small font-medium text-default-500'>{item.Post?.Created?.UserName}</h3>
              <div className='flex items-center gap-1 mb-2'>
                <HeartIcon size={14} color='#f22828d7' fill='#f22828d7' />
                <span className='text-small text-default-500'>4.5</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostGridLayoutSaved;
