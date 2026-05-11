'use client';

import CircularGallery from './CircularGallery';

export const images = [
  '/photos/photo1.jpeg',
  '/photos/photo2.jpeg',
  '/photos/photo3.jpeg',
  '/photos/photo4.jpeg',
  '/photos/photo5.jpeg',
  '/photos/photo6.jpeg',
  '/photos/photo7.jpeg',
  '/photos/photo8.jpeg',
  '/photos/photo9.jpeg',
  '/photos/photo10.jpeg',
  '/photos/photo11.jpeg',
  '/photos/photo12.jpeg',
  '/photos/photo13.jpeg',
  '/photos/photo14.jpeg',
  '/photos/photo15.jpeg',
  '/photos/photo16.jpeg',
  '/photos/photo17.jpeg',
  '/photos/photo18.jpeg',
  '/photos/photo19.jpeg',
  '/photos/photo20.jpeg',
  '/photos/photo21.jpeg',
  '/photos/photo22.jpeg',
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