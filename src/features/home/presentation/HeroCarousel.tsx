'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SLIDES = [
  {
    id: 1,
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1W4QOuzc0mheMZwkB82NuMHc78TaNVbgEqMPWmZqg7D154JZNLYwSxOlunphnMjYQxz5u4LZW4SAmn9PzHT8CfdMxLhElfUnwe4uOB3xW5GAMytJHM5b6j5iG4XS_oPmnUr4kbdtyDMGEPyOVU18icMNwe7uyuNyQ4hI0s3DdXEcbeeTnICbOEzZ-w41GE-qYKcwaMLbPcgFH_pFazhoXS9_KyHNENtnjq6SU56YjDD-NC5xf7Qax9W',
    alt: 'Bateador profesional en pleno contacto visual',
    tag: 'Fotografía de Autor • Captura Nocturna',
    tech: '35mm • 1/2000s • ISO 1200',
    title: 'Impacto en el Plato',
    description:
      'Obra fotográfica que captura la disipación cinética y la nube de arcilla roja en el instante exacto del impacto ante los reflectores de estadio.',
  },
  {
    id: 2,
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1VByaByp-pdQCzwTtNxI7g-9z0GwqN_SAoQ-h4NDjSxd5M-bczInuDAyhProBpQ-OTN6dgAbN3SGqOBOwQJm-Ak-fZvD2nuadR6nD5eXusd7QKqTYl0j2j0uLQg0dtWFOtEosLHkGFTR3ilVf4uPMhNeshd6RjtHavHwex8AviAr_kut7vD9Z-m4fnlezABzJr_ISFvrIwkx8g_ktuGrr1OscuDAcuPgW6gmvvzCNTqEvAO3GkD7uy22Q',
    alt: 'Lanzador zurdo en plena extensión de lanzamiento nocturno',
    tag: 'Fotografía de Autor • Enfoque Rápido',
    tech: '70-200mm f/2.8 • 1/3200s • ISO 800',
    title: 'Extensión en la Loma',
    description:
      'Estudio visual de biomecánica atlética y tensión gestual en el instante de liberación del pitcheo bajo iluminación de diamante.',
  },
  {
    id: 3,
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1XyAMZ6qxVa8mXjg-ioa9Txnis0oozftJFbAz_I7C5uTD3I9a9gBxYnloE7NMvJDdfSE1qou8x3Nzb8-kKLHr0T5oR0xrL_wrKUan-zdxbJ1-NOjO9v43L-KPOmBg3OosG1XtveqGFc3b-z9aBdDVGQQIdRolvAOOgu5yAa5mMagmCJVUdEtmuCwBzBm3fPF1y8rXPcsqB0jJWn0fWL68cVzIHsZTGGImQFGrDkCZhe-VeCeZ0c6BvJ2g',
    alt: 'Guante de cuero gastado y pelota en dugout',
    tag: 'Bodegón Deportivo • Luz Natural',
    tech: '50mm f/1.8 • 1/500s • ISO 200',
    title: 'Nostalgia de Banco',
    description:
      'Primer plano con profundidad de campo reducida que inmortaliza el cuero gastado, las vetas de madera rústica y el silencio previo al juego.',
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="w-full relative">
      <div className="w-full">
        <div className="relative w-full overflow-hidden bg-surface-container-lowest h-[560px] md:h-[680px] shadow-2xl">
          {SLIDES.map((slide, index) => (
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
              <div className="absolute inset-0 flex flex-col justify-end pt-20 p-6 md:p-14 max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-surface-container-highest/80 backdrop-blur-md rounded-full font-label-caps text-label-caps text-primary uppercase">
                    {slide.tag}
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary font-medium">
                    {slide.tech}
                  </span>
                </div>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight uppercase mb-4 leading-none">
                  {slide.title}
                </h1>
                <p className="font-body-lead text-body-md md:text-body-lead text-secondary max-w-xl mb-8 line-clamp-3 md:line-clamp-none">
                  {slide.description}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="#articulos"
                    className="px-6 py-3 bg-primary text-on-primary font-label-caps text-label-caps uppercase rounded-lg hover:bg-secondary-fixed transition-colors flex items-center gap-2"
                  >
                    <span>Ver Fotografía en Alta</span>
                    <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                  </Link>
                  <Link
                    href="#articulos"
                    className="px-6 py-3 bg-surface-container-high/80 backdrop-blur-md text-on-surface font-label-caps text-label-caps uppercase rounded-lg hover:bg-surface-container-highest transition-colors flex items-center gap-2"
                  >
                    <span>Ficha Técnica</span>
                    <span className="material-symbols-outlined text-[16px]">info</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 flex items-center gap-4 bg-surface-dim/80 backdrop-blur-xl px-5 py-3 rounded-full">
            <span className="font-stat-numeric text-stat-numeric text-primary tracking-wider">
              {String(currentIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
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
