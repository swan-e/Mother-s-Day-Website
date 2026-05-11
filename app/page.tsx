'use client';

import { useEffect, useState } from 'react';
import GalleryCanvas, { preloadImages } from '@/components/GalleryCanvas';
import SplitText from "@/components/SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};


export default function Home() {
  const [password, setPassword] = useState('');

  const correctPassword =
    process.env.NEXT_PUBLIC_GALLERY_PASSWORD || '';

  useEffect(() => {
    preloadImages();
  }, []);

  const [mode, setMode] = useState<'locked' | 'owner' | 'guest'>('locked');

  const handleOpen = () => {
    if (password === correctPassword) {
      setMode('owner');
    } else if (password === process.env.NEXT_PUBLIC_GUEST_PASSWORD) {
      setMode('guest');
    } else {
      alert('Incorrect password');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleOpen();
  };

  if (mode === 'locked') {
    return (
      <main className="min-h-screen bg-navy-swirl flex items-center justify-center text-white px-6">
        <div className="text-center max-w-xl flex flex-col items-center">

          <p className="text-5xl mb-6">🌸</p>

          <h1 className="text-5xl font-bold mb-3">Happy Mother's Day</h1>
          <p className="font-semibold mb-8 text-gray-300" style={{ fontSize: '2rem' }}>엄마 사랑해요</p>

          <div
            className="rounded-2xl flex flex-col items-center"
            style={{ backgroundColor: '#ede8df', padding: '2.5rem', width: '360px', gap: '1.25rem' }}
          >
            <p className="text-[#081B3A] text-base leading-7">
              This gallery was made just for you. Enter the password to open your gift 💙
            </p>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter password..."
              className="w-full rounded-xl outline-none text-center text-[#081B3A]"
              style={{ padding: '0.75rem 1rem', fontSize: '1rem' }}
            />

            <button
              onClick={handleOpen}
              onMouseEnter={preloadImages}
              className="w-full rounded-full font-semibold hover:scale-105 transition"
              style={{ padding: '0.75rem 1rem', fontSize: '1rem', backgroundColor: '#1e3a5f', color: 'white' }}
            >
              Open Your Gift 🎁
            </button>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="text-white">
      {/* TOP SECTION */}
      <section className="bg-navy-swirl min-h-[55vh] flex flex-col justify-center items-center px-6">
        <div className="max-w-5xl text-center">
          <h1 className="font-bold" style={{ fontSize: '7rem', marginTop: '3rem', marginBottom: '1.5rem' }}>
            {mode === 'owner' ? 'I love you' : 'Welcome!'}
          </h1>
          <div
            className="mx-auto rounded-2xl bg-[#ede8df] text-center"
            style={{ width: '400px', paddingTop: '28px', paddingBottom: '28px', paddingLeft: '52px', paddingRight: '52px', marginBottom: '52px' }}
          >
            <p className="text-[#081B3A]" style={{ fontSize: '1.45rem', lineHeight: '2.2rem' }}>
              {mode === 'owner'
                ? <>The color <strong>Navy Blue</strong> was chosen for this website because it represents your stability, confidence, and importance. I hope you can continue to shine Navy Blue this Mother's Day season onwards!</>
                : <>This is a demo of a handmade Mother's Day gift gallery built with Next.js, WebGL, and GSAP. The real version is private — these are sample photos to showcase the experience.</>
              }
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="bg-[#ede8df]">
        <GalleryCanvas mode={mode as 'owner' | 'guest'} />
      </section>

      {/* BOTTOM SECTION */}
      <section className="bg-navy-swirl min-h-[55vh] flex flex-col justify-center items-center px-6">
        <div className="max-w-5xl text-center mx-auto" style={{ paddingLeft: '8rem', paddingRight: '8rem' }}>
          <h2 className="text-4xl font-bold mb-4">
            {mode === 'owner' ? 'Thank You For Every Memory' : 'Thanks for Checking It Out!'}
          </h2>
          <p className="text-gray-300 leading-9" style={{ fontSize: '1.35rem' }}>
            {mode === 'owner'
              ? 'Thank you for taking care of our family! I always appreciate your love and support. I know I can always rely on you when things get tough and that is what makes you such an amazing mother. I hope you enjoy this handmade present website from your software engineering son.'
              : 'This project is open source feel free to fork it and make your own version for someone you love. Check out the README for setup instructions.'
            }
          </p>
          <a href="https://github.com/swan-e" className="pr-5">
            <img src="/github.svg" alt="github" width={50} height={50} />
          </a>
          <a href="https://github.com/swan-e/Mother-s-Day-Website" className="pr-5">
            <img src="/file.svg" alt="github" width={50} height={50} />
          </a>
        </div>
      </section>
    </main>
  );
}