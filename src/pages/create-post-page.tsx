import { Group, Notification, Text, rem } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Input } from '@nextui-org/react';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostApi } from '~/api/post-api';

const CreatePost = (props: Partial<DropzoneProps>) => {
  const { register, handleSubmit } = useForm();
  const [uploading, setUploading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onSubmit = async (files: File[]) => {
    setUploading(true);
    try {
      const postBody = {
        Title: 'welcome to blood drive',
        Description: 'athur vs grace',
        Attachment: {
          Id: '',
          Thumbnail: ''
        },
        IsComment: true
      };
      const res = await PostApi.createPost(files[0], postBody);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (files: File[]) => {
    setImageSrc(URL.createObjectURL(files[0]));
    onSubmit(files);
  };

  return (
    <Dropzone
      onDrop={onDrop}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group justify='center' gap='xl' mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <Upload style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <X style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          {imageSrc ? (
            <Image src={imageSrc} alt='Preview' style={{ width: rem(52), height: rem(52) }} />
          ) : (
            <Image style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }} />
          )}
        </Dropzone.Idle>

        <div>
          <Text size='xl' inline>
            Drag images here or click to select files
          </Text>
          <Text size='sm' c='dimmed' inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
      {uploading && <Notification>Loading...</Notification>}

      <form
        // onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col h-screen justify-center items-center bg-neutral-100'
      >
        <Card className='w-full max-w-md p-5'>
          <CardHeader className='flex flex-col gap-1 mb-1'>
            <Image
              alt='nextui logo'
              height={40}
              radius='sm'
              src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
              width={40}
            />
            <h4 className='font-bold text-xl'>Welcome</h4>
            <p className='text-sm font-medium'>Create an account to get started</p>
          </CardHeader>
          <CardBody className='space-y-4'>
            <div className='space-y-2'>
              <Input
                {...register('Title')}
                autoFocus
                label='Email'
                placeholder='Enter your email'
                labelPlacement='outside'
                variant='bordered'
              />
            </div>
            <div className='space-y-2'>
              <Input
                {...register('Description')}
                label='Password'
                variant='bordered'
                className='w-full'
                placeholder='Enter your password'
                labelPlacement='outside'
              />
            </div>
          </CardBody>
          <CardFooter className='flex flex-col space-y-2'>
            <Button type='submit' className='w-full bg-softblack text-white hover:bg-black/90 font-medium'>
              Create post
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Dropzone>
  );
};

export default CreatePost;
