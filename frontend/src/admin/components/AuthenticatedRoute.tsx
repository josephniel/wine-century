import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';

const AuthenticatedRoute = (): React.ReactElement | null => {
  const { token } = useAuth();
  if (token === null) {
    return <Navigate to="/admin/login" />;
  }
  return <Outlet />;
};

export default AuthenticatedRoute;
