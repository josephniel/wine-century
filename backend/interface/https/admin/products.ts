export interface Product {
  id: number;
  name: string;
  details: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  details: string;
}

export interface CreateProductResponse extends Product {}

export interface GetProductRequest {
  id: number;
}

export interface GetProductResponse extends Product {}

export interface ListProductsRequest {
  limit: number;
  offset: number;
}

export interface ListProductsResponse {
  products: Product[];
  hasMore: boolean;
}

export interface EditProductRequest {
  id: number;
  details: string;
  price: number;
}

export interface EditProductResponse extends Product {}

export interface DeleteProductRequest {
  id: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  createdAt: string;
}

export interface CreateProductCategoryRequest {
  name: string;
}

export interface CreateProductCategoryResponse extends ProductCategory {}

export interface GetProductCategoryRequest {
  id: number;
}

export interface GetProductCategoryResponse extends ProductCategory {}

export interface ListProductCategoriesResponse {
  productCategories: ProductCategory[];
  hasMore: boolean;
}

export interface EditProductCategoryRequest {
  id: number;
  name: string;
}

export interface EditProductCategoryResponse extends ProductCategory {}

export interface DeleteProductCategoryRequest {
  id: number;
}
