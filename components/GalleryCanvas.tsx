'use client';

import CircularGallery from './CircularGallery';
const MAX_PHOTOS = 50;

const guestImages = [
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475319/cld-sample-2.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475319/samples/paper.png',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475316/samples/cup-on-a-table.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475317/samples/dessert-on-a-plate.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475316/samples/coffee.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475316/samples/chair.png',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475315/samples/man-on-a-escalator.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475313/samples/breakfast.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475311/samples/balloons.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475310/samples/shoe.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475306/samples/food/spices.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475306/samples/ecommerce/accessories-bag.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475306/samples/ecommerce/leather-bag-gray.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475306/samples/ecommerce/car-interior-design.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475305/samples/landscapes/beach-boat.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475303/samples/sheep.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475302/samples/food/pot-mussels.jpg',
  'https://res.cloudinary.com/dxlbpjptn/image/upload/v1778475302/samples/food/fish-vegetables.jpg'
];

// const ownerImages = Array.from({ length: MAX_PHOTOS }, (_, i) => 
//   process.env[`NEXT_PUBLIC_PHOTO_${i + 1}`]
// ).filter(Boolean) as string[];
const ownerImages = (process.env.NEXT_PUBLIC_PHOTOS || '').split(',').filter(Boolean);

export const preloadImages = () => {
  [...ownerImages, ...guestImages].forEach((src) => {
    if (!src) return;
    const img = new Image();
    img.src = src;
  });
};

export default function GalleryCanvas({ mode }: { mode: 'owner' | 'guest' }) {
  const images = mode === 'owner' ? ownerImages : guestImages;

  return (
    // 420px crops the empty WebGL space above/below the photos
    <div
      className="relative w-full overflow-hidden"
      style={{ height: '420px', willChange: 'transform' }}
    >
      <CircularGallery images={images}/>
    </div>
  );
}