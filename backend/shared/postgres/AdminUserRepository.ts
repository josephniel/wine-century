import { type AdminUser } from '../../domain/admin/entities';
import { type AdminUserRepository } from '../../interface/database/AdminUserRepository';
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

    const user = result[0] ?? undefined;
    if (user === undefined) {
      throw new AdminUserNotFoundError(email);
    }

    return user as AdminUser;
  }
}
