import { type Product } from '../entities/Product';

export interface ProductsRepository {
  create: (name: string, details: string, price: number) => Promise<Product>;
}
