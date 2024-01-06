import { type AdminUser } from '../../domain/admin/entities';

export interface AdminUserRepository {
  getUserUsingEmail: (email: string) => Promise<AdminUser>;
}
