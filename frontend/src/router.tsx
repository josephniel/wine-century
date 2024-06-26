import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import customerRoutes from './customer/routes';

const Router = (): React.ReactElement => {
  const router = createBrowserRouter([customerRoutes]);
  return <RouterProvider router={router} />;
};

export default Router;
