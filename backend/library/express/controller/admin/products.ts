import { HttpStatusCode } from 'axios';
import { type Request, type Response } from 'express';

import { type ProductsHandler } from '../../../../domain/admin/products';
import {
  type CreateProductRequest,
  type CreateProductResponse
} from '../../../../interface/https/admin/products';

export class ProductsController {
  private readonly productsHandler: ProductsHandler;

  constructor(productsHandler: ProductsHandler) {
    this.productsHandler = productsHandler;
  }

  createProduct = async (request: Request, response: Response): Promise<void> => {
    const body = request.body as CreateProductRequest;

    const responseBody: CreateProductResponse = await this.productsHandler.create(body);

    response.status(HttpStatusCode.Created).json(responseBody);
  };
}
