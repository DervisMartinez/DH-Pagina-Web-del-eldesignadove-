'use client';

import { useState } from 'react';
import Image from 'next/image';

const PHOTOS = [
  {
    id: 1,
    title: 'Contacto Puro: La Torsión del Poder',
    desc: 'Secuencia fotográfica capturada en el cenit del swing. Detalle milimétrico del punto de impacto y la pulverización del polvo en el home plate.',
    category: 'accion',
    badge: 'Placa 01 / MLB',
    catName: 'Acción en Terreno',
    location: 'Comerica Park • Postemporada',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBtW0RadkrwpBaMneR7WILtr7s83d0klDImPwI_o4GOjP_nLIA98DXGx_OecgK_ubwjOQw_2o0HaxQUF0cVdYBHVzfuUf5p055-mUp2Wwuqd9KyQLyFPoWkCeDTisVRBajJMUGJwcZ4Pd9k3BFE_Nh32eOruXJbhQAT_jG8nYxuKx5na4tb_OCq_SVDyVdvaAUdnIZZlO2KDj0BlFuOQlljADBVqjfQYHBMbewZbrpp5CUeMiD_rA4',
    alt: 'Dynamic wide-angle baseball sports action photograph',
    isLarge: true,
  },
  {
    id: 2,
    title: 'Duelo en la Colchoneta',
    desc: 'Deslizamiento agresivo y barrida con espigas arriba. Sol directo de media tarde sobre el diamante caribeño.',
    category: 'internacional',
    badge: 'Placa 02 / Caribe',
    catName: 'Serie Internacional',
    location: 'Serie de las Américas',
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1VI7tsszwkqOyJwUO82PgW5uQH8KhgFNv9MPx-0Hqw9ZWGTOiJu0mq48btqze8KBxsIu0FReel_evM7uSLB3BI5kAqCLysgPoXsUD0G2t_I47IBbKDWx-J7ulyMShGzY-vG6Xtr4t3dXuxiCCkbVBhI4F_Ldl6HX75_iu1UQ2BYwrS-m8s5iNWsWbxz5kqcHK6vDi2h1SWzCtezbDyli_RNNsAJRbN8EJFp_G_TRhvBIh56w2fMmPymaA',
    alt: 'Jugada cerrada a pleno sol tropical en la segunda base',
    isLarge: false,
  },
  {
    id: 3,
    title: 'Fervor en la Loma',
    desc: 'Tensión condensada antes del lanzamiento de salvamento en juego de muerte súbita.',
    category: 'internacional',
    badge: 'Placa 03 / WBC',
    catName: 'Torneo Mayor',
    location: 'Miami, Florida',
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1WN54mXWcbM4x4W0kPoQfOeCd2fI7sND7lLJUvXeG3OdkpJ7HiEXEm9hJRpfjAZfVpesEKBrKMCDIZOdMPFs4mW1nFk29mF5J5BIw4x0hBo38aiqbmtAkMbeZECVYY0Oz7mmAMwH4rswnX4yhGKhOe42tLFw1s8G3iQ_gPcm_PKOw7z5rWuE9a8eCYfA6ku4bh6H6KOsLwSAlofBPKjC2L_zO-uD3tAwgUc1r15Sw9NUlFUHgRH9ycVnw',
    alt: 'Atmósfera eléctrica del World Baseball Classic',
    isLarge: false,
  },
  {
    id: 4,
    title: 'Vuelo sobre la Intermedia',
    desc: 'La suspensión aerodinámica del infielder evitando el contacto del corredor para sellar el out 27. Geometría corporal en estado puro.',
    category: 'accion',
    badge: 'Placa 04 / Defensiva',
    catName: 'Defensiva de Élite',
    location: 'Kansas City • Temporada Regular',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAz7EdPJitccXIUBs72yEOA12e1hOmQy-z5Lrl6VBzN8VDFZsgGYCJrpeOLD79-xiM2DQpxVEpUkagbWwiqikYmGuqVDym9qWIPYybvPBys0sN-Vd8pjIC5djsdY1RDnJs5EWwLv2zW42TPx7P5GN-y4pfUz9Kn4DavqqLwZq8R-Ymk8mFN96DDnGpZ-FSFeq63VprV1SJoTlUBetukbRJFNv2EYtbuviyGzUKbNjtvhhDPert9_FY',
    alt: 'High-speed baseball action photo',
    isLarge: true,
  },
  {
    id: 5,
    title: 'Piel de Guante & Ceniza',
    desc: 'Texturas táctiles y micro-relieves de las herramientas sagradas del oficio.',
    category: 'detalles',
    badge: 'Placa 05 / Bodegón',
    catName: 'Detalles de Indumentaria',
    location: 'Estudio de Campo',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBI9oce088PstacyePhU2lfEJotx2OQi1dJ3tkeSAxAh85R-LjPWx9Rg4unHdxeJpFE-5DboKx7JjlsjXxlA3r71YQ63KLnLIsZ6gmlMtr-EFmI4p1wLJPok2QnYj0-sXWoPU5V3T01A5WjmSJ7sQNb_44EBDkwmPTu-8RK5vQHUPqZVCYEBhgcU-ZwIRZCejSMQkdmFUtJZ59f9EYSpG8N2d9uGlbZB819pOPztvrnigmtBccJW64',
    alt: 'Editorial still-life photograph of a vintage worn leather baseball glove',
    isLarge: false,
  },
  {
    id: 6,
    title: 'Marea Invernal',
    desc: '40,000 gargantas y tambores bajo la cúpula del Monumental. El pulso del fanático latino.',
    category: 'internacional',
    badge: 'Placa 06 / Caribe',
    catName: 'Atmósfera & Estadios',
    location: 'Caracas • Serie del Caribe',
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1UOgwgv3isF8JAG6qoesJhYevZoLH04dg6O3vSL3mk4DZ7Ppv5f0gZFVEIQX-D0bci7OB5VBOLeKYOWBpNbOgoA7jZlPBx1yZC4G_L7FcFxvatB8C6r0oriyf-RYZSMCitK9TVkoIrPd5_Q022h4ewCpmgGxOie2vgQywffRJEXs_2UI8RGAgPQsL_akGqlc-4KoCGVk-sasDKwST5_uuicKosbRT__pGVmtMx3DLaDZotOVcaajcd5',
    alt: 'Graderías encendidas y bengalas de entusiasmo en la Serie del Caribe',
    isLarge: false,
  },
  {
    id: 7,
    title: 'La Mirada del As',
    desc: 'El ritual silencioso de la respiración profunda antes de atacar la zona baja del bateador.',
    category: 'retratos',
    badge: 'Placa 07 / Loma',
    catName: 'Retratos & Loma',
    location: 'Filadelfia • Octubre',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAB-drcwmdbdZrhPDOoJ8RR-LS98jzZ4M54_EiSjsDvWZ6_D6bZpS5IEzbpME1HShIhYEB1SHZI3Q9Ln4mup-DpQpCmDxibe-UMBErTYz3z8ji5xZo_77UDiRqP7UbOgxrrih-c-JV7yJDEFGUDQLUhopNPHWYYozEDnwYAG0WNFlc7GSYcSuVCPH3PfSfczrVAE6jY4Lt5kQf-lJ1JnBNOmF8_mYPFBuL4hmOFM3ONHrq9peVyHRQ',
    alt: 'Crisp professional sports portrait action photo',
    isLarge: false,
  },
];

const FILTERS = [
  { id: 'all', label: 'Todas las Series' },
  { id: 'accion', label: 'Acción en Terreno' },
  { id: 'retratos', label: 'Retratos & Dugout' },
  { id: 'detalles', label: 'Detalles & Madera' },
  { id: 'internacional', label: 'Series Internacionales' },
];

export function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof PHOTOS)[0] | null>(null);

  const filteredPhotos = PHOTOS.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  return (
    <>
      {/* Navigation & Filters Bar (moved from Masthead to be sticky/part of Grid) */}
      <div className="bg-surface-dim border-b border-surface-container-highest/60 sticky top-20 z-40">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-full font-label-caps text-[10px] md:text-label-caps uppercase tracking-wider transition-all duration-200 ${
                  activeFilter === f.id
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-highest text-secondary hover:text-primary'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-label-caps text-[11px] uppercase text-outline hidden sm:inline">
              Vista de Sala:
            </span>
            <div className="inline-flex rounded-lg bg-surface-container-low p-1 border border-surface-container-highest">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1.5 rounded flex items-center transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-surface-container-highest text-primary'
                    : 'text-outline hover:text-primary'
                }`}
                title="Cuadrícula Editorial"
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('large')}
                className={`px-2.5 py-1.5 rounded flex items-center transition-colors ${
                  viewMode === 'large'
                    ? 'bg-surface-container-highest text-primary'
                    : 'text-outline hover:text-primary'
                }`}
                title="Monolito Gran Formato"
              >
                <span className="material-symbols-outlined text-[18px]">view_agenda</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="w-full py-12 md:py-16 bg-background min-h-[60vh]">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 transition-all duration-300">
            {filteredPhotos.map((photo) => {
              const colSpanClass =
                viewMode === 'large'
                  ? 'md:col-span-12'
                  : photo.isLarge
                    ? 'md:col-span-8'
                    : 'md:col-span-4';
              const aspectClass =
                viewMode === 'large'
                  ? 'aspect-[16/9]'
                  : photo.isLarge
                    ? 'aspect-[16/10]'
                    : 'aspect-[4/3] md:aspect-[3/4]';

              return (
                <article
                  key={photo.id}
                  className={`group bg-surface-container-low rounded-xl overflow-hidden border border-surface-container-highest hover:border-outline transition-all duration-300 flex flex-col justify-between ${colSpanClass}`}
                >
                  <div
                    className={`relative w-full ${aspectClass} bg-surface-container-lowest overflow-hidden cursor-pointer`}
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <Image
                      src={photo.image}
                      alt={photo.alt}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-black/20 opacity-70 group-hover:opacity-50 transition-opacity" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-surface-dim/80 backdrop-blur-md border border-white/10 font-label-caps text-[10px] md:text-label-caps uppercase text-primary">
                        {photo.badge}
                      </span>
                    </div>

                    <button
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-dim/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary hover:text-on-primary"
                      type="button"
                      aria-label="Ampliar imagen"
                    >
                      <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                    </button>

                    {photo.isLarge && (
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-on-surface">
                        <span className="font-label-caps text-[10px] uppercase tracking-wider text-secondary flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-outline" /> Archivo Nativo
                        </span>
                        <span className="font-label-caps text-[10px] uppercase tracking-widest text-primary hidden sm:inline">
                          Detalle 1:1
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 md:p-7 flex flex-col justify-between gap-4 bg-surface-container-low h-full">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-[10px] md:text-label-caps uppercase text-outline">
                          {photo.catName}
                        </span>
                      </div>
                      <h2 className="font-headline-sm md:font-headline-md text-[20px] md:text-headline-md text-primary font-bold tracking-tight">
                        {photo.title}
                      </h2>
                      <p className="font-body-sm text-[12px] md:text-body-sm text-on-surface-variant line-clamp-2 md:line-clamp-3">
                        {photo.desc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-surface-container-highest/60 flex items-center justify-between">
                      <span className="font-body-sm text-[12px] md:text-body-sm text-secondary font-medium truncate pr-2">
                        {photo.location}
                      </span>
                      <button
                        className="inline-flex shrink-0 items-center gap-1 font-label-caps text-[10px] md:text-label-caps uppercase tracking-wider text-primary hover:text-secondary-fixed transition-colors"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        Ver Detalles{' '}
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 transition-opacity duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-surface-container-low border border-surface-container-highest rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container-highest/80 bg-surface-container">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-label-caps text-[10px] md:text-label-caps uppercase tracking-widest text-primary">
                  Inspección de Archivo • Alta Resolución
                </span>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-surface-container-highest hover:bg-surface-bright text-primary flex items-center justify-center transition-colors"
                onClick={() => setSelectedPhoto(null)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="overflow-y-auto p-6 md:p-8 space-y-6">
              <div className="relative w-full min-h-[300px] md:min-h-[500px] bg-surface-container-lowest rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                <div className="md:col-span-8 space-y-2">
                  <h3 className="font-headline-lg text-[24px] md:text-headline-lg text-primary font-bold">
                    {selectedPhoto.title}
                  </h3>
                  <p className="font-body-lead text-body-md md:text-body-lead text-secondary">
                    {selectedPhoto.desc}
                  </p>
                </div>
                <div className="md:col-span-4 p-5 rounded-xl bg-surface-container border border-surface-container-highest/60 space-y-3">
                  <span className="font-label-caps text-[11px] uppercase text-outline tracking-wider block border-b border-surface-container-highest/60 pb-2">
                    Detalles de la Obra
                  </span>
                  <div className="space-y-2">
                    <div className="flex justify-between font-body-sm text-[12px] md:text-body-sm">
                      <span className="text-on-surface-variant">Colección:</span>
                      <span className="text-primary font-medium">{selectedPhoto.catName}</span>
                    </div>
                    <div className="flex justify-between font-body-sm text-[12px] md:text-body-sm">
                      <span className="text-on-surface-variant">Crédito:</span>
                      <span className="text-secondary">El Designado</span>
                    </div>
                    <div className="flex justify-between font-body-sm text-[12px] md:text-body-sm">
                      <span className="text-on-surface-variant">Calidad:</span>
                      <span className="text-secondary">Alta Resolución</span>
                    </div>
                  </div>
                  <div className="pt-3">
                    <a
                      href="https://instagram.com/eldesignadove"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-primary hover:bg-secondary-fixed text-on-primary font-label-caps text-[10px] md:text-label-caps uppercase rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">share</span> Solicitar
                      Archivo Original
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
