import { CustomError } from '.';

class AdminUserAlreadyExistsError extends CustomError {
  constructor(email: string) {
    super('ADMIN_USER_ALREADY_EXISTS_ERROR', `${email} is already registered.`, 409);
  }
}

export default AdminUserAlreadyExistsError;
