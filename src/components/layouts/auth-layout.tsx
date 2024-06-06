import { Outlet } from 'react-router-dom';
import HeaderAuth from '~/components/header-auth';

const AuthLayout = () => {
  return (
    <div className='relative flex h-screen flex-col bg-background bg-radial'>
      <HeaderAuth />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
