import { type AdminUser } from '../entities/AdminUser';

export interface AdminUserRepository {
  getByEmail: (email: string) => Promise<AdminUser>;
  create: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    permissions: string[]
  ) => Promise<AdminUser>;
  list: (id: number, limit: number, offset: number) => Promise<AdminUser[]>;
  update: (
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    permissions: string[]
  ) => Promise<AdminUser>;
  delete: (id: number) => Promise<void>;
}
