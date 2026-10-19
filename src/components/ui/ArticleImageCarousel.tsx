'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface ArticleImageCarouselProps {
  images: string[];
  title: string;
}

export function ArticleImageCarousel({ images, title }: ArticleImageCarouselProps) {
  // Deduplicate and filter valid image URLs
  const validImages = Array.from(
    new Set((images || []).filter((img) => typeof img === 'string' && img.trim() !== ''))
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // If no images at all, return null
  if (validImages.length === 0) {
    return null;
  }

  const currentImage = validImages[currentIndex] || validImages[0];
  const hasMultiple = validImages.length > 1;

  const nextSlide = useCallback(() => {
    if (hasMultiple) {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }
  }, [hasMultiple, validImages.length]);

  const prevSlide = useCallback(() => {
    if (hasMultiple) {
      setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    }
  }, [hasMultiple, validImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!hasMultiple) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasMultiple, nextSlide, prevSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    // Swipe threshold of 50px
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full mb-12 space-y-3">
      {/* Main Slide Container */}
      <div
        className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-surface-container-lowest border border-surface-container-highest group select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ambient blurred glow matching active photo */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-35 scale-110 pointer-events-none transition-all duration-500"
          style={{ backgroundImage: `url(${currentImage})` }}
        />

        {/* Top Badges: Counter + Fullscreen HD */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2">
          {hasMultiple && (
            <span className="px-3 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md text-primary font-label-caps text-[10px] sm:text-[11px] uppercase font-bold tracking-wider border border-outline-variant/40 shadow-lg flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">photo_library</span>
              <span>
                {currentIndex + 1} / {validImages.length}
              </span>
            </span>
          )}
        </div>

        {/* Ver HD Button */}
        <a
          href={currentImage}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-surface-container-lowest/85 backdrop-blur-md hover:bg-primary hover:text-on-primary text-on-surface text-[10px] sm:text-[11px] font-label-caps uppercase tracking-wider border border-outline-variant/40 transition-all flex items-center gap-1.5 shadow-lg group/zoom"
          title="Ver imagen en tamaño completo HD"
        >
          <span className="material-symbols-outlined text-[14px] sm:text-[15px] group-hover/zoom:scale-110 transition-transform">
            zoom_in
          </span>
          <span className="hidden xs:inline font-bold">Ver HD</span>
        </a>

        {/* Main Image View */}
        <div className="relative z-10 w-full flex items-center justify-center p-2 sm:p-3 md:p-4 min-h-[260px] sm:min-h-[380px] md:min-h-[480px]">
          <img
            key={currentImage}
            src={currentImage}
            alt={`${title} - Foto ${currentIndex + 1}`}
            className="w-full h-auto max-h-[75vh] md:max-h-[640px] object-contain rounded-xl md:rounded-2xl shadow-xl transition-all duration-300 animate-fadeIn"
            loading="eager"
          />
        </div>

        {/* Navigation Arrows (Only if multiple photos) */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Foto anterior"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-container-lowest/75 backdrop-blur-md border border-outline-variant/40 text-on-surface hover:text-primary hover:border-primary/60 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-xl"
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">arrow_back_ios_new</span>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Foto siguiente"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-container-lowest/75 backdrop-blur-md border border-outline-variant/40 text-on-surface hover:text-primary hover:border-primary/60 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-xl"
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">arrow_forward_ios</span>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip (Only if multiple photos) */}
      {hasMultiple && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 px-1 hide-scrollbar">
          {validImages.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  isActive
                    ? 'border-primary ring-2 ring-primary/40 scale-105 shadow-md shadow-primary/20'
                    : 'border-surface-container-highest opacity-60 hover:opacity-100 hover:border-outline-variant'
                }`}
                title={`Ver foto ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Miniatura ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute bottom-0.5 right-1 text-[9px] font-bold text-white bg-black/60 px-1 rounded">
                  {idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
