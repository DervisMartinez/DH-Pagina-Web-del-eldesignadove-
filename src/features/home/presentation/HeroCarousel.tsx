'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  id: number;
  image: string;
  alt: string;
  tag: string;
  tech: string;
  title: string;
  description: string;
}

export function HeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/api/carousel');
        const data = await response.json();
        setSlides(data);
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };
    fetchSlides();
  }, []);

  const nextSlide = useCallback(() => {
    if (slides.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }
  }, [slides.length]);

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(nextSlide, 7000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, slides.length]);

  if (slides.length === 0) {
    return (
      <section className="w-full relative">
        <div className="w-full">
          <div className="relative w-full overflow-hidden bg-surface-container-lowest h-[560px] md:h-[680px] shadow-2xl animate-pulse">
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full relative">
      <div className="w-full">
        <div className="relative w-full overflow-hidden bg-surface-container-lowest h-[560px] md:h-[680px] shadow-2xl">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              <Image
                alt={slide.alt}
                src={slide.image}
                fill
                priority={index === 0}
                className="object-cover object-center"
                unoptimized // Since these are external Google URLs
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end pt-20 p-6 pb-24 md:pb-14 md:p-14 max-w-3xl">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 mb-4">
                  <span className="px-3 py-1 bg-surface-container-highest/80 backdrop-blur-md rounded-full font-label-caps text-[10px] md:text-label-caps text-primary uppercase">
                    {slide.tag}
                  </span>
                  <span className="font-body-sm text-[11px] md:text-body-sm text-secondary font-medium">
                    {slide.tech}
                  </span>
                </div>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight uppercase mb-4 md:mb-8 leading-none">
                  {slide.title}
                </h1>
                {/* Botones removidos momentáneamente según solicitud */}
              </div>
            </div>
          ))}

          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 flex items-center gap-4 bg-surface-dim/80 backdrop-blur-xl px-5 py-3 rounded-full">
            <span className="font-stat-numeric text-stat-numeric text-primary tracking-wider">
              {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <div className="h-4 w-[1px] bg-outline-variant" />
            <div className="flex items-center gap-2">
              <button
                aria-label="Anterior"
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                aria-label="Siguiente"
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
