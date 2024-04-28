import { HttpStatusCode } from 'axios';
import { type Request, type Response } from 'express';

import { type ProductsHandler } from '../../../../domain/customer/products';
import { type ListProductCategoriesResponse } from '../../../../interface/https/customer/products';

export class ProductsController {
  private readonly productsHandler: ProductsHandler;

  constructor(productsHandler: ProductsHandler) {
    this.productsHandler = productsHandler;
  }

  listProductCategoriesRequestHandler = async (_: Request, response: Response): Promise<void> => {
    const responseBody: ListProductCategoriesResponse =
      await this.productsHandler.listProductCategories();

    response.status(HttpStatusCode.Ok).json(responseBody);
  };
}
