import ProductAlreadyExistsError from '../../domain/errors/ProductAlreadyExistsError';
import { type Database } from '../../interface/database';
import { type Product } from '../../interface/database/entities/Product';
import { type ProductsRepository } from '../../interface/database/repositories/ProductsRepository';

export class PostgresProductsRepository implements ProductsRepository {
  private readonly database: Database;

  constructor(database: Database) {
    this.database = database;

    this.create = this.create.bind(this);
  }

  async create(name: string, details: string, price: number): Promise<Product> {
    try {
      const result = await this.database.query(
        `
INSERT INTO products(name, details, price)
VALUES ($1, $2, $3)
RETURNING *;
  `,
        [name, details, price]
      );

      const dbProduct: any = result[0];
      const product: Product = {
        id: dbProduct.id,
        name: dbProduct.name,
        details: dbProduct.details,
        price: Number(dbProduct.price),
        createdAt: new Date(dbProduct.created_at as number),
        updatedAt: new Date(dbProduct.updated_at as number)
      };
      return product;
    } catch (err: any) {
      if (err.code === '23505') {
        throw new ProductAlreadyExistsError(name);
      }
      throw new Error('Product creation failed.');
    }
  }
}
