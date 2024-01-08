import { CustomError } from '.';

class AuthorizationInvalidError extends CustomError {
  constructor() {
    super('AUTHORIZATION_INVALID_ERROR', `Request authorization is required`, 401);
  }
}

export default AuthorizationInvalidError;
