import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';

const NonAuthenticatedRoute = (): React.ReactElement | null => {
  const { token } = useAuth();

  if (token !== null) {
    return <Navigate to="/admin/dashboard" />;
  }
  return <Outlet />;
};

export default NonAuthenticatedRoute;
