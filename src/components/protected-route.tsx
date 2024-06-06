import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '~/store/store';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isSignedIn = useSelector((state: RootState) => state.Auth?.isSignedIn);

  return isSignedIn ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
