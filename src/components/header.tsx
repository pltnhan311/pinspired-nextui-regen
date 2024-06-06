import {
  Navbar,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
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
import { useState } from 'react';

const menuItems = ['Home', 'Create', 'Message', 'Setting', 'Log Out'];

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className='flex items-center justify-between'>
      <Navbar maxWidth='2xl' onMenuOpenChange={setIsMenuOpen} isBordered className='border-default-100'>
        <NavbarContent>
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='sm:hidden' />
          <NavbarItem className='cursor-pointer flex items-center mr-2' onClick={() => navigate('/')}>
            <AcmeLogo />
            <p className='font-bold text-inherit'>ACME</p>
          </NavbarItem>
          <NavbarItem className='hidden md:flex'>
            <Button as={NavLink} color={`${path === '/' ? 'warning' : 'default'}`} to='/' className='rounded-full'>
              Home
            </Button>
          </NavbarItem>
          <NavbarItem className='hidden md:flex'>
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

        <SearchInput />

        <NavbarContent className='hidden md:flex' justify='end'>
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

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NavLink
                color={index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'}
                className='w-full'
                to={item === 'Home' ? '/' : item.toLowerCase()}
              >
                {item}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
