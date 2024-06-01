import { Outlet } from 'react-router-dom'
import HeaderAuth from '~/components/header-auth'

const AuthLayout = () => {
  return (
    <div className='bg-neutral-200 h-screen'>
      <HeaderAuth />
      <Outlet />
    </div>
  )
}

export default AuthLayout
