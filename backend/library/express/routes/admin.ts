import { Router } from 'express';

import { AdminController } from '../controller/admin';
import { asyncHandler } from '../middleware/asyncHandler';
import { authMiddleware } from '../middleware/auth';
import { AccessHandler } from '../../../domain/admin/access';
import { PostgresAdminUserRepository } from '../../postgres/AdminUserRepository';
import { Database } from '../../../interface/database';
import { Cache } from '../../../interface/cache';

const getAdminRoutes = (database: Database, cache: Cache): Router => {
  const router = Router();

  const adminUserRepo = new PostgresAdminUserRepository(database);
  const loginHandler = new AccessHandler(adminUserRepo, cache);
  const controller = new AdminController(loginHandler);

  router.post('/login', asyncHandler(controller.adminLoginRequestHandler));
  router.post('/register', authMiddleware(cache), asyncHandler(controller.adminSignupRequestHandler));

  return router;
};

export default getAdminRoutes;
