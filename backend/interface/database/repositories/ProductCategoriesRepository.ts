import { type ProductCategory } from '../entities/ProductCategory';

export interface ProductCategoriesRepository {
  create: (name: string) => Promise<ProductCategory>;
  get: (id: number) => Promise<ProductCategory>;
  list: () => Promise<ProductCategory[]>;
  update: (id: number, name: string) => Promise<ProductCategory>;
  delete: (id: number) => Promise<void>;
}
