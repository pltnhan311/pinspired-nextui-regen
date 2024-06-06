import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Image, Input, Link } from '@nextui-org/react';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UserApi } from '~/api/user-api';
import { useLogin } from '~/hooks/Auth/use-login';
import { RegisterSchema, TRegisterFields } from '~/schema';
import { loginFailed, loginStart, loginSuccess } from '~/store/slice/AuthSlice';
import { fetchUserSuccess } from '~/store/slice/UserSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<TRegisterFields>({
    resolver: zodResolver(RegisterSchema)
  });
  const [isVisible, setIsVisible] = useState(false);

  const { mutateAsync: loginAccount, isPending: loginAccountPending } = useLogin();

  const onSubmit: SubmitHandler<TRegisterFields> = async (data) => {
    try {
      dispatch(loginStart());
      const res = await loginAccount(data, {
        onError(error) {
          // @ts-expect-error emsg
          const formError = error.response.data.message;
          setError('root', {
            type: 'Server',
            message: formError
          });
        }
      });
      if (res.data.statusCode === 200) {
        dispatch(loginSuccess(res.data));

        const { data } = await UserApi.getUserInformation(res.data?.data?.Email as string);

        dispatch(fetchUserSuccess(data));
      }
    } catch (error) {
      console.log(error);
      dispatch(loginFailed());
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col h-screen justify-center items-center'>
      <Card className='w-full max-w-md p-5'>
        <CardHeader className='flex flex-col gap-1 mb-1'>
          <Image
            alt='nextui logo'
            height={40}
            radius='sm'
            src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
            width={40}
          />
          <h4 className='font-bold text-xl'>Welcome Back</h4>
          <p className='text-sm font-medium'>Log in to your account to continue</p>
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
            />
          </div>
          {errors?.root?.message && (
            <p className='p-2 bg-red-100/70 rounded-md text-xs text-[#f31260]'>{errors?.root?.message}</p>
          )}
          <div className='flex py-2 px-1 justify-between'>
            <Checkbox
              classNames={{
                label: 'text-small'
              }}
            >
              Remember me
            </Checkbox>
            <Link color='primary' href='/forgot-password' size='sm'>
              Forgot password?
            </Link>
          </div>
        </CardBody>
        <CardFooter className='flex flex-col space-y-2'>
          <Button
            isDisabled={loginAccountPending}
            type='submit'
            className='w-full bg-softblack text-white hover:bg-black/90 font-medium'
          >
            {loginAccountPending ? 'Loading...' : 'Login'}
          </Button>
        </CardFooter>
      </Card>
      <div className='mt-4'>
        <span className='text-sm'>Don't have an account? </span>
        <NavLink to='/register' className='text-sm text-blue-500'>
          Sign up
        </NavLink>
      </div>
    </form>
  );
}
