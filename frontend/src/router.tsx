import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import adminRoutes from './admin/routes';
import customerRoutes from './customer/routes';

const Router = (): React.ReactElement => {
  const router = createBrowserRouter([customerRoutes, adminRoutes]);
  return <RouterProvider router={router} />;
};

export default Router;
