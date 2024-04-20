import AdminUserAlreadyExistsError from '../../domain/errors/AdminUserAlreadyExistsError';
import AdminUserNotFoundError from '../../domain/errors/AdminUserNotFoundError';
import { type Database } from '../../interface/database';
import { type AdminUser } from '../../interface/database/entities/AdminUser';
import { type AdminUserRepository } from '../../interface/database/repositories/AdminUserRepository';

export class PostgresAdminUserRepository implements AdminUserRepository {
  private readonly database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  getByEmail = async (email: string): Promise<AdminUser> => {
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
      permissions: await this.getAdminUserPermissions(dbUser.id as number),
      createdAt: new Date(dbUser.created_at as number),
      updatedAt: new Date(dbUser.updated_at as number)
    };

    return user;
  };

  create = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    permissions: string[]
  ): Promise<AdminUser> => {
    try {
      await this.database.query(`BEGIN;`, []);

      const result = await this.database.query(
        `
  INSERT INTO admin_users(first_name, last_name, email, password_hash)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `,
        [firstName, lastName, email, password]
      );

      const dbUser: any = result[0];

      const dbPermissionsQuery = await this.database.query(
        `
  SELECT id FROM permissions WHERE code = ANY($1::text[]);
  `,
        [permissions]
      );

      for (const result of dbPermissionsQuery) {
        await this.database.query(
          `
  INSERT INTO admin_user_permissions(admin_user_id, permission_id)
  VALUES ($1, $2);
    `,
          [dbUser.id, (result as any).id]
        );
      }

      await this.database.query(`COMMIT;`, []);

      const user: AdminUser = {
        id: dbUser.id,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name,
        email: dbUser.email,
        hashedPassword: dbUser.password_hash,
        permissions: dbUser.permissions,
        createdAt: new Date(dbUser.created_at as number),
        updatedAt: new Date(dbUser.updated_at as number)
      };
      return user;
    } catch (err: any) {
      await this.database.query(`ROLLBACK;`, []);
      if (err.code === '23505') {
        throw new AdminUserAlreadyExistsError(email);
      }
      throw new Error('Admin creation failed.');
    }
  };

  list = async (id: number, limit: number, offset: number): Promise<AdminUser[]> => {
    const result = await this.database.query(
      `
SELECT * FROM admin_users WHERE id != $1 ORDER BY id ASC LIMIT $2 OFFSET $3;
`,
      [id, limit, offset]
    );

    const adminUsers = [];
    for (const dbUser of result as any[]) {
      adminUsers.push({
        id: dbUser.id,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name,
        email: dbUser.email,
        hashedPassword: dbUser.password_hash,
        permissions: await this.getAdminUserPermissions(dbUser.id as number),
        createdAt: new Date(dbUser.created_at as number),
        updatedAt: new Date(dbUser.updated_at as number)
      });
    }

    return adminUsers;
  };

  update = async (
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    permissions: string[]
  ): Promise<AdminUser> => {
    try {
      await this.database.query(`BEGIN;`, []);

      const result = await this.database.query(
        `
  UPDATE admin_users
  SET 
    first_name = $1,
    last_name = $2,
    email = $3
  WHERE id = $4
  RETURNING *;
  `,
        [firstName, lastName, email, id]
      );

      const dbUser: any = result[0];

      const dbPermissionsQuery = await this.database.query(
        `
  SELECT id FROM permissions WHERE code = ANY($1::text[]);
  `,
        [permissions]
      );

      await this.database.query(
        `
  DELETE FROM admin_user_permissions WHERE admin_user_id = $1;
  `,
        [dbUser.id]
      );

      for (const result of dbPermissionsQuery) {
        await this.database.query(
          `
  INSERT INTO admin_user_permissions(admin_user_id, permission_id)
  VALUES ($1, $2);
    `,
          [dbUser.id, (result as any).id]
        );
      }

      await this.database.query(`COMMIT;`, []);

      const user: AdminUser = {
        id: dbUser.id,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name,
        email: dbUser.email,
        hashedPassword: dbUser.password_hash,
        permissions,
        createdAt: new Date(dbUser.created_at as number),
        updatedAt: new Date(dbUser.updated_at as number)
      };
      return user;
    } catch (err: any) {
      await this.database.query(`ROLLBACK;`, []);
      if (err.code === '23505') {
        throw new AdminUserAlreadyExistsError(email);
      }
      throw new Error('Admin update failed.');
    }
  };

  delete = async (id: number): Promise<void> => {
    try {
      await this.database.query(
        `
  DELETE FROM admin_users
  WHERE id = $1;
  `,
        [id]
      );
    } catch (err: any) {
      throw new Error('Admin deletion failed.');
    }
  };

  private readonly getAdminUserPermissions = async (adminUserID: number): Promise<string[]> => {
    const result = await this.database.query(
      `
  SELECT code FROM permissions WHERE id IN (
    SELECT permission_id FROM admin_user_permissions WHERE admin_user_id = $1
  );
`,
      [adminUserID]
    );

    return result.map((permission: any) => permission.code);
  };
}
