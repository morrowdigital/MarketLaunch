import { parseBase64DataUrl } from '~/utils/base64';
import { ApiResponse, FileUploadData } from '~/types/api.types';
import { FileCreateSwellResponse } from '~/types/swell.types';

export async function uploadFile(fileUrlBase64: string): Promise<FileCreateSwellResponse> {
  const { mimeType, base64 } = parseBase64DataUrl(fileUrlBase64)!;
  const contentType = mimeType.split(':')[1]!;

  const uploadBody: FileUploadData = {
    contentType,
    base64Data: base64,
  };

  const result = await fetch('/api/files', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uploadBody),
  });

  const body = (await result.json()) as ApiResponse<FileCreateSwellResponse>;

  if (body.success) {
    return body.data;
  }

  throw new Error(body.message);
}
