import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button
} from '@nextui-org/react';
import { AcmeLogo } from '~/components/acme-logo';
import { NavLink } from 'react-router-dom';

export default function HeaderAuth() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ['Profile', 'Dashboard', 'Activity', 'My Settings', 'Team Settings', 'Help & Feedback', 'Log Out'];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>

      <NavbarContent className='sm:hidden pr-3' justify='center'>
        <NavbarBrand>
          <AcmeLogo />
          <p className='font-bold text-inherit'>ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarBrand>
          <AcmeLogo />
          <p className='font-bold text-inherit'>ACME</p>
        </NavbarBrand>
        <NavbarItem>
          <Button as={NavLink} color='default' to='/explore' variant='flat'>
            Explore
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem isActive>
          <Link href='/' aria-current='page'>
            Giới thiệu
          </Link>
        </NavbarItem>
        <NavbarItem>
          <NavLink color='foreground' to='/'>
            Điều khoản
          </NavLink>
        </NavbarItem>
        <NavbarItem className='hidden lg:flex'>
          <Button as={NavLink} color='danger' to='/login' variant='solid'>
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={NavLink} color='default' to='/register' variant='flat'>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className='w-full'
              color={index === 2 ? 'warning' : index === menuItems.length - 1 ? 'danger' : 'foreground'}
              href='#'
              size='lg'
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
