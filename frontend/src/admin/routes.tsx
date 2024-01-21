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
    return <Navigate to="/admin/dashboard" />;
  }
  return <Outlet />;
};

const AuthenticatedRoute = (): React.ReactElement | null => {
  const { token } = useAuth();
  if (token === null) {
    return <Navigate to="/admin/login" />;
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
          path: '/admin/login',
          element: <LoginPage />
        },
        {
          path: '/admin/*',
          element: <div>404 not found</div>
        }
      ]
    },
    {
      element: <AuthenticatedRoute />,
      children: [
        {
          path: '/admin/logout',
          element: <LogoutPage />
        },
        {
          path: '/admin/dashboard',
          element: <DashboardPage />
        },
        {
          path: '/admin/products',
          element: <ProductsPage />
        },
        {
          path: '/admin/users',
          element: <UsersPage />
        },
        {
          path: '/admin/users/register',
          element: <UserRegisterPage />
        },
        {
          path: '/admin/*',
          element: <div>404 not found</div>
        }
      ]
    }
  ]
};
