import { Router } from 'express';

import { AdminController } from '../controller/admin';

const getAdminRoutes = (): Router => {
  const router = Router();

  const controller = new AdminController();

  router.post('/login', controller.adminLoginRequestHandler);

  return router;
};

export default getAdminRoutes();
