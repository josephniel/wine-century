import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AuthProvider, { useAuth } from './admin/providers/AuthProvider';
import getAdminRoutes from './admin/routes';
import getCustomerRoutes from './customer/routes';

const AuthenticatedRouter = (): React.ReactElement => {
  const { token, setToken } = useAuth();
  const router = createBrowserRouter([getCustomerRoutes(), getAdminRoutes(token, setToken)]);
  return <RouterProvider router={router} />;
};

const Router = (): React.ReactElement => (
  <AuthProvider>
    <AuthenticatedRouter />
  </AuthProvider>
);

export default Router;
