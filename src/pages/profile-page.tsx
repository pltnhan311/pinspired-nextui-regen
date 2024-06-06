import { Avatar, Button, Card, CardHeader, CardBody, Tabs, Tab, Spinner } from '@nextui-org/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCreatedPostsByUser } from '~/hooks/Post/use-created-posts';
import { RootState } from '~/store/store';
import { IPost, IPostSaved } from '~/types/types';
import PostGridLayout from '~/components/layouts/post-grid-layout';
import { useSavedPostsByUser } from '~/hooks/Post/use-saved-posts';
import PostGridLayoutSaved from '~/components/layouts/post-grid-layout-saved';

const ProfilePage = () => {
  const [checked, setChecked] = useState('Created');

  const user = useSelector((state: RootState) => state.User?.data);

  const { data: createdPosts, isLoading } = useCreatedPostsByUser(user._id as string);
  const { data: savedPosts } = useSavedPostsByUser(user._id as string);

  return (
    <div className='flex items-center h-screen justify-center p-4'>
      <div className='flex h-full w-full items-start justify-center'>
        <Card isBlurred className='border-none bg-background/60 dark:bg-default-100/50 w-full mx-5' shadow='sm'>
          <CardHeader className='h-[180px] justify-center overflow-visible bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400'>
            <Avatar isBordered color='secondary' src={user?.Avatar} className='rounded-full w-28 h-28 translate-y-20' />
            <Button
              className='rounded-full absolute right-3 top-3 bg-white/30 text-white dark:bg-black/20'
              color='default'
            >
              Edit Profile
            </Button>
          </CardHeader>
          <CardBody>
            <div className='pb-4 pt-6'>
              <p className='text-large font-medium'>{user?.FullName}</p>
              <p className='max-w-[90%] text-small text-default-400'>@{user?.UserName}</p>
              <p className='py-2 text-small text-foreground'>
                Creator of Radify Icons Set. 500+ icons in 6 styles, SVG and Figma files, and more.
              </p>
              <div className='flex gap-2 text-small '>
                <p>
                  <span className='font-medium text-default-500'>175</span>&nbsp;
                  <span className='text-default-400'>Following</span>
                </p>
                <p>
                  <span className='font-medium text-default-500'>2500</span>&nbsp;
                  <span className='text-default-400'>Followers</span>
                </p>
              </div>
            </div>

            {/* Tab panel */}
            <Tabs
              fullWidth
              className='w-full mt-6 mx-auto'
              aria-label='Options'
              selectedKey={checked}
              onSelectionChange={(key) => setChecked(String(key))}
            >
              <Tab key='Created' title='Created' className='w-full p-0'>
                <div className='p-2 space-y-4 pt-4'>
                  <div>
                    <p className='text-ft text-default-700'>Created posts</p>
                    <p className='mt-1 text-sm font-normal text-default-400'>
                      This displays your created posts on the site.
                    </p>
                  </div>
                  {/* Created posts */}
                  {isLoading && (
                    <Spinner
                      label='Loading...'
                      color='current'
                      labelColor='foreground'
                      className='flex items-center justify-center'
                    />
                  )}
                  <PostGridLayout data={createdPosts?.data as IPost[]} isLoading={isLoading} />
                </div>
              </Tab>
              <Tab key='Saved' title='Saved' className='w-full p-0'>
                <div className='p-2 space-y-4 pt-4'>
                  <div>
                    <p className='text-ft text-default-700'>Saved posts</p>
                    <p className='mt-1 text-sm font-normal text-default-400'>
                      This displays your saved posts on the site.
                    </p>
                  </div>
                  {/* Saved posts */}
                  <PostGridLayoutSaved data={savedPosts?.data as IPostSaved[]} />
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
