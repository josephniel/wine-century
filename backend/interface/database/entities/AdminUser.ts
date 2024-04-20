export interface AdminUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}
