'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export function InstagramFeed() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section className="w-full py-section-gap-lg bg-background" id="entrevistas-feed">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header de la sección */}
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

        {/* Grid de 4 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Entrevista Anthony Vizcaya (Video) */}
          <div className="group relative aspect-[4/5] sm:aspect-[9/16] lg:aspect-[4/5] bg-black rounded-2xl overflow-hidden border border-primary/30 shadow-xl flex flex-col justify-end">
            <video
              ref={videoRef}
              src="/entrevistas/anthony-vizcaya-cardenales-2026.mp4"
              poster="/entrevistas/anthony-vizcaya-poster.jpg"
              playsInline
              preload="metadata"
              controls={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay visible cuando el video no se está reproduciendo */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 flex flex-col justify-between p-5 cursor-pointer transition-all duration-300 group-hover:from-black/95"
              >
                {/* Header superior del video */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary text-on-primary font-label-caps text-[10px] uppercase rounded-full tracking-wider shadow">
                    Entrevista Exclusiva
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[18px]">videocam</span>
                  </div>
                </div>

                {/* Botón central Play */}
                <div className="flex items-center justify-center my-auto">
                  <div className="w-16 h-16 rounded-full bg-primary/90 text-on-primary flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    <span className="material-symbols-outlined text-[36px] ml-1">play_arrow</span>
                  </div>
                </div>

                {/* Información de la entrevista */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-label-caps text-primary uppercase font-bold tracking-wider">
                      Cardenales de Lara
                    </span>
                    <span className="text-white/60 text-[10px]">• 2026-2027</span>
                  </div>
                  <h3 className="font-headline-md text-headline-sm text-white font-bold leading-tight uppercase">
                    Anthony Vizcaya
                  </h3>
                  <p className="font-body-sm text-[12px] text-white/80 line-clamp-2">
                    Pitcher Cerrador de los Cardenales de Lara. Declaraciones desde el terreno de juego.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Espacio para futuro video 1 */}
          <div className="relative aspect-[4/5] sm:aspect-[9/16] lg:aspect-[4/5] bg-surface-container-low rounded-2xl border-2 border-dashed border-outline-variant/50 p-6 flex flex-col justify-between items-center text-center hover:border-primary/40 transition-colors">
            <div className="w-full flex items-center justify-between">
              <span className="px-3 py-1 bg-surface-container-highest text-secondary font-label-caps text-[10px] uppercase rounded-full">
                Próximamente
              </span>
              <span className="material-symbols-outlined text-outline text-[20px]">
                sports_baseball
              </span>
            </div>

            <div className="flex flex-col items-center space-y-3 my-auto">
              <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center text-primary/70">
                <span className="material-symbols-outlined text-[28px]">video_library</span>
              </div>
              <div className="space-y-1 max-w-[200px]">
                <h4 className="font-headline-sm text-headline-sm text-primary uppercase">
                  Próxima Entrevista
                </h4>
                <p className="font-body-sm text-[12px] text-secondary">
                  Espacio reservado para nuevos testimonios en vivo a nivel de terreno.
                </p>
              </div>
            </div>

            <div className="w-full pt-3 border-t border-outline-variant/20 flex items-center justify-center gap-1 font-label-caps text-[10px] text-secondary uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span>LVBP • Temporada 2026-2027</span>
            </div>
          </div>

          {/* Card 3: Espacio para futuro video 2 */}
          <div className="relative aspect-[4/5] sm:aspect-[9/16] lg:aspect-[4/5] bg-surface-container-low rounded-2xl border-2 border-dashed border-outline-variant/50 p-6 flex flex-col justify-between items-center text-center hover:border-primary/40 transition-colors">
            <div className="w-full flex items-center justify-between">
              <span className="px-3 py-1 bg-surface-container-highest text-secondary font-label-caps text-[10px] uppercase rounded-full">
                En Producción
              </span>
              <span className="material-symbols-outlined text-outline text-[20px]">mic</span>
            </div>

            <div className="flex flex-col items-center space-y-3 my-auto">
              <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center text-primary/70">
                <span className="material-symbols-outlined text-[28px]">movie</span>
              </div>
              <div className="space-y-1 max-w-[200px]">
                <h4 className="font-headline-sm text-headline-sm text-primary uppercase">
                  Protagonistas LVBP
                </h4>
                <p className="font-body-sm text-[12px] text-secondary">
                  Entrevistas y análisis directo con los jugadores y managers de la liga.
                </p>
              </div>
            </div>

            <div className="w-full pt-3 border-t border-outline-variant/20 flex items-center justify-center gap-1 font-label-caps text-[10px] text-secondary uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span>Cobertura de Terreno</span>
            </div>
          </div>

          {/* Card 4: Galería Social #ElDesignado */}
          <a
            href="https://instagram.com/eldesignadove"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-[4/5] sm:aspect-[9/16] lg:aspect-[4/5] bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between border border-outline-variant/40 hover:border-primary/50 hover:bg-surface-container transition-all shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                Galería Social
              </span>
              <span className="material-symbols-outlined text-primary text-[24px]">tag</span>
            </div>

            <div className="space-y-2 my-auto">
              <span className="font-headline-md text-headline-sm text-primary uppercase block font-bold">
                #ElDesignado
              </span>
              <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                Etiqueta tus capturas y forma parte de nuestra curaduría fotográfica y audiovisual en las redes sociales.
              </p>
            </div>

            <div className="flex items-center gap-2 text-primary font-label-caps text-label-caps uppercase font-bold pt-4 border-t border-outline-variant/20">
              <span>Seguir en Instagram</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                east
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
