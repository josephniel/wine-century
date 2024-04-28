export interface ProductCategory {
  id: number;
  name: string;
  imageLink: string;
  createdAt: string;
}

export interface ListProductCategoriesResponse {
  productCategories: ProductCategory[];
  hasMore: boolean;
}
