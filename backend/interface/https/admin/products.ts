export interface CreateProductRequest {
  name: string;
  price: number;
  details: string;
}

export interface CreateProductResponse {
  id: number;
  name: string;
  price: number;
  details: string;
  createdAt: string;
  updatedAt: string;
}
