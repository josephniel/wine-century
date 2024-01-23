import { type ProductsRepository } from '../../interface/database/repositories/ProductsRepository';
import {
  type CreateProductRequest,
  type CreateProductResponse
} from '../../interface/https/admin/products';

export class ProductsHandler {
  private readonly productsRepo: ProductsRepository;

  constructor(productsRepo: ProductsRepository) {
    this.productsRepo = productsRepo;

    this.create = this.create.bind(this);
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
}
