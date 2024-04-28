import { CustomError } from '.';

class AuthorizationNotAllowedError extends CustomError {
  constructor() {
    super('AUTHORIZATION_NOT_ALLOWED_ERROR', `Request authorization is not allowed`, 403);
  }
}

export default AuthorizationNotAllowedError;
