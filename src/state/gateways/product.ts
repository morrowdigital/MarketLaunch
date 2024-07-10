import {
  ApiResponse,
  CreateProductResponse,
  DeleteProductResponse,
  FetchProductResponse,
  FetchProductsResponse,
  UpdateProductResponse,
} from '~/types/api.types';
import { UpdateProductInput } from '~/types/model';
import { ProductWithoutVariants } from '~/types/swell.types';

export type GetProductsInput = { page: number; limit?: number };

export async function getProducts({ page, limit }: GetProductsInput) {
  const apiUrl = `/api/products?page=${page}${limit ? '&limit=' + limit : ''}`;
  const result = await fetch(apiUrl);

  const body = await result.json();
  if (body.success) {
    return body as ApiResponse<FetchProductsResponse>;
  }

  throw new Error(body.message);
}

export async function deleteProduct({ productId }: ProductInput) {
  const apiUrl = `/api/products/${productId}`;
  const result = await fetch(apiUrl, { method: 'DELETE' });

  const body = await result.json();
  if (body.success) {
    return body as ApiResponse<DeleteProductResponse>;
  }

  throw new Error(body.message);
}

export async function updateProduct({ productId, input }: UpdateProductInput) {
  const apiUrl = `/api/products/${productId}`;
  const result = await fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(input),
  });

  const body = await result.json();
  if (body.success) {
    return body as ApiResponse<UpdateProductResponse>;
  }

  throw new Error(body.message);
}

export async function createProduct(input: Partial<ProductWithoutVariants>) {
  const apiUrl = `/api/products`;
  const result = await fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(input),
  });

  const body = await result.json();
  if (body.success) {
    return body as ApiResponse<CreateProductResponse>;
  }

  throw new Error(body.message);
}

export type ProductInput = { productId: string };

export async function getProduct({ productId }: ProductInput) {
  const apiUrl = `/api/products/${productId}`;
  const result = await fetch(apiUrl);

  const body = await result.json();
  return body as ApiResponse<FetchProductResponse>;
}

export type SearchProductsInput = {
  page: number;
  query?: string;
  limit?: number;
  statuses?: string[];
};

export async function searchProducts({ page, query, limit, statuses }: SearchProductsInput) {
  const limitParam = limit ? `&limit=${limit}` : '';
  const queryParam = query ? `&query=${query}` : '';
  const statusesParam = statuses ? `&statuses=${statuses.join(',')}` : '';
  const apiUrl = `/api/products/search?page=${page}${limitParam}${queryParam}${statusesParam}`;
  const result = await fetch(apiUrl);

  const body = await result.json();
  return body as ApiResponse<FetchProductsResponse>;
}
