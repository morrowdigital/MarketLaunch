import { Account as SwellAccount } from 'swell-js';
import { Account, RecoverPasswordInput } from '~/types/model';
import { getSwellClient, swellClient } from '~/state/gateways/swell-client';
import {
  AccountExistsData,
  ApiResponse,
  BuyerCreateData,
  BuyerCreateResponse,
  VendorCreateData,
  VendorCreateResponse,
} from '~/types/api.types';
import { makeCamelCaseKeys } from '~/utils/case';
import { UpdateAccountSwellResponse } from '~/types/swell.types';

export async function getAccount() {
  const result = await swellClient.account.get();

  return makeCamelCaseKeys(result) as Account;
}

export async function login(email: string, password: string): Promise<Account> {
  let error = undefined;
  let result: SwellAccount | null = null;

  try {
    result = await swellClient.account.login(email, password);
    if (!result) {
      error = 'Invalid credentials';
    }
  } catch {
    error = 'Unknown Error';
  }

  if (error) {
    throw new Error(error);
  }

  return makeCamelCaseKeys(result) as Account;
}

export async function logout(): Promise<{ success: boolean }> {
  const result = await swellClient.account.logout();

  return result as { success: boolean };
}

export async function accountExists(data: AccountExistsData) {
  const result = await fetch(`/api/account-exists?email=${data.email}`);
  const body = (await result.json()) as ApiResponse<boolean>;
  if (body.success) {
    return body.data;
  }

  throw new Error(body.message);
}

export async function createBuyer(data: BuyerCreateData) {
  const result = await fetch('/api/buyer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const body = (await result.json()) as ApiResponse<BuyerCreateResponse>;

  if (body.success) {
    return body.data;
  }

  throw new Error(body.message);
}

export async function createVendor(data: VendorCreateData) {
  const result = await fetch('/api/vendor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const body = (await result.json()) as ApiResponse<VendorCreateResponse>;

  if (body.success) {
    return body.data;
  }

  throw new Error(body.message);
}

export async function updateAccount(data: Partial<Account>) {
  const result = await fetch('/api/account', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const body = (await result.json()) as ApiResponse<UpdateAccountSwellResponse>;

  if (body.success) {
    return body.data;
  }

  throw new Error(body.message);
}

export async function recoverPassword({
  email,
  resetUrl,
  password,
  resetKey,
}: RecoverPasswordInput) {
  const client = getSwellClient();
  const account = await client.account.recover({
    email,
    password,
    reset_key: resetKey,
    reset_url: resetUrl,
  });

  return account;
}
