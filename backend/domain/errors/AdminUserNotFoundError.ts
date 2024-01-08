import { CustomError } from '.';

class AdminUserNotFoundError extends CustomError {
  constructor(email: string) {
    super('ADMIN_USER_NOT_FOUND_ERROR', `${email} user is not found.`, 404);
  }
}

export default AdminUserNotFoundError;
