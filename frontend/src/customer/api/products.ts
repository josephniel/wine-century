import axios from 'axios';

import type ProductCategory from '../data/productCategory';
import config from './config';

export interface ProductCategoryList {
  productCategories: ProductCategory[];
  hasMore: boolean;
}

export const getProductCategories = async (): Promise<ProductCategoryList> => {
  const response = await axios.get(`${config.backend_url}/public/products/categories`);

  if (response.status !== axios.HttpStatusCode.Ok) {
    throw new Error('Error retrieving product category data');
  }

  return response.data;
};
