import { NextApiRequest, NextApiResponse } from 'next';
import {
  AccountContentSnake,
  AccountExistsData,
  ApiResponse,
  FetchAccountsResponse,
  Group,
} from '~/types/api.types';
import { getSwellClient } from '~/api-helpers/swell-node';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';
import { FetchAccountSwellResponse, UpdateAccountSwellResponse } from '~/types/swell.types';
import { Account } from 'swell-js';

export function handler<T>(group: Group) {
  return async function (req: NextApiRequest, res: NextApiResponse<ApiResponse<T>>) {
    const requestData = { ...req.body, group };
    const client = getSwellClient();

    let response: T;
    try {
      response = await client.post('/accounts', requestData);
    } finally {
      client.close();
    }

    if (checkAndHandleErrors<T>(response, res)) {
      return;
    }

    res.status(200).send({ success: true, data: response as T });
  };
}

type AccountInput = {
  accountId: string;
};

export async function getAccount({ accountId }: AccountInput) {
  const client = getSwellClient();

  let response: FetchAccountSwellResponse;
  try {
    response = await client.get(`/accounts/${accountId}`, {});
  } finally {
    client.close();
  }

  return response as FetchAccountSwellResponse;
}

export async function accountExists({ email }: AccountExistsData) {
  const client = getSwellClient();

  let response: FetchAccountsResponse;
  try {
    response = await client.get(`/accounts`, {
      email,
    });
  } finally {
    client.close();
  }

  return response.results.length > 0;
}

export async function updateAccount(input: {
  accountId: string;
  data: Partial<Account> & { content: Partial<AccountContentSnake> };
}) {
  const client = getSwellClient();

  let response: UpdateAccountSwellResponse;
  try {
    response = await client.put(`/accounts/${input.accountId}`, input.data);
  } finally {
    client.close();
  }

  return response as UpdateAccountSwellResponse;
}
