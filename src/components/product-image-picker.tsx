import { Stack } from 'tamagui';
import { ChangeEvent } from 'react';
import Image from 'next/image';
import { AddImageIcon, AddImageSmallIcon } from './icons/icons';

type Props = {
  onImagePicked?: (image: string) => void;
  size?: number;
  imageUrl?: string;
  smallIcon?: boolean;
  backgroundColor?: string;
};
export function ProductImagePicker({
  onImagePicked,
  size = 100,
  imageUrl,
  smallIcon = false,
  backgroundColor = 'white',
}: Props) {
  const selectImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImagePicked?.(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const AddIcon = smallIcon ? <AddImageSmallIcon /> : <AddImageIcon scale={(0.8 * size) / 100} />;

  const hasImage = imageUrl !== undefined;

  return (
    <Stack
      backgroundColor={backgroundColor}
      width={size}
      height={size}
      alignItems="center"
      justifyContent="center"
      borderColor="$faint"
      overflow="hidden"
    >
      {!hasImage && AddIcon}
      {hasImage && (
        <Image
          src={imageUrl}
          width={size}
          height={size}
          alt="Profile or Logo image"
          style={{ objectFit: 'contain' }}
          priority
          sizes={`(max-width: ${size}px) ${size}px`}
        />
      )}
      <input
        width={24}
        type="file"
        id="image-picker"
        onChange={selectImage}
        accept="image/*"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'pointer',
        }}
      />
    </Stack>
  );
}
