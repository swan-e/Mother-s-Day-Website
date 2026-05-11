'use client';

import CircularGallery from './CircularGallery';

export const images = [
  process.env.NEXT_PUBLIC_PHOTO_1!,
  process.env.NEXT_PUBLIC_PHOTO_2!,
  process.env.NEXT_PUBLIC_PHOTO_3!,
  process.env.NEXT_PUBLIC_PHOTO_4!,
  process.env.NEXT_PUBLIC_PHOTO_5!,
  process.env.NEXT_PUBLIC_PHOTO_6!,
  process.env.NEXT_PUBLIC_PHOTO_7!,
  process.env.NEXT_PUBLIC_PHOTO_8!,
  process.env.NEXT_PUBLIC_PHOTO_9!,
  process.env.NEXT_PUBLIC_PHOTO_10!,
  process.env.NEXT_PUBLIC_PHOTO_11!,
  process.env.NEXT_PUBLIC_PHOTO_12!,
  process.env.NEXT_PUBLIC_PHOTO_13!,
  process.env.NEXT_PUBLIC_PHOTO_14!,
  process.env.NEXT_PUBLIC_PHOTO_15!,
  process.env.NEXT_PUBLIC_PHOTO_16!,
  process.env.NEXT_PUBLIC_PHOTO_17!,
  process.env.NEXT_PUBLIC_PHOTO_18!,
  process.env.NEXT_PUBLIC_PHOTO_19!,
  process.env.NEXT_PUBLIC_PHOTO_20!,
  process.env.NEXT_PUBLIC_PHOTO_21!,
  process.env.NEXT_PUBLIC_PHOTO_22!,
];

export const preloadImages = () => {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

export default function GalleryCanvas() {
  return (
    // 420px crops the empty WebGL space above/below the photos
    <div
      className="relative w-full overflow-hidden"
      style={{ height: '420px', willChange: 'transform' }}
    >
      <CircularGallery />
    </div>
  );
}