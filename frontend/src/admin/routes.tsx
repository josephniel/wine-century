import { jwtDecode } from 'jwt-decode';
import { type RouteObject } from 'react-router-dom';

import LoginAction from './actions/LoginAction';
import RegisterUserAction from './actions/RegisterUserAction';
import App, { type AppProps } from './App';
import appData from './AppData';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import NonAuthenticatedRoute from './components/NonAuthenticatedRoute';
import type User from './data/user';
import UsersPageLoader, { USER_LIST_LIMIT } from './loaders/UsersPageLoader';
import DashboardPage from './pages/authenticated/DashboardPage';
import LogoutPage from './pages/authenticated/LogoutPage';
import ProductsPage from './pages/authenticated/ProductsPage';
import UserRegisterPage from './pages/authenticated/UserRegisterPage';
import UsersPage from './pages/authenticated/UsersPage';
import LoginPage from './pages/nonAuthenticated/LoginPage';

const getUserFromToken = (token: string | null): User | undefined => {
  if (token === null) {
    return undefined;
  }

  const decoded: any = jwtDecode(token);
  return {
    id: decoded.data.id,
    firstName: decoded.data.firstName,
    lastName: decoded.data.lastName,
    email: decoded.data.email
  };
};

const getAdminRoutes = (
  token: string | null,
  setToken: React.Dispatch<React.SetStateAction<string | null>>
): RouteObject => {
  const adminAuthenticatedRoutes: RouteObject = {
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
        element: <UsersPage />,
        loader: UsersPageLoader(USER_LIST_LIMIT, 0)
      },
      {
        path: '/admin/users/register',
        element: <UserRegisterPage />,
        action: RegisterUserAction
      },
      {
        path: '/admin/*',
        element: <div>404 not found</div>
      }
    ]
  };

  const adminNotAuthenticatedRoutes: RouteObject = {
    element: <NonAuthenticatedRoute />,
    children: [
      {
        path: '/admin/login',
        element: <LoginPage />,
        action: LoginAction(setToken)
      },
      {
        path: '/admin/*',
        element: <div>404 not found</div>
      }
    ]
  };

  const appProps: AppProps = {
    ...appData,
    header: {
      ...appData.header,
      user: getUserFromToken(token)
    }
  };

  return {
    element: <App {...appProps} />,
    children: [adminNotAuthenticatedRoutes, adminAuthenticatedRoutes]
  };
};

export default getAdminRoutes;
