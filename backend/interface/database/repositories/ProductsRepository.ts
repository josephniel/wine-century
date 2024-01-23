import { type Product } from '../entities/Product';

export interface ProductsRepository {
  create: (name: string, details: string, price: number) => Promise<Product>;
  get: (id: number) => Promise<Product>;
  list: (limit: number, offset: number) => Promise<Product[]>;
  update: (id: number, details: string, price: number) => Promise<Product>;
  delete: (id: number) => Promise<void>;
}
