import { CustomError } from '.';

class ProductCategoryNotFoundError extends CustomError {
  constructor(id: number) {
    super('PRODUCT_CATEGORY_NOT_FOUND_ERROR', `Product category ${id} is not found.`, 404);
  }
}

export default ProductCategoryNotFoundError;
