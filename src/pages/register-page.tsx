import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Image, Input, Link } from '@nextui-org/react';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { TRegisterFields, RegisterSchema } from '~/schema';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TRegisterFields>({
    resolver: zodResolver(RegisterSchema)
  });
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit: SubmitHandler<TRegisterFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(error);
    }

    console.log(data);
    reset();
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-screen justify-center items-center bg-neutral-100'
    >
      <Card className='w-full max-w-md p-5'>
        <CardHeader className='flex flex-col gap-1'>
          <Image
            alt='nextui logo'
            height={40}
            radius='sm'
            src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
            width={40}
          />
          <h4 className='font-bold text-large'>Welcome</h4>
          <p className='text-tiny font-medium'>Create an account to get started</p>
        </CardHeader>
        <CardBody className='space-y-4'>
          <div className='space-y-2'>
            <Input
              {...register('Email')}
              autoFocus
              endContent={<Mail className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
              label='Email'
              placeholder='Enter your email'
              labelPlacement='outside'
              variant='bordered'
              isInvalid={!!errors?.Email?.message}
              errorMessage={errors?.Email?.message}
            />
          </div>
          <div className='space-y-2'>
            <Input
              {...register('Password')}
              label='Password'
              variant='bordered'
              endContent={
                <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                  {isVisible ? (
                    <Eye className='text-2xl text-default-400 pointer-events-none' />
                  ) : (
                    <EyeOff className='text-2xl text-default-400 pointer-events-none' />
                  )}
                </button>
              }
              type={isVisible ? 'text' : 'password'}
              className='w-full'
              placeholder='Enter your password'
              labelPlacement='outside'
              isInvalid={!!errors?.Password?.message}
              errorMessage={errors?.Password?.message}
            />
          </div>
          <div className='flex px-1 justify-between'>
            <Checkbox
              classNames={{
                label: 'text-small'
              }}
            >
              I agree with the{' '}
              <Link color='primary' href='/terms' size='sm'>
                Terms
              </Link>{' '}
              and{' '}
              <Link color='primary' href='/privacy' size='sm'>
                Privacy Policy
              </Link>
            </Checkbox>
          </div>
        </CardBody>
        <CardFooter className='flex flex-col space-y-2'>
          <Button
            disabled={isSubmitting}
            type='submit'
            className='w-full bg-softblack text-white hover:bg-black/90 font-medium'
          >
            {isSubmitting ? 'Loading...' : 'Sign up'}
          </Button>
        </CardFooter>
      </Card>
      <div className='mt-4'>
        <span className='text-sm'>Already have an account? </span>
        <NavLink to='/login' className='text-sm text-blue-500'>
          Login
        </NavLink>
      </div>
    </form>
  );
}