import { Router } from 'express';

import { AccessHandler } from '../../../domain/admin/access';
import { ProductsHandler } from '../../../domain/admin/products';
import { UsersHandler } from '../../../domain/admin/users';
import {
  AddUserPermission,
  DeleteUserPermission,
  EditUserPermission,
  ViewUserPermission
} from '../../../domain/permissions/UserPermissions';
import { type Cache } from '../../../interface/cache';
import { type Database } from '../../../interface/database';
import { type AdminUserRepository } from '../../../interface/database/repositories/AdminUserRepository';
import { type ProductCategoriesRepository } from '../../../interface/database/repositories/ProductCategoriesRepository';
import { type ProductsRepository } from '../../../interface/database/repositories/ProductsRepository';
import { PostgresAdminUserRepository } from '../../postgres/AdminUserRepository';
import { PostgresProductCategoriesRepository } from '../../postgres/ProductCategoriesRepository';
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
  const productCategoriesRepo = new PostgresProductCategoriesRepository(database);

  registerAccessRoutes(router, cache, adminUserRepo);
  registerUserRoutes(router, cache, adminUserRepo);
  registerProductRoutes(router, cache, productsRepo, productCategoriesRepo);

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
    authMiddleware(cache)([AddUserPermission]),
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

  router.get(
    '/users',
    authMiddleware(cache)([ViewUserPermission]),
    asyncHandler(usersController.listRequestHandler)
  );
  router.put(
    '/users/:userID',
    authMiddleware(cache)([EditUserPermission]),
    asyncHandler(usersController.editRequestHandler)
  );
  router.delete(
    '/users/:userID',
    authMiddleware(cache)([DeleteUserPermission]),
    asyncHandler(usersController.deleteRequestHandler)
  );
};

const registerProductRoutes = (
  router: Router,
  cache: Cache,
  productsRepo: ProductsRepository,
  productCategoriesRepo: ProductCategoriesRepository
): void => {
  const productsHandler = new ProductsHandler(productsRepo, productCategoriesRepo);
  const productsController = new ProductsController(productsHandler);

  router.post(
    '/products/categories',
    authMiddleware(cache)([]),
    asyncHandler(productsController.createProductCategoryRequestHandler)
  );
  router.get(
    '/products/categories/:productCategoryID',
    authMiddleware(cache)([]),
    asyncHandler(productsController.getProductCategoryByIDRequestHandler)
  );
  router.get(
    '/products/categories',
    authMiddleware(cache)([]),
    asyncHandler(productsController.listProductCategoriesRequestHandler)
  );
  router.put(
    '/products/categories/:productCategoryID',
    authMiddleware(cache)([]),
    asyncHandler(productsController.editProductCategoryRequestHandler)
  );
  router.delete(
    '/products/categories/:productCategoryID',
    authMiddleware(cache)([]),
    asyncHandler(productsController.deleteProductCategoryRequestHandler)
  );

  router.post(
    '/products',
    authMiddleware(cache)([]),
    asyncHandler(productsController.createProductRequestHandler)
  );
  router.get(
    '/products/:productID',
    authMiddleware(cache)([]),
    asyncHandler(productsController.getProductByIDRequestHandler)
  );
  router.get(
    '/products',
    authMiddleware(cache)([]),
    asyncHandler(productsController.listProductsRequestHandler)
  );
  router.put(
    '/products/:productID',
    authMiddleware(cache)([]),
    asyncHandler(productsController.editProductRequestHandler)
  );
  router.delete(
    '/products/:productID',
    authMiddleware(cache)([]),
    asyncHandler(productsController.deleteProductRequestHandler)
  );
};

export default getAdminRoutes;
