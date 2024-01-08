import { Router } from 'express';

import { AccessHandler } from '../../../domain/admin/access';
import { type Cache } from '../../../interface/cache';
import { type Database } from '../../../interface/database';
import { PostgresAdminUserRepository } from '../../postgres/AdminUserRepository';
import { AdminController } from '../controller/admin';
import { asyncHandler } from '../middleware/asyncHandler';
import { authMiddleware } from '../middleware/auth';

const getAdminRoutes = (database: Database, cache: Cache): Router => {
  const router = Router();

  const adminUserRepo = new PostgresAdminUserRepository(database);
  const loginHandler = new AccessHandler(adminUserRepo, cache);
  const controller = new AdminController(loginHandler);

  router.post('/login', asyncHandler(controller.adminLoginRequestHandler));
  router.post(
    '/register',
    authMiddleware(cache),
    asyncHandler(controller.adminSignupRequestHandler)
  );

  return router;
};

export default getAdminRoutes;
