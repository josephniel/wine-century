import { Router } from 'express';

import { AccessHandler } from '../../../domain/admin/access';
import { ProductsHandler } from '../../../domain/admin/products';
import { UsersHandler } from '../../../domain/admin/users';
import { type Cache } from '../../../interface/cache';
import { type Database } from '../../../interface/database';
import { type AdminUserRepository } from '../../../interface/database/repositories/AdminUserRepository';
import { type ProductsRepository } from '../../../interface/database/repositories/ProductsRepository';
import { PostgresAdminUserRepository } from '../../postgres/AdminUserRepository';
import { PostgresProductsRepository } from '../../postgres/ProductsRepository';
import { AccessController } from '../controller/admin/access';
import { ProductsController } from '../controller/admin/products';
import { UsersController } from '../controller/admin/users';
import { asyncHandler } from '../middleware/asyncHandler';
import { authMiddleware } from '../middleware/auth';

const getAdminRoutes = (database: Database, cache: Cache): Router => {
  const router = Router();

  const adminUserRepo = new PostgresAdminUserRepository(database);
  const productsRepo = new PostgresProductsRepository(database);

  registerAccessRoutes(router, cache, adminUserRepo);
  registerUserRoutes(router, cache, adminUserRepo);
  registerProductRoutes(router, cache, productsRepo);

  return router;
};

const registerAccessRoutes = (
  router: Router,
  cache: Cache,
  adminUserRepo: AdminUserRepository
): void => {
  const accessHandler = new AccessHandler(adminUserRepo, cache);
  const accessController = new AccessController(accessHandler);

  router.post('/login', asyncHandler(accessController.loginRequestHandler));
  router.post(
    '/register',
    authMiddleware(cache),
    asyncHandler(accessController.signupRequestHandler)
  );
};

const registerUserRoutes = (
  router: Router,
  cache: Cache,
  adminUserRepo: AdminUserRepository
): void => {
  const usersHandler = new UsersHandler(adminUserRepo);
  const usersController = new UsersController(usersHandler);

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
};

const registerProductRoutes = (
  router: Router,
  cache: Cache,
  productsRepo: ProductsRepository
): void => {
  const productsHandler = new ProductsHandler(productsRepo);
  const productsController = new ProductsController(productsHandler);

  router.post('/products', authMiddleware(cache), asyncHandler(productsController.createProduct));
};

export default getAdminRoutes;
