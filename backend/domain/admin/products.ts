import { type Product as DBProduct } from '../../interface/database/entities/Product';
import { type ProductsRepository } from '../../interface/database/repositories/ProductsRepository';
import {
  type CreateProductRequest,
  type CreateProductResponse,
  type DeleteProductRequest,
  type EditProductRequest,
  type EditProductResponse,
  type GetProductRequest,
  type GetProductResponse,
  type ListProductsRequest,
  type ListProductsResponse,
  type Product
} from '../../interface/https/admin/products';

export class ProductsHandler {
  private readonly productsRepo: ProductsRepository;

  constructor(productsRepo: ProductsRepository) {
    this.productsRepo = productsRepo;

    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
    this.list = this.list.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request: CreateProductRequest): Promise<CreateProductResponse> {
    const product = await this.productsRepo.create(request.name, request.details, request.price);

    const response: CreateProductResponse = {
      id: product.id,
      name: product.name,
      details: product.details,
      price: product.price,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
    };
    return response;
  }

  async get(request: GetProductRequest): Promise<GetProductResponse> {
    const product = await this.productsRepo.get(request.id);

    const response: GetProductResponse = {
      id: product.id,
      name: product.name,
      details: product.details,
      price: product.price,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
    };
    return response;
  }

  async list(request: ListProductsRequest): Promise<ListProductsResponse> {
    let products = await this.productsRepo.list(request.limit + 1, request.offset);

    let hasMore = false;
    if (products.length > request.limit) {
      hasMore = true;
      products = products.slice(0, -1);
    }

    return {
      products: products.map(
        (product: DBProduct): Product => ({
          id: product.id,
          name: product.name,
          details: product.details,
          price: product.price,
          createdAt: product.createdAt.toISOString(),
          updatedAt: product.updatedAt.toISOString()
        })
      ),
      hasMore
    };
  }

  async edit(request: EditProductRequest): Promise<EditProductResponse> {
    const product = await this.productsRepo.update(request.id, request.details, request.price);

    const response: EditProductResponse = {
      id: product.id,
      name: product.name,
      details: product.details,
      price: product.price,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
    };
    return response;
  }

  async delete(request: DeleteProductRequest): Promise<null> {
    await this.productsRepo.delete(request.id);
    return null;
  }
}
