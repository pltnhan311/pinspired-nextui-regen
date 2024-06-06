import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Divider, Image, Input, Skeleton } from '@nextui-org/react';
import { Download, SendIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { usePost } from '~/hooks/Post/use-post';

const DetailPostPage = () => {
  const { id } = useParams();
  const { data: post, isLoading } = usePost(id as string);
  const postData = post?.data;

  return (
    <div className='flex items-center h-screen justify-center p-4'>
      <div className='max-w-7xl h-full w-full lg:px-16'>
        <nav className='my-4 py-2'>
          <Breadcrumbs key='warning' color='warning'>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Category</BreadcrumbItem>
            <BreadcrumbItem>Artist</BreadcrumbItem>
            <BreadcrumbItem>Post</BreadcrumbItem>
          </Breadcrumbs>
        </nav>
        <Skeleton isLoaded={!isLoading} className='rounded-lg'>
          <div className='relative flex flex-col lg:grid lg:grid-cols-2 lg:items-start bg-zinc-100 dark:bg-softblack rounded-xl'>
            <div className='w-full flex-none'>
              <Image isZoomed alt='post picture' className='h-auto w-auto' src={postData?.Attachment?.Thumbnail} />
            </div>
            <div className='flex flex-col justify-between p-7 h-full'>
              <div className='post-action flex items-center justify-between mb-5'>
                <Button isIconOnly color='warning' variant='faded' aria-label='Save a photo' className='w-16'>
                  <Download />
                </Button>
                <Button color='danger' variant='solid' size='md' className='rounded-full'>
                  Save
                </Button>
              </div>

              <div className='post-info'>
                <h1 className='text-2xl font-bold tracking-tight'>{postData?.Title}</h1>
                <h2 className='sr-only'>Product information</h2>
                <div className='mt-4'>
                  <p className='sr-only'>Product description</p>
                  <p className='line-clamp-3 overflow-y-auto max-h-[100px] text-medium text-default-500'>
                    {postData?.Description}
                  </p>
                </div>
                <div className='mt-5 flex gap-x-3 items-center justify-between'>
                  <div className='flex items-center gap-x-3'>
                    <Avatar
                      isBordered
                      color='secondary'
                      src={'https://i.pravatar.cc/150?u=a04258a2462d826712d'}
                      className='rounded-full w-12 h-12'
                    />
                    <div className='flex flex-col gap-y-1'>
                      <p className='line-clamp-3 text-medium text-default-600'>{postData?.Created?.UserName}</p>
                      <p className='line-clamp-3 text-medium text-default-500'>12 followers</p>
                    </div>
                  </div>
                  <Button color='default' size='lg' className='rounded-full'>
                    Follow
                  </Button>
                </div>
              </div>

              <p className='mt-5 mb-4'>Nhận xét</p>
              <div className='post-comments flex max-h-[50%] w-full flex-col gap-y-5 overflow-y-scroll'>
                <div className='space-y-4'>
                  <div className='flex items-start gap-4'>
                    <Avatar className='w-10 h-10 border'>
                      <img src='/placeholder.svg' alt='@shadcn' />
                    </Avatar>
                    <div className='grid gap-1.5'>
                      <div className='flex items-center gap-2'>
                        <div className='font-medium'>John Doe</div>
                        <div className='text-xs text-gray-500 dark:text-gray-400'>2 days ago</div>
                      </div>
                      <div className='text-sm text-gray-700 dark:text-gray-300'>
                        Wow, this is an amazing product! I can't wait to try it out.
                      </div>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <Avatar className='w-10 h-10 border'>
                      <img src='/placeholder.svg' alt='@shadcn' />
                    </Avatar>
                    <div className='grid gap-1.5'>
                      <div className='flex items-center gap-2'>
                        <div className='font-medium'>John Doe</div>
                        <div className='text-xs text-gray-500 dark:text-gray-400'>2 days ago</div>
                      </div>
                      <div className='text-sm text-gray-700 dark:text-gray-300'>
                        Wow, this is an amazing product! I can't wait to try it out.
                      </div>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <Avatar className='w-10 h-10 border'>
                      <img src='/placeholder.svg' alt='@shadcn' />
                    </Avatar>
                    <div className='grid gap-1.5'>
                      <div className='flex items-center gap-2'>
                        <div className='font-medium'>John Doe</div>
                        <div className='text-xs text-gray-500 dark:text-gray-400'>2 days ago</div>
                      </div>
                      <div className='text-sm text-gray-700 dark:text-gray-300'>
                        Wow, this is an amazing product! I can't wait to try it out.
                      </div>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <Avatar className='w-10 h-10 border'>
                      <img src='/placeholder.svg' alt='@shadcn' />
                    </Avatar>
                    <div className='grid gap-1.5'>
                      <div className='flex items-center gap-2'>
                        <div className='font-medium'>John Doe</div>
                        <div className='text-xs text-gray-500 dark:text-gray-400'>2 days ago</div>
                      </div>
                      <div className='text-sm text-gray-700 dark:text-gray-300'>
                        Wow, this is an amazing product! I can't wait to try it out.
                      </div>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <Avatar className='w-10 h-10 border'>
                      <img src='/placeholder.svg' alt='@shadcn' />
                    </Avatar>
                    <div className='grid gap-1.5'>
                      <div className='flex items-center gap-2'>
                        <div className='font-medium'>John Doe</div>
                        <div className='text-xs text-gray-500 dark:text-gray-400'>2 days ago</div>
                      </div>
                      <div className='text-sm text-gray-700 dark:text-gray-300'>
                        Wow, this is an amazing product! I can't wait to try it out.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Divider className='my-5' />
              <div className='post-write'>
                <WriteComment />
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

function WriteComment() {
  return (
    <div className='flex items-center gap-4'>
      <Input placeholder='Share your thought...' size='md' />
      <Button size='md' color='default'>
        <SendIcon className='w-5 h-5' />
      </Button>
    </div>
  );
}

export default DetailPostPage;
