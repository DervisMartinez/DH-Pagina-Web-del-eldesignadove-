'use client';

import Image from 'next/image';
import { useRadio } from '@/features/core/providers/RadioContext';

export function WebRadio() {
  const { isPlaying, volume, isMuted, isBuffering, togglePlay, setVolume, toggleMute } = useRadio();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
  };

  return (
    <section className="w-full py-12 md:py-16 bg-surface-container-low border-y border-surface-container-highest">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-container-lowest p-6 md:p-10 rounded-2xl border border-surface-container-highest relative overflow-hidden shadow-2xl">
          {/* Background decorative element */}
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="lg:col-span-5 flex flex-col items-start space-y-4 relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-error animate-pulse' : 'bg-outline'} shadow-[0_0_8px_rgba(147,0,10,0.8)]`}
              />
              <span className="font-label-caps text-label-caps text-error uppercase tracking-widest font-bold">
                Transmisión en Vivo
              </span>
            </div>

            <h2 className="font-display-lg text-[32px] md:text-[40px] text-primary uppercase font-black tracking-tight leading-none">
              Radio
              <br />
              El Designado
            </h2>

            <p className="font-body-md text-body-md text-on-surface-variant max-w-md pt-2">
              Análisis profundo, tertulia beisbolera y la crónica diaria del diamante. Sintoniza
              nuestra señal en vivo las 24 horas del día.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col md:flex-row items-center gap-6 bg-surface-container p-6 md:p-8 rounded-xl border border-outline-variant/30 relative z-10 w-full">
            {/* Visualizer Mockup */}
            <div className="w-full md:w-32 h-32 rounded-lg bg-white border border-surface-container-highest flex items-center justify-center overflow-hidden shrink-0 relative">
              <Image
                src="/DH LOGO fondo blanco.jpeg"
                alt="DH Logo Radio"
                fill
                className="object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 flex items-end justify-center gap-1.5 p-4 z-10 bg-black/40 backdrop-blur-[2px] transition-all duration-300">
                  <div
                    className="w-2 bg-primary rounded-t-sm animate-[bounce_1s_infinite] h-full"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 bg-primary rounded-t-sm animate-[bounce_0.8s_infinite] h-1/2"
                    style={{ animationDelay: '0.3s' }}
                  ></div>
                  <div
                    className="w-2 bg-primary rounded-t-sm animate-[bounce_1.2s_infinite] h-3/4"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="w-2 bg-primary rounded-t-sm animate-[bounce_0.9s_infinite] h-1/3"
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                  <div
                    className="w-2 bg-primary rounded-t-sm animate-[bounce_1.1s_infinite] h-2/3"
                    style={{ animationDelay: '0.5s' }}
                  ></div>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-center w-full space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-headline-sm text-headline-sm text-primary block">
                    El Designado Radio
                  </span>
                  <span className="font-label-caps text-[11px] uppercase text-outline tracking-wider">
                    {isPlaying ? 'Transmitiendo ahora...' : 'Señal pausada'}
                  </span>
                </div>

                {/* Play Button */}
                <button
                  onClick={togglePlay}
                  disabled={isBuffering}
                  className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-secondary-fixed hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                  aria-label={isPlaying ? 'Pausar radio' : 'Reproducir radio'}
                >
                  {isBuffering ? (
                    <span className="material-symbols-outlined text-[28px] animate-spin">sync</span>
                  ) : (
                    <span className="material-symbols-outlined text-[28px]">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  )}
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-lg border border-outline-variant/20">
                <button
                  onClick={toggleMute}
                  className="text-primary hover:text-secondary-fixed transition-colors flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-highest"
                  aria-label={isMuted || volume === 0 ? 'Activar sonido' : 'Silenciar'}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isMuted || volume === 0
                      ? 'volume_off'
                      : volume < 0.5
                        ? 'volume_down'
                        : 'volume_up'}
                  </span>
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                  aria-label="Control de volumen"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
