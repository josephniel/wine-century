import { CustomError } from '.';

class ProductNotFoundError extends CustomError {
  constructor(id: number) {
    super('PRODUCT_NOT_FOUND_ERROR', `Product ${id} is not found.`, 404);
  }
}

export default ProductNotFoundError;
