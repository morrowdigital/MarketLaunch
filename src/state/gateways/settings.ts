import { ApiResponse, FetchSettingsResponse } from '~/types/api.types';

type GetSettingsInput = {
  page: number;
  limit: number;
};

export async function getSettings({ page, limit }: GetSettingsInput) {
  const limitParam = limit ? `&limit=${limit}` : '';
  const result = await fetch(`/api/settings?page=${page}${limitParam}`);

  const body = await result.json();
  return body as ApiResponse<FetchSettingsResponse>;
}
