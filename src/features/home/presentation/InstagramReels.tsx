const REELS = [
  {
    id: 'DWA7C80O43_',
    title: 'Análisis de Movimiento',
    subtitle: 'Mecánica de pitcheo y rotación en slow-motion',
    collection: 'REEL 1/3',
    badge: 'CLIP EN VIVO',
  },
  {
    id: 'DV5N9d-JYEC',
    title: 'El Sonido del Diamante',
    subtitle: 'ASMR deportivo y contacto sólido en la caja de bateo',
    collection: 'REEL 2/3',
    badge: 'CLIP EN VIVO',
  },
  {
    id: 'DWA7C80O43_', // Placeholder
    title: 'Texturas de Terreno',
    subtitle: 'Detalles visuales desde el nivel del dugout',
    collection: 'REEL 3/3',
    badge: 'CLIP EN VIVO',
  },
];

export function InstagramReels() {
  return (
    <section className="w-full py-section-gap-lg bg-surface-container-lowest" id="reels-destacados">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                Archivo Audiovisual
              </span>
            </div>
            <h2 className="font-display-lg text-headline-lg md:text-display-lg text-primary uppercase tracking-tight">
              Formatos Cortos
            </h2>
          </div>
          <p className="font-body-md text-body-md text-secondary max-w-md">
            Instantes de tensión, movimiento y estética beisbolera capturados en video dinámico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REELS.map((reel, index) => (
            <div
              key={`${reel.id}-${index}`}
              className="group relative rounded-xl bg-surface-container-lowest border border-outline-variant/60 flex flex-col transition-all duration-500 hover:scale-[1.02] shadow-2xl p-3 hover:border-primary/50"
            >
              <div className="flex flex-col h-full rounded-lg bg-surface-container-low border border-primary/20 p-2.5">
                {/* Media Container (Iframe) */}
                <div className="relative w-full aspect-[9/16] max-h-[580px] rounded overflow-hidden border border-outline-variant/60 bg-surface-container-highest shadow-inner">
                  <iframe
                    src={`https://www.instagram.com/reel/${reel.id}/embed`}
                    className="w-full h-full border-none absolute inset-0 bg-white"
                    scrolling="no"
                    title={reel.title}
                  />

                  {/* Top Left Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pointer-events-none z-10 hidden sm:flex">
                    <div className="px-2 py-0.5 bg-surface-dim/90 backdrop-blur-md rounded border border-primary/30 flex items-center gap-1 shadow">
                      <span className="font-stat-numeric text-[11px] text-primary font-bold tracking-wider">
                        IG
                      </span>
                      <span className="w-[1px] h-2.5 bg-outline-variant" />
                      <span className="font-label-caps text-[8px] text-secondary tracking-widest uppercase">
                        {reel.collection}
                      </span>
                    </div>
                  </div>

                  {/* Top Right Action Icon */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-surface-dim/90 backdrop-blur-md border border-primary/30 flex items-center justify-center text-primary shadow pointer-events-none z-10 hidden sm:flex">
                    <span className="material-symbols-outlined text-[15px]">play_arrow</span>
                  </div>

                  {/* Bottom Left Badge */}
                  <div className="absolute bottom-2 left-2.5 pointer-events-none z-10 hidden sm:flex">
                    <span className="px-2 py-0.5 bg-surface-dim/85 backdrop-blur-md rounded border border-outline-variant/40 font-label-caps text-[8px] text-primary uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-[11px]">
                        movie
                      </span>{' '}
                      {reel.badge}
                    </span>
                  </div>
                </div>

                {/* Info Card Bottom */}
                <div className="mt-3 p-4 rounded bg-surface-dim/95 border border-primary/20 shadow flex flex-col justify-between flex-grow space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/30">
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center border border-primary/30 text-primary shadow-sm overflow-hidden flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px]">play_circle</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-label-caps text-[11px] text-primary font-bold tracking-wider uppercase leading-tight mb-0.5">
                        @eldesignadove
                      </span>
                      <span className="font-label-caps text-[9.5px] text-outline uppercase tracking-wider leading-tight">
                        Instagram Reels
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-headline-lg text-[18px] text-primary uppercase tracking-tight leading-none group-hover:text-tertiary-fixed transition-colors">
                      {reel.title}
                    </h3>
                    <p className="font-body-md text-body-sm text-secondary mt-1 leading-snug">
                      {reel.subtitle}
                    </p>
                  </div>

                  <div className="pt-2.5 flex items-center justify-between border-t border-outline-variant/30 font-label-caps text-[11px] uppercase tracking-wider">
                    <a
                      href={`https://www.instagram.com/reel/${reel.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-primary hover:text-tertiary-fixed transition-colors font-bold"
                    >
                      <span>VER EN INSTAGRAM</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
