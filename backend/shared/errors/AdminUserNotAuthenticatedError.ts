import { CustomError } from '.';
import { type AdminUser } from '../../domain/admin/entities';

class AdminUserNotAuthenticatedError extends CustomError {
  constructor(user: AdminUser) {
    super('ADMIN_USER_NOT_AUTHENTICATED_ERROR', `${user.email} is not authenticated.`, 401);
  }
}

export default AdminUserNotAuthenticatedError;
