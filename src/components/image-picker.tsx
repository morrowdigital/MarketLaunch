import { Stack } from 'tamagui';
import { Camera } from '@tamagui/lucide-icons';
import { ChangeEvent } from 'react';
import Image from 'next/image';

type Props = {
  onImagePicked?: (image: string) => void;
  size?: number;
  imageUrl?: string;
};
export function ImagePicker({ onImagePicked, size = 60, imageUrl }: Props) {
  const selectImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImagePicked?.(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const hasImage = imageUrl !== undefined;

  return (
    <Stack
      backgroundColor="white"
      width={size}
      height={size}
      alignItems="center"
      justifyContent="center"
      borderRadius={size}
      borderColor="$faint"
      borderWidth={1}
      overflow="hidden"
    >
      {!hasImage && <Camera size={0.4 * size} color="rgba(0,0,0,0.25)" />}
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
