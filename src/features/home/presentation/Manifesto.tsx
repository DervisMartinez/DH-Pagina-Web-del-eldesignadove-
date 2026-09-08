import Image from 'next/image';

export function Manifesto() {
  return (
    <section className="w-full py-16 bg-surface-container-lowest" id="manifiesto">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-start">
            <Image
              alt="El Designado Oficial Logo"
              src="/dh-logo.png"
              width={350}
              height={200}
              className="w-56 md:w-72 h-auto object-contain mb-6 mix-blend-lighten"
            />
            <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
              Manifiesto • Est. 2020
            </span>
          </div>
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary uppercase">
              ¿Quienes Somos?
            </h2>
            <p className="font-body-lead text-body-lead text-secondary leading-relaxed">
              El Designado es un medio digital que brinda cobertura a las ligas y eventos más
              importantes para el fanático venezolano, incluyendo la Liga Venezolana de Béisbol
              Profesional (LVBP), las Grandes Ligas (MLB), el Clásico Mundial de Béisbol (WBC), la
              Serie del Caribe (SDC) y la Serie de las Américas (SDA). Ofrecemos una perspectiva
              fresca, impulsada por jóvenes comunicadores deportivos que reportan directamente desde
              el terreno de juego, ofreciendo entrevistas a jugadores y aficionados, dinámicas
              interactivas, cobertura en vivo y análisis post-juego
            </p>
            <div className="flex items-center flex-wrap gap-6 pt-2 font-label-caps text-label-caps text-on-surface-variant">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> COBERTURA
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> OPINIONENS & DIGITALES
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> COBERTURA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
