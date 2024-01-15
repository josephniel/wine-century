import { Router } from 'express';

import { AccessHandler } from '../../../domain/admin/access';
import { UsersHandler } from '../../../domain/admin/users';
import { type Cache } from '../../../interface/cache';
import { type Database } from '../../../interface/database';
import { PostgresAdminUserRepository } from '../../postgres/AdminUserRepository';
import { AccessController, UsersController } from '../controller/admin';
import { asyncHandler } from '../middleware/asyncHandler';
import { authMiddleware } from '../middleware/auth';

const getAdminRoutes = (database: Database, cache: Cache): Router => {
  const router = Router();

  const adminUserRepo = new PostgresAdminUserRepository(database);

  const accessHandler = new AccessHandler(adminUserRepo, cache);
  const accessController = new AccessController(accessHandler);

  const usersHandler = new UsersHandler(adminUserRepo);
  const usersController = new UsersController(usersHandler);

  router.post('/login', asyncHandler(accessController.loginRequestHandler));
  router.post(
    '/register',
    authMiddleware(cache),
    asyncHandler(accessController.signupRequestHandler)
  );

  router.get('/users', authMiddleware(cache), asyncHandler(usersController.listRequestHandler));
  router.put(
    '/users/:userID',
    authMiddleware(cache),
    asyncHandler(usersController.editRequestHandler)
  );
  router.delete(
    '/users/:userID',
    authMiddleware(cache),
    asyncHandler(usersController.deleteRequestHandler)
  );

  return router;
};

export default getAdminRoutes;
