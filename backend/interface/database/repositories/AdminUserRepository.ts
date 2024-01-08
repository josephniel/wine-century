import { type AdminUser } from '../entities/AdminUser';

export interface AdminUserRepository {
  getUserUsingEmail: (email: string) => Promise<AdminUser>;
  createUser: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<AdminUser>;
}
