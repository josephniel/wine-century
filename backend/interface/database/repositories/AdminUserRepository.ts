import { type AdminUser } from '../entities/AdminUser';

export interface AdminUserRepository {
  getUserUsingEmail: (email: string) => Promise<AdminUser>;
  createUser: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<AdminUser>;
  listUsers: (id: number, limit: number, offset: number) => Promise<AdminUser[]>;
  updateUser: (
    id: number,
    firstName: string,
    lastName: string,
    email: string
  ) => Promise<AdminUser>;
  deleteUser: (id: number) => Promise<void>;
}
