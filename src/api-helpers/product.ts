import { getSwellClient } from './swell-node';
import {
  CreateProductSwellResponse,
  DeleteProductSwellResponse,
  FetchProductSwellResponse,
  FetchProductsSwellResponse,
  UpdateProductSwellResponse,
  ProductWithoutVariants,
} from '~/types/swell.types';
import { appConfig } from '~/app-config/app-config';

type ProductInput = {
  productId: string;
};

export async function getProduct({ productId }: ProductInput) {
  const client = getSwellClient();

  let response: FetchProductSwellResponse;

  try {
    response = await client.get(`/products/${productId}`, {
      expand: ['variants', 'variants.optionValueIds'],
    });
  } finally {
    client.close();
  }

  return response as FetchProductSwellResponse;
}

type GetProductsInput = {
  page: number;
  limit: number;
  accountId: string;
};

export async function getProducts({ page, limit, accountId }: GetProductsInput) {
  const client = getSwellClient();

  let response: FetchProductsSwellResponse;
  try {
    response = await client.get('/products', {
      page,
      expand: ['variants'],
      limit: limit || appConfig.productsPaginationLimit,
      where: {
        vendor_id: accountId,
      },
    });
  } finally {
    client.close();
  }

  return response;
}

export async function createProduct(input: Partial<ProductWithoutVariants>) {
  const client = getSwellClient();
  let response: CreateProductSwellResponse;
  try {
    response = await client.post('/products', input);
  } finally {
    client.close();
  }

  return response;
}

export async function deleteProduct({ productId }: ProductInput) {
  const client = getSwellClient();

  let response: DeleteProductSwellResponse;
  try {
    response = await client.delete(`/products/${productId}`, {});
  } finally {
    client.close();
  }
  return response as DeleteProductSwellResponse;
}

export async function updateProduct({
  productId,
  input,
}: ProductInput & { input: Partial<ProductWithoutVariants> }) {
  const client = getSwellClient();

  let response: UpdateProductSwellResponse;
  try {
    response = await client.put(`/products/${productId}`, { $set: input });
  } finally {
    client.close();
  }
  return response;
}
