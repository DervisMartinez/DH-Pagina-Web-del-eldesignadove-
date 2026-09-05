import Image from 'next/image';

const FEED_ITEMS = [
  {
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1W4QOuzc0mheMZwkB82NuMHc78TaNVbgEqMPWmZqg7D154JZNLYwSxOlunphnMjYQxz5u4LZW4SAmn9PzHT8CfdMxLhElfUnwe4uOB3xW5GAMytJHM5b6j5iG4XS_oPmnUr4kbdtyDMGEPyOVU18icMNwe7uyuNyQ4hI0s3DdXEcbeeTnICbOEzZ-w41GE-qYKcwaMLbPcgFH_pFazhoXS9_KyHNENtnjq6SU56YjDD-NC5xf7Qax9W',
    alt: 'Fotografía de swing en juego nocturno',
    tech: '1/2500s • 35mm',
    desc: 'Bateo y polvo bajo reflectores',
  },
  {
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1VByaByp-pdQCzwTtNxI7g-9z0GwqN_SAoQ-h4NDjSxd5M-bczInuDAyhProBpQ-OTN6dgAbN3SGqOBOwQJm-Ak-fZvD2nuadR6nD5eXusd7QKqTYl0j2j0uLQg0dtWFOtEosLHkGFTR3ilVf4uPMhNeshd6RjtHavHwex8AviAr_kut7vD9Z-m4fnlezABzJr_ISFvrIwkx8g_ktuGrr1OscuDAcuPgW6gmvvzCNTqEvAO3GkD7uy22Q',
    alt: 'Pitcher lanzando con potencia',
    tech: '1/3200s • 70-200mm',
    desc: 'Lanzamiento nocturno en la lomita',
  },
  {
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1XyAMZ6qxVa8mXjg-ioa9Txnis0oozftJFbAz_I7C5uTD3I9a9gBxYnloE7NMvJDdfSE1qou8x3Nzb8-kKLHr0T5oR0xrL_wrKUan-zdxbJ1-NOjO9v43L-KPOmBg3OosG1XtveqGFc3b-z9aBdDVGQQIdRolvAOOgu5yAa5mMagmCJVUdEtmuCwBzBm3fPF1y8rXPcsqB0jJWn0fWL68cVzIHsZTGGImQFGrDkCZhe-VeCeZ0c6BvJ2g',
    alt: 'Guante y pelota de béisbol en banco',
    tech: '1/500s • 50mm',
    desc: 'Textura de cuero y madera',
  },
];

export function InstagramFeed() {
  return (
    <section className="w-full py-section-gap-lg bg-background">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                Feed de Instagram
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary uppercase">
              @eldesignadove en Vivo
            </h2>
          </div>
          <a
            href="https://instagram.com/eldesignadove"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-surface-container-high text-primary font-label-caps text-label-caps uppercase rounded-lg hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-2"
          >
            <span>Seguir en Instagram</span>
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEED_ITEMS.map((item, index) => (
            <a
              key={index}
              href="https://instagram.com/eldesignadove"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-surface-container-low rounded-xl overflow-hidden"
            >
              <Image
                alt={item.alt}
                src={item.image}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-surface-container-lowest/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                <span className="material-symbols-outlined text-primary text-[32px] mb-2">
                  camera
                </span>
                <span className="font-stat-numeric text-[18px] text-primary">{item.tech}</span>
                <span className="font-body-sm text-[11px] text-secondary mt-1">{item.desc}</span>
              </div>
            </a>
          ))}

          <a
            href="https://instagram.com/eldesignadove"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square bg-surface-container-lowest rounded-xl p-6 flex flex-col justify-between hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-outline uppercase">
                Galería Social
              </span>
              <span className="material-symbols-outlined text-primary">tag</span>
            </div>
            <div className="space-y-2">
              <span className="font-headline-sm text-headline-sm text-primary uppercase block">
                #ElDesignado
              </span>
              <p className="font-body-sm text-body-sm text-secondary">
                Etiqueta tus capturas y forma parte de nuestra curaduría fotográfica semanal.
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary font-label-caps text-label-caps uppercase">
              <span>Ver galería</span>
              <span className="material-symbols-outlined text-[16px]">east</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
