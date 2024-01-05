import { createBrowserRouter } from 'react-router-dom';

import adminRoutes from './admin/routes';
import customerRoutes from './customer/routes';

export default createBrowserRouter([customerRoutes, adminRoutes]);
