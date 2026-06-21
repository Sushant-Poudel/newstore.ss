'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImageLightbox({ src, alt, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-950/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image zoom"
    >
      <button
        onClick={onClose}
        aria-label="Close zoom"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center text-white/60 transition-colors hover:text-white"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        className="relative max-h-[90vh] max-w-[90vw] aspect-[3/4] w-full sm:w-auto sm:h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="90vw"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
