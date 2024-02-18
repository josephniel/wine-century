import axios from 'axios';

import config from './config';
import type Product from '../data/product';
import type ProductCategory from '../data/productCategory';

export const PRODUCT_LIST_LIMIT = 10;

export interface ProductList {
  products: Product[];
  hasMore: boolean;
}

export interface AddProductRequest {
  name: string;
  price: number;
  details: string;
  categoryID: number;
}

export const addProduct = async (
  token: string | null,
  product: AddProductRequest
): Promise<Product> => {
  if (token === null) {
    throw new Error('Token is required');
  }

  const response = await axios.post(`${config.backend_url}/admin/products`, product, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status !== axios.HttpStatusCode.Created) {
    throw new Error('Error creating product category data');
  }

  return response.data;
};

export const deleteProduct = async (token: string | null, id: number): Promise<void> => {
  if (token === null) {
    throw new Error('Token is required');
  }

  const response = await axios.delete(`${config.backend_url}/admin/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status !== axios.HttpStatusCode.NoContent) {
    throw new Error('Error deleting product category data');
  }
};

export const editProduct = async (token: string | null, product: Product): Promise<Product> => {
  const response = await axios.put(
    `${config.backend_url}/admin/products/${product.id}`,
    {
      name: product.name,
      price: product.price,
      details: product.details
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.status !== axios.HttpStatusCode.Ok) {
    throw new Error('Error editing product category data');
  }

  return response.data;
};

export const getProducts = async (
  token: string | null,
  categoryID: number,
  limit: number,
  offset: number
): Promise<ProductList> => {
  if (token === null) {
    throw new Error('Token is required');
  }

  const response = await axios.get(`${config.backend_url}/admin/products`, {
    params: {
      categoryID,
      limit,
      offset
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status !== axios.HttpStatusCode.Ok) {
    throw new Error('Error retrieving product data');
  }

  return response.data;
};

export interface ProductCategoryList {
  productCategories: ProductCategory[];
  hasMore: boolean;
}

export const addProductCategory = async (
  token: string | null,
  name: string
): Promise<ProductCategory> => {
  if (token === null) {
    throw new Error('Token is required');
  }

  const response = await axios.post(
    `${config.backend_url}/admin/products/categories`,
    {
      name
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.status !== axios.HttpStatusCode.Created) {
    throw new Error('Error creating product category data');
  }

  return response.data;
};

export const deleteProductCategory = async (token: string | null, id: number): Promise<void> => {
  if (token === null) {
    throw new Error('Token is required');
  }

  const response = await axios.delete(`${config.backend_url}/admin/products/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status !== axios.HttpStatusCode.NoContent) {
    throw new Error('Error deleting product category data');
  }
};

export const editProductCategory = async (
  token: string | null,
  id: number,
  name: string
): Promise<ProductCategory> => {
  if (token === null) {
    throw new Error('Token is required');
  }

  const response = await axios.put(
    `${config.backend_url}/admin/products/categories/${id}`,
    {
      name
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.status !== axios.HttpStatusCode.Ok) {
    throw new Error('Error editing product category data');
  }

  return response.data;
};

export const getProductCategories = async (token: string | null): Promise<ProductCategoryList> => {
  if (token === null) {
    throw new Error('Token is required');
  }

  const response = await axios.get(`${config.backend_url}/admin/products/categories`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status !== axios.HttpStatusCode.Ok) {
    throw new Error('Error retrieving product category data');
  }

  return response.data;
};
