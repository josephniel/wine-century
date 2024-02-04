import { type Product as DBProduct } from '../../interface/database/entities/Product';
import { type ProductCategory as DBProductCategory } from '../../interface/database/entities/ProductCategory';
import { type ProductCategoriesRepository } from '../../interface/database/repositories/ProductCategoriesRepository';
import { type ProductsRepository } from '../../interface/database/repositories/ProductsRepository';
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
  type ListProductsResponse,
  type Product,
  type ProductCategory
} from '../../interface/https/admin/products';

export class ProductsHandler {
  private readonly productsRepo: ProductsRepository;
  private readonly productCategoriesRepo: ProductCategoriesRepository;

  constructor(
    productsRepo: ProductsRepository,
    productCategoriesRepo: ProductCategoriesRepository
  ) {
    this.productsRepo = productsRepo;
    this.productCategoriesRepo = productCategoriesRepo;
  }

  createProduct = async (request: CreateProductRequest): Promise<CreateProductResponse> => {
    const product = await this.productsRepo.create(
      request.name,
      request.details,
      request.price,
      request.categoryID
    );

    const response: CreateProductResponse = {
      id: product.id,
      name: product.name,
      details: product.details,
      price: product.price,
      categoryID: product.categoryID,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
    };
    return response;
  };

  getProductByID = async (request: GetProductRequest): Promise<GetProductResponse> => {
    const product = await this.productsRepo.get(request.id);

    const response: GetProductResponse = {
      id: product.id,
      name: product.name,
      details: product.details,
      price: product.price,
      categoryID: product.categoryID,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
    };
    return response;
  };

  listProducts = async (request: ListProductsRequest): Promise<ListProductsResponse> => {
    let products = await this.productsRepo.list(
      request.categoryID,
      request.limit + 1,
      request.offset
    );

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
          categoryID: product.categoryID,
          createdAt: product.createdAt.toISOString(),
          updatedAt: product.updatedAt.toISOString()
        })
      ),
      hasMore
    };
  };

  editProduct = async (request: EditProductRequest): Promise<EditProductResponse> => {
    const product = await this.productsRepo.update(request.id, request.details, request.price);

    const response: EditProductResponse = {
      id: product.id,
      name: product.name,
      details: product.details,
      price: product.price,
      categoryID: product.categoryID,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
    };
    return response;
  };

  deleteProduct = async (request: DeleteProductRequest): Promise<null> => {
    await this.productsRepo.delete(request.id);
    return null;
  };

  createProductCategory = async (
    request: CreateProductCategoryRequest
  ): Promise<CreateProductCategoryResponse> => {
    const product = await this.productCategoriesRepo.create(request.name);

    const response: CreateProductCategoryResponse = {
      id: product.id,
      name: product.name,
      createdAt: product.createdAt.toISOString()
    };
    return response;
  };

  getProductCategoryByID = async (
    request: GetProductCategoryRequest
  ): Promise<GetProductCategoryResponse> => {
    const product = await this.productCategoriesRepo.get(request.id);

    const response: GetProductCategoryResponse = {
      id: product.id,
      name: product.name,
      createdAt: product.createdAt.toISOString()
    };
    return response;
  };

  listProductCategories = async (): Promise<ListProductCategoriesResponse> => {
    const productCategories = await this.productCategoriesRepo.list();

    return {
      productCategories: productCategories.map(
        (productCategory: DBProductCategory): ProductCategory => ({
          id: productCategory.id,
          name: productCategory.name,
          createdAt: productCategory.createdAt.toISOString()
        })
      ),
      hasMore: false
    };
  };

  editProductCategory = async (
    request: EditProductCategoryRequest
  ): Promise<EditProductCategoryResponse> => {
    const product = await this.productCategoriesRepo.update(request.id, request.name);

    const response: EditProductCategoryResponse = {
      id: product.id,
      name: product.name,
      createdAt: product.createdAt.toISOString()
    };
    return response;
  };

  deleteProductCategory = async (request: DeleteProductCategoryRequest): Promise<null> => {
    await this.productCategoriesRepo.delete(request.id);
    return null;
  };
}
