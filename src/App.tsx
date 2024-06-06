import { useSelector } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider
} from 'react-router-dom';
import AuthLayout from '~/components/layouts/auth-layout';
import MainLayout from '~/components/layouts/main-layout';
// import ProtectedRoute from '~/components/protected-route';
import LoginPage from '~/pages/login-page';
import HomePage from '~/pages/home-page';
import ProfilePage from '~/pages/profile-page';

import RegisterPage from '~/pages/register-page';
import SettingPage from '~/pages/setting-page';
import { RootState } from '~/store/store';
import DetailPostPage from '~/pages/detail-post';
import CreatePostPage from '~/pages/create-post-page';

function ProtectedRoute() {
  const isSignedIn = useSelector((state: RootState) => state.Auth?.isSignedIn);
  return isSignedIn ? <Outlet /> : <Navigate to='/login' replace={true} />;
}

function RejectedRoute() {
  const isSignedIn = useSelector((state: RootState) => state.Auth?.isSignedIn);
  return !isSignedIn ? <Outlet /> : <Navigate to='/' />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='' element={<RejectedRoute />}>
        <Route path='' element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
      </Route>
      <Route path='' element={<ProtectedRoute />}>
        <Route path='' element={<MainLayout />}>
          <Route path='/' index={true} element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/create' element={<CreatePostPage />} />
          <Route path='/setting' element={<SettingPage />} />
          <Route path='/pin/:id' element={<DetailPostPage />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
