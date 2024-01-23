import { HttpStatusCode } from 'axios';
import { type Request, type Response } from 'express';

import { type ProductsHandler } from '../../../../domain/admin/products';
import {
  type CreateProductRequest,
  type CreateProductResponse,
  type DeleteProductRequest,
  type EditProductRequest,
  type EditProductResponse,
  type GetProductRequest,
  type GetProductResponse,
  type ListProductsRequest,
  type ListProductsResponse
} from '../../../../interface/https/admin/products';

export class ProductsController {
  private readonly productsHandler: ProductsHandler;

  constructor(productsHandler: ProductsHandler) {
    this.productsHandler = productsHandler;
  }

  createRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body = request.body as CreateProductRequest;

    const responseBody: CreateProductResponse = await this.productsHandler.create(body);

    response.status(HttpStatusCode.Created).json(responseBody);
  };

  getByIDRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body: GetProductRequest = {
      id: Number(request.params['productID'])
    };

    const responseBody: GetProductResponse = await this.productsHandler.get(body);

    response.status(HttpStatusCode.Ok).json(responseBody);
  };

  listRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body: ListProductsRequest = {
      limit: Number(request.query['limit']),
      offset: Number(request.query['offset'])
    };

    const responseBody: ListProductsResponse = await this.productsHandler.list(body);

    response.status(HttpStatusCode.Ok).json(responseBody);
  };

  editRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body: EditProductRequest = {
      id: Number(request.params['productID']),
      details: request.body.details,
      price: request.body.price
    };

    const responseBody: EditProductResponse = await this.productsHandler.edit(body);

    response.status(HttpStatusCode.Ok).json(responseBody);
  };

  deleteRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body: DeleteProductRequest = {
      id: Number(request.params['productID'])
    };

    await this.productsHandler.delete(body);

    response.status(HttpStatusCode.NoContent).send('Success!');
  };
}
