import { HttpStatusCode } from 'axios';
import { type Request, type Response } from 'express';

import { type ProductsHandler } from '../../../../domain/admin/products';
import {
  type CreateProductCategoryRequest,
  type CreateProductCategoryResponse,
  type CreateProductRequest,
  type CreateProductResponse,
  type DeleteProductCategoryRequest,
  type DeleteProductRequest,
  type EditProductCategoryRequest,
  type EditProductCategoryResponse,
  type EditProductRequest,
  type EditProductResponse,
  type GetProductCategoryRequest,
  type GetProductCategoryResponse,
  type GetProductRequest,
  type GetProductResponse,
  type ListProductCategoriesResponse,
  type ListProductsRequest,
  type ListProductsResponse
} from '../../../../interface/https/admin/products';

export class ProductsController {
  private readonly productsHandler: ProductsHandler;

  constructor(productsHandler: ProductsHandler) {
    this.productsHandler = productsHandler;
  }

  createProductRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body = request.body as CreateProductRequest;

    const responseBody: CreateProductResponse = await this.productsHandler.createProduct(body);

    response.status(HttpStatusCode.Created).json(responseBody);
  };

  getProductByIDRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body: GetProductRequest = {
      id: Number(request.params['productID'])
    };

    const responseBody: GetProductResponse = await this.productsHandler.getProductByID(body);

    response.status(HttpStatusCode.Ok).json(responseBody);
  };

  listProductsRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body: ListProductsRequest = {
      limit: Number(request.query['limit']),
      offset: Number(request.query['offset'])
    };

    const responseBody: ListProductsResponse = await this.productsHandler.listProducts(body);

    response.status(HttpStatusCode.Ok).json(responseBody);
  };

  editProductRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body: EditProductRequest = {
      id: Number(request.params['productID']),
      details: request.body.details,
      price: request.body.price
    };

    const responseBody: EditProductResponse = await this.productsHandler.editProduct(body);

    response.status(HttpStatusCode.Ok).json(responseBody);
  };

  deleteProductRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body: DeleteProductRequest = {
      id: Number(request.params['productID'])
    };

    await this.productsHandler.deleteProduct(body);

    response.status(HttpStatusCode.NoContent).send('Success!');
  };

  createProductCategoryRequestHandler = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    const body = request.body as CreateProductCategoryRequest;

    const responseBody: CreateProductCategoryResponse =
      await this.productsHandler.createProductCategory(body);

    response.status(HttpStatusCode.Created).json(responseBody);
  };

  getProductCategoryByIDRequestHandler = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    const body: GetProductCategoryRequest = {
      id: Number(request.params['productCategoryID'])
    };

    const responseBody: GetProductCategoryResponse =
      await this.productsHandler.getProductCategoryByID(body);

    response.status(HttpStatusCode.Ok).json(responseBody);
  };

  listProductCategoriesRequestHandler = async (_: Request, response: Response): Promise<void> => {
    const responseBody: ListProductCategoriesResponse =
      await this.productsHandler.listProductCategories();

    response.status(HttpStatusCode.Ok).json(responseBody);
  };

  editProductCategoryRequestHandler = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    const body: EditProductCategoryRequest = {
      id: Number(request.params['productCategoryID']),
      name: request.body.name
    };

    const responseBody: EditProductCategoryResponse =
      await this.productsHandler.editProductCategory(body);

    response.status(HttpStatusCode.Ok).json(responseBody);
  };

  deleteProductCategoryRequestHandler = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    const body: DeleteProductCategoryRequest = {
      id: Number(request.params['productCategoryID'])
    };

    await this.productsHandler.deleteProductCategory(body);

    response.status(HttpStatusCode.NoContent).send('Success!');
  };
}
