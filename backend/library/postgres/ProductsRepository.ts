import ProductAlreadyExistsError from '../../domain/errors/ProductAlreadyExistsError';
import ProductNotFoundError from '../../domain/errors/ProductNotFoundError';
import { type Database } from '../../interface/database';
import { type Product } from '../../interface/database/entities/Product';
import { type ProductsRepository } from '../../interface/database/repositories/ProductsRepository';

export class PostgresProductsRepository implements ProductsRepository {
  private readonly database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  create = async (name: string, details: string, price: number): Promise<Product> => {
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
  };

  get = async (id: number): Promise<Product> => {
    const result = await this.database.query(
      `
SELECT * FROM products WHERE id = $1;
`,
      [id]
    );

    const dbProduct: any = result[0] ?? undefined;
    if (dbProduct === undefined) {
      throw new ProductNotFoundError(id);
    }

    const product: Product = {
      id: dbProduct.id,
      name: dbProduct.name,
      details: dbProduct.details,
      price: dbProduct.price,
      createdAt: new Date(dbProduct.created_at as number),
      updatedAt: new Date(dbProduct.updated_at as number)
    };

    return product;
  };

  list = async (limit: number, offset: number): Promise<Product[]> => {
    const result = await this.database.query(
      `
SELECT * FROM products ORDER BY id ASC LIMIT $1 OFFSET $2;
      `,
      [limit, offset]
    );

    return result.map((dbProduct: any) => ({
      id: dbProduct.id,
      name: dbProduct.name,
      details: dbProduct.details,
      price: dbProduct.price,
      createdAt: new Date(dbProduct.created_at as number),
      updatedAt: new Date(dbProduct.updated_at as number)
    }));
  };

  update = async (id: number, details: string, price: number): Promise<Product> => {
    try {
      const result = await this.database.query(
        `
UPDATE products
SET 
  details = $1,
  price = $2
WHERE id = $3
RETURNING *;
  `,
        [details, price, id]
      );

      const dbProduct: any = result[0];
      const product: Product = {
        id: dbProduct.id,
        name: dbProduct.name,
        details: dbProduct.details,
        price: dbProduct.price,
        createdAt: new Date(dbProduct.created_at as number),
        updatedAt: new Date(dbProduct.updated_at as number)
      };
      return product;
    } catch (err: any) {
      throw new Error('Admin update failed.');
    }
  };

  delete = async (id: number): Promise<void> => {
    try {
      await this.database.query(
        `
  DELETE FROM products
  WHERE id = $1;
  `,
        [id]
      );
    } catch (err: any) {
      throw new Error('Product deletion failed.');
    }
  };
}
