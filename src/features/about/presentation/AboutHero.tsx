import Image from 'next/image';

export function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface-container-lowest">
      {/* Atmospheric subtle gradient glow behind hero */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-surface-container-highest/20 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop pt-12 pb-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          {/* Left Column: Master Typography & Manifesto */}
          <div className="lg:col-span-8 space-y-8 relative z-10">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label-caps text-[10px] md:text-label-caps uppercase text-secondary tracking-widest">
                Sobre El Designado • Manifiesto Editorial
              </span>
            </div>

            <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl uppercase text-primary tracking-tight leading-[0.95] max-w-4xl">
              ¿Quiénes somos?
            </h1>

            <p className="font-body-lead text-body-lead text-on-surface-variant max-w-2xl text-balance">
              El Designado es un medio digital que brinda cobertura a las ligas y eventos más
              importantes para el fanático venezolano, incluyendo la Liga Venezolana de Béisbol
              Profesional (LVBP), las Grandes Ligas (MLB), el Clásico Mundial de Béisbol (WBC), la
              Serie del Caribe (SDC) y la Serie de las Américas (SDA). Ofrecemos una perspectiva
              fresca, impulsada por jóvenes comunicadores deportivos que reportan directamente desde
              el terreno de juego, ofreciendo entrevistas a jugadores y aficionados, dinámicas
              interactivas, cobertura en vivo y análisis post-juego.
            </p>

            {/* Editorial Meta Block */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-surface-container-low rounded-xl">
              <div className="space-y-1">
                <span className="block font-label-caps text-[10px] uppercase text-outline">
                  Fundado
                </span>
                <span className="block font-stat-numeric text-headline-sm text-primary">2020</span>
              </div>
              <div className="space-y-1">
                <span className="block font-label-caps text-[10px] uppercase text-outline">
                  Base Operativa
                </span>
                <span className="block font-body-sm text-[12px] font-semibold text-primary">
                  Venezuela & Caribe
                </span>
              </div>
              <div className="space-y-1">
                <span className="block font-label-caps text-[10px] uppercase text-outline">
                  Cobertura
                </span>
                <span className="block font-body-sm text-[12px] font-semibold text-primary">
                  LVBP, SC, WBC, MLB
                </span>
              </div>
              <div className="space-y-1">
                <span className="block font-label-caps text-[10px] uppercase text-outline">
                  Enfoque
                </span>
                <span className="block font-body-sm text-[12px] font-semibold text-primary">
                  Periodismo en Terreno
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Statement Piece */}
          <div className="lg:col-span-4 relative z-10">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-surface-container">
              <Image
                src="https://lh3.googleusercontent.com/aida/AEtjO1Wt604u5ggRH4QWvGH56-vwVyDN2LeewndPdJCS860l3tA2fTY9_VwM-4E8q2pqrFZM08nWz4lSfMLhHbuGG7-irDP6T_Fc5rbDQRaBEGn5U6hmf_T3DfSExL44ONKHWKTQyY_vyedi46xu1fkC3kjTWZvP7hCUC7CzKguH2z0k-Xu4grBKJNSQC9FHirei24SX6l6_MeH9TuXY-WKV5eoQz8qgvHSJUhoPNv8D9EvC4sA_P1jaalK8"
                alt="Cobertura en terreno Serie del Caribe"
                fill
                className="object-cover object-center filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-surface-container/90 backdrop-blur-md rounded-lg">
                <span className="font-label-caps text-[10px] uppercase text-secondary block mb-1">
                  Registro de Campo 01
                </span>
                <p className="font-body-sm text-[12px] text-primary font-medium">
                  Atmósfera y liturgia de la Serie del Caribe. Testimonio visual directo desde las
                  gradas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
