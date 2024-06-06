import { Outlet } from 'react-router-dom';
import Header from '~/components/header';

const MainLayout = () => {
  return (
    <div className='relative flex min-h-dvh flex-col bg-background bg-radial'>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
