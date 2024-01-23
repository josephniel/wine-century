import { CustomError } from '.';

class ProductAlreadyExistsError extends CustomError {
  constructor(name: string) {
    super('PRODUCT_ALREADY_EXISTS_ERROR', `${name} is already registered.`, 409);
  }
}

export default ProductAlreadyExistsError;
