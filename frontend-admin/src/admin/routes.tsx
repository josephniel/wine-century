import { Navigate, Outlet } from 'react-router-dom';

import App from './App';
import DashboardPage from './pages/authenticated/DashboardPage';
import LogoutPage from './pages/authenticated/LogoutPage';
import ProductsPage from './pages/authenticated/ProductsPage';
import UserRegisterPage from './pages/authenticated/UserRegisterPage';
import UsersPage from './pages/authenticated/UsersPage';
import LoginPage from './pages/nonAuthenticated/LoginPage';
import AuthProvider, { useAuth } from './providers/AuthProvider';

const NonAuthenticatedRoute = (): React.ReactElement | null => {
  const { token } = useAuth();
  if (token !== null) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};

const AuthenticatedRoute = (): React.ReactElement | null => {
  const { token } = useAuth();
  if (token === null) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

const AuthenticatedApp: React.FC = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default {
  element: <AuthenticatedApp />,
  children: [
    {
      element: <NonAuthenticatedRoute />,
      children: [
        {
          path: '/',
          element: <Navigate to="/login" />
        },
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/*',
          element: <div>404 not found</div>
        }
      ]
    },
    {
      element: <AuthenticatedRoute />,
      children: [
        {
          path: '/',
          element: <Navigate to="/dashboard" />
        },
        {
          path: '/logout',
          element: <LogoutPage />
        },
        {
          path: '/dashboard',
          element: <DashboardPage />
        },
        {
          path: '/products',
          element: <ProductsPage />
        },
        {
          path: '/users',
          element: <UsersPage />
        },
        {
          path: '/users/register',
          element: <UserRegisterPage />
        },
        {
          path: '/*',
          element: <div>404 not found</div>
        }
      ]
    }
  ]
};
