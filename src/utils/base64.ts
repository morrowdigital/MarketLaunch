export function parseBase64DataUrl(dataUrl: string) {
  const [mimeType, base64] = dataUrl.split(';base64,');
  if (mimeType === undefined || base64 === undefined) {
    return;
  }

  return { mimeType, base64 };
}

export function isBase64EncodedImage(url: string | undefined): boolean {
  if (!url) return false;
  try {
    // Remove any data URI prefix if present
    const encodedData = url.replace(/^data:[^;]+;base64,/, '');

    // Decoding the base64 string
    const decodedData = atob(encodedData);

    // Re-encoding the decoded data and comparing with the original encoded data
    const reEncodedData = btoa(decodedData);

    return reEncodedData === encodedData;
  } catch (error) {
    return false; // If an error occurs during decoding, it's not base64 encoded
  }
}
