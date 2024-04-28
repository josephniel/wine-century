import { Router } from 'express';

import { ProductsHandler } from '../../../domain/customer/products';
import { type Database } from '../../../interface/database';
import { type ProductCategoriesRepository } from '../../../interface/database/repositories/ProductCategoriesRepository';
import { PostgresProductCategoriesRepository } from '../../postgres/ProductCategoriesRepository';
import { ProductsController } from '../controller/customer/products';
import { asyncHandler } from '../middleware/asyncHandler';

const getPublicRoutes = (database: Database): Router => {
  const router = Router();

  const productCategoriesRepo = new PostgresProductCategoriesRepository(database);

  registerProductRoutes(router, productCategoriesRepo);

  return router;
};

const registerProductRoutes = (
  router: Router,
  productCategoriesRepo: ProductCategoriesRepository
): void => {
  const productsHandler = new ProductsHandler(productCategoriesRepo);
  const productsController = new ProductsController(productsHandler);

  router.get(
    '/products/categories',
    asyncHandler(productsController.listProductCategoriesRequestHandler)
  );
};

export default getPublicRoutes;
