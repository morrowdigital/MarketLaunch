import { Image } from 'swell-js';

export function imageHeightScaleFactor(image?: Image) {
  let scaleFactor: number = 1;

  if (image?.file?.width && image!.file!.height!) {
    scaleFactor = image.file!.width! / image.file!.height!;
  }

  return scaleFactor;
}
