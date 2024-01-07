import { Router } from 'express';

import { AdminController } from '../controller/admin';
import { asyncHandler } from '../controller/middleware/asyncHandler';
import { AccessHandler } from '../../../domain/admin/access';
import { PostgresAdminUserRepository } from '../../../shared/postgres/AdminUserRepository';
import { type Client } from '../../../shared/postgres/client';

const getAdminRoutes = (databaseClient: Client): Router => {
  const router = Router();

  const adminUserRepo = new PostgresAdminUserRepository(databaseClient);
  const loginHandler = new AccessHandler(adminUserRepo);
  const controller = new AdminController(loginHandler);

  router.post('/login', asyncHandler(controller.adminLoginRequestHandler));
  router.post('/register', asyncHandler(controller.adminSignupRequestHandler));

  return router;
};

export default getAdminRoutes;
