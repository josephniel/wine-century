import { type AdminUserRepository } from '../../interface/database/AdminUserRepository';
import { type AdminUser } from '../../interface/database/entities/AdminUser';
import AdminUserAlreadyExistsError from '../errors/AdminUserAlreadyExistsError';
import AdminUserNotFoundError from '../errors/AdminUserNotFoundError';
import { type Client } from './client';

export class PostgresAdminUserRepository implements AdminUserRepository {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;

    this.getUserUsingEmail = this.getUserUsingEmail.bind(this);
  }

  async getUserUsingEmail(email: string): Promise<AdminUser> {
    const result = await this.client.query(
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
      password: dbUser.password_hash,
      createdAt: dbUser.created_at,
      updatedAt: dbUser.updated_at
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
      const result = await this.client.query(
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
        password: dbUser.password_hash,
        createdAt: dbUser.created_at,
        updatedAt: dbUser.updated_at
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
