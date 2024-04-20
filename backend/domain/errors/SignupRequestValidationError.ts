import { CustomError } from '.';

class SignupRequestValidationError extends CustomError {
  constructor(message: string) {
    super('SIGNUP_REQUEST_VALIDATION_ERROR', message, 409);
  }
}

export default SignupRequestValidationError;
