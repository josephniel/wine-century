import AdminUserAlreadyExistsError from '../../domain/errors/AdminUserAlreadyExistsError';
import AdminUserNotFoundError from '../../domain/errors/AdminUserNotFoundError';
import { type Database } from '../../interface/database';
import { type AdminUser } from '../../interface/database/entities/AdminUser';
import { type AdminUserRepository } from '../../interface/database/repositories/AdminUserRepository';

export class PostgresAdminUserRepository implements AdminUserRepository {
  private readonly database: Database;

  constructor(database: Database) {
    this.database = database;

    this.getUserUsingEmail = this.getUserUsingEmail.bind(this);
  }

  async getUserUsingEmail(email: string): Promise<AdminUser> {
    const result = await this.database.query(
      `
SELECT * FROM admin_users WHERE email = $1;
`,
      [email]
    );

    const dbUser: any = result[0] ?? undefined;
    if (dbUser === undefined) {
      throw new AdminUserNotFoundError(email);
    }

    const user: AdminUser = {
      id: dbUser.id,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      email: dbUser.email,
      hashedPassword: dbUser.password_hash,
      createdAt: new Date(0, 0, 0, 0, 0, 0, Date.parse(dbUser.created_at as string)),
      updatedAt: new Date(0, 0, 0, 0, 0, 0, Date.parse(dbUser.updated_at as string))
    };

    return user;
  }

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<AdminUser> {
    try {
      const result = await this.database.query(
        `
INSERT INTO admin_users(first_name, last_name, email, password_hash)
VALUES ($1, $2, $3, $4)
RETURNING *;
  `,
        [firstName, lastName, email, password]
      );

      const dbUser: any = result[0];
      const user: AdminUser = {
        id: dbUser.id,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name,
        email: dbUser.email,
        hashedPassword: dbUser.password_hash,
        createdAt: new Date(0, 0, 0, 0, 0, 0, Date.parse(dbUser.created_at as string)),
        updatedAt: new Date(0, 0, 0, 0, 0, 0, Date.parse(dbUser.updated_at as string))
      };
      return user;
    } catch (err: any) {
      if (err.code === '23505') {
        throw new AdminUserAlreadyExistsError(email);
      }
      throw new Error('Admin creation failed.');
    }
  }
}
