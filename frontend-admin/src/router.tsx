import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import adminRoutes from './admin/routes';

const Router = (): React.ReactElement => {
  const router = createBrowserRouter([adminRoutes]);
  return <RouterProvider router={router} />;
};

export default Router;
