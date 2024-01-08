export interface AdminUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date;
}
