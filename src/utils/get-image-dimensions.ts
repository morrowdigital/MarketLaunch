export async function getImageDimensions(imageSrc: string) {
  const image = new Image();
  image.src = imageSrc;

  await image.decode();

  return { width: image.width, height: image.height };
}
