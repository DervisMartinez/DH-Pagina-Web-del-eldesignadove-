'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
  tag: string;
  category: string;
  title: string;
  subtitle?: string | null;
  slug?: string;
  link?: string | null;
}

export function HeroCarousel() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // Fetch published news from Supabase
        const res = await fetch('/api/noticias?status=published');
        const data = await res.json();

        if (data.noticias && data.noticias.length > 0) {
          // Priority to featured news first, then recent ones
          const featured = data.noticias.filter((n: any) => n.is_featured);
          const chosen = featured.length > 0 ? featured : data.noticias.slice(0, 5);

          const mapped: HeroSlide[] = chosen.map((item: any) => ({
            id: item.id,
            image: item.image_url,
            alt: item.title,
            tag: item.is_featured ? 'Noticia Destacada' : 'Cobertura Especial',
            category: item.category,
            title: item.title,
            subtitle: item.subtitle,
            slug: item.slug,
            link: item.external_link || `/noticias/${item.slug}`,
          }));

          setSlides(mapped);
          return;
        }

        // Fallback to static slides if no articles yet
        const fallbackRes = await fetch('/api/carousel');
        const fallbackData = await fallbackRes.json();
        setSlides(
          fallbackData.map((s: any) => ({
            id: s.id,
            image: s.image,
            alt: s.alt,
            tag: s.tag,
            category: 'Exclusiva LVBP',
            title: s.title,
            subtitle: s.description,
            link: '/noticias',
          }))
        );
      } catch (error) {
        console.error('Error fetching hero carousel slides:', error);
      }
    };

    fetchHeroData();
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
          <div className="relative w-full overflow-hidden bg-surface-container-lowest h-[560px] md:h-[680px] shadow-2xl animate-pulse" />
        </div>
      </section>
    );
  }

  const currentSlide = slides[currentIndex];

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
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end pt-20 p-6 pb-24 md:pb-16 md:p-14 max-w-4xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3.5 py-1 bg-primary text-on-primary rounded-full font-label-caps text-[10px] md:text-xs uppercase font-bold tracking-wider shadow-md">
                    {slide.tag}
                  </span>
                  <span className="px-3 py-1 bg-surface-container-highest/80 backdrop-blur-md rounded-full font-label-caps text-[10px] md:text-xs text-primary uppercase font-bold">
                    {slide.category}
                  </span>
                </div>

                <h1 className="font-display-lg text-[30px] sm:text-[42px] md:text-[56px] text-primary tracking-tight uppercase mb-3 leading-[1.05] line-clamp-3">
                  {slide.title}
                </h1>

                {slide.subtitle && (
                  <p className="font-body-lead text-secondary text-sm md:text-base max-w-2xl mb-6 line-clamp-2 hidden sm:block">
                    {slide.subtitle}
                  </p>
                )}

                {slide.link && (
                  <div>
                    <Link
                      href={slide.link}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label-caps uppercase text-xs font-bold tracking-wider hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                    >
                      <span>Leer Reportaje Completo</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Navigation Controls */}
          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 flex items-center gap-4 bg-surface-dim/80 backdrop-blur-xl px-5 py-3 rounded-full border border-surface-container-highest">
            <span className="font-stat-numeric text-stat-numeric text-primary tracking-wider font-bold">
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
