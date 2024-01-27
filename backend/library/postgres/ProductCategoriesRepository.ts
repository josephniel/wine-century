import ProductCategoryAlreadyExistsError from '../../domain/errors/ProductCategoryAlreadyExistsError';
import ProductCategoryNotFoundError from '../../domain/errors/ProductCategoryNotFoundError';
import { type Database } from '../../interface/database';
import { type ProductCategory } from '../../interface/database/entities/ProductCategory';
import { type ProductCategoriesRepository } from '../../interface/database/repositories/ProductCategoriesRepository';

export class PostgresProductCategoriesRepository implements ProductCategoriesRepository {
  private readonly database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  create = async (name: string): Promise<ProductCategory> => {
    try {
      const result = await this.database.query(
        `
INSERT INTO product_categories(name)
VALUES ($1)
RETURNING *;
  `,
        [name]
      );

      const dbProductCategory: any = result[0];
      const productCategory: ProductCategory = {
        id: dbProductCategory.id,
        name: dbProductCategory.name,
        createdAt: new Date(dbProductCategory.created_at as number)
      };
      return productCategory;
    } catch (err: any) {
      if (err.code === '23505') {
        throw new ProductCategoryAlreadyExistsError(name);
      }
      throw new Error('Product Category creation failed.');
    }
  };

  get = async (id: number): Promise<ProductCategory> => {
    const result = await this.database.query(
      `
SELECT * FROM product_categories WHERE id = $1;
`,
      [id]
    );

    const dbProductCategory: any = result[0] ?? undefined;
    if (dbProductCategory === undefined) {
      throw new ProductCategoryNotFoundError(id);
    }

    const productCategory: ProductCategory = {
      id: dbProductCategory.id,
      name: dbProductCategory.name,
      createdAt: new Date(dbProductCategory.created_at as number)
    };
    return productCategory;
  };

  list = async (): Promise<ProductCategory[]> => {
    const result = await this.database.query(
      `
SELECT * FROM product_categories ORDER BY id ASC;
      `,
      []
    );

    return result.map((dbProductCategory: any) => ({
      id: dbProductCategory.id,
      name: dbProductCategory.name,
      createdAt: new Date(dbProductCategory.created_at as number)
    }));
  };

  update = async (id: number, name: string): Promise<ProductCategory> => {
    try {
      const result = await this.database.query(
        `
UPDATE product_categories
SET 
  name = $1
WHERE id = $2
RETURNING *;
  `,
        [name, id]
      );

      const dbProductCategory: any = result[0];
      const productCategory: ProductCategory = {
        id: dbProductCategory.id,
        name: dbProductCategory.name,
        createdAt: new Date(dbProductCategory.created_at as number)
      };
      return productCategory;
    } catch (err: any) {
      throw new Error('Admin update failed.');
    }
  };

  delete = async (id: number): Promise<void> => {
    try {
      await this.database.query(
        `
  DELETE FROM product_categories
  WHERE id = $1;
  `,
        [id]
      );
    } catch (err: any) {
      throw new Error('Product deletion failed.');
    }
  };
}
