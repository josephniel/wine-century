import { CustomError } from '.';

class AuthorizationRequiredError extends CustomError {
  constructor() {
    super('AUTHORIZATION_REQUIRED_ERROR', `Request authorization is required`, 401);
  }
}

export default AuthorizationRequiredError;
