import { CustomError } from '.';

class ProductCategoryAlreadyExistsError extends CustomError {
  constructor(name: string) {
    super('PRODUCT_CATEGORY_ALREADY_EXISTS_ERROR', `${name} is already registered.`, 409);
  }
}

export default ProductCategoryAlreadyExistsError;
