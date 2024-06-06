import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button
} from '@nextui-org/react';
import { AcmeLogo } from '~/components/acme-logo';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutFailed, logoutStart, logoutSuccess } from '~/store/slice/AuthSlice';
import { AuthApi } from '~/api/auth-api';
import toast from 'react-hot-toast';
import { ThemeSwitcher } from '~/components/theme-provider';
import { RootState } from '~/store/store';
import SearchInput from '~/components/search-input';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname;
  const user = useSelector((state: RootState) => state.User?.data);

  const handleLogOut = async () => {
    try {
      dispatch(logoutStart());
      const res = await AuthApi.logoutAccount();
      if (res) {
        dispatch(logoutSuccess());
        toast.success('Logout successfully');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      dispatch(logoutFailed());
    }
  };

  return (
    <Navbar isBordered>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarBrand className='cursor-pointer' onClick={() => navigate('/')}>
          <AcmeLogo />
          <p className='font-bold text-inherit'>ACME</p>
        </NavbarBrand>
        <NavbarItem>
          <Button as={NavLink} color={`${path === '/' ? 'warning' : 'default'}`} to='/' className='rounded-full'>
            Home
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={NavLink}
            color={`${path === '/create' ? 'warning' : 'default'}`}
            to='/create'
            className='rounded-full'
          >
            Create
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as='div' className='px-5'>
        <SearchInput />
      </NavbarContent>

      <NavbarContent as='div' className='items-center' justify='end'>
        <ThemeSwitcher />
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='secondary'
              name={user?.FullName}
              size='sm'
              src={user?.Avatar}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold'>Signed in as</p>
              <p className='font-semibold text-yellow-500'>@{user?.UserName}</p>
            </DropdownItem>
            <DropdownItem onClick={() => navigate('/profile')} key='posts'>
              My Wall
            </DropdownItem>
            <DropdownItem onClick={() => navigate('/setting')} key='settings'>
              Settings
            </DropdownItem>
            <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
            <DropdownItem key='logout' color='danger' onClick={handleLogOut}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
