export function AboutValues() {
  return (
    <section className="w-full py-16 md:py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-label-caps text-[11px] uppercase text-secondary tracking-widest block mb-2">
              Fundamentos Conceptuales
            </span>
            <h2 className="font-headline-lg text-[32px] md:text-headline-lg uppercase text-primary leading-tight">
              Misión & Principios Rectores
            </h2>
          </div>
          <p className="font-body-sm text-[13px] text-on-surface-variant max-w-md">
            Convicciones que rigen cada pieza de contenido, cada cobertura en terreno y cada
            interacción con nuestra audiencia.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Principle 01: Nuestros Valores */}
          <div className="bg-surface-container-low p-8 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-colors group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-stat-numeric text-[28px] text-primary group-hover:translate-x-1 transition-transform">
                  01
                </span>
                <span className="material-symbols-outlined text-secondary text-[32px]">
                  verified_user
                </span>
              </div>
              <h3 className="font-headline-sm text-[22px] uppercase text-primary tracking-tight">
                Nuestros Valores
              </h3>
              <p className="font-body-md text-[16px] leading-relaxed text-on-surface-variant">
                En El Designado trabajamos bajo un compromiso inquebrantable de respeto hacia
                nuestra comunidad. Priorizamos siempre la veracidad en nuestra información,
                verificando rigurosamente nuestras fuentes y asumiendo con total responsabilidad la
                labor de informar.
              </p>
            </div>
            <div className="pt-8">
              <span className="font-label-caps text-[11px] uppercase text-outline tracking-wider block">
                Pilar • Respeto y Veracidad
              </span>
            </div>
          </div>

          {/* Principle 02: Nuestro Objetivo */}
          <div className="bg-surface-container-low p-8 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-colors group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-stat-numeric text-[28px] text-primary group-hover:translate-x-1 transition-transform">
                  02
                </span>
                <span className="material-symbols-outlined text-secondary text-[32px]">groups</span>
              </div>
              <h3 className="font-headline-sm text-[22px] uppercase text-primary tracking-tight">
                Nuestro Objetivo
              </h3>
              <p className="font-body-md text-[16px] leading-relaxed text-on-surface-variant">
                Queremos convertirnos en la principal plataforma para los jóvenes comunicadores que
                buscan una oportunidad para destacar y desarrollarse profesionalmente en el ámbito
                del periodismo deportivo. Nuestros corresponsales aportan el análisis crítico
                necesario para ofrecer opiniones fundamentadas, brindando a nuestros seguidores una
                visión completa y de calidad sobre el mundo del deporte.
              </p>
            </div>
            <div className="pt-8">
              <span className="font-label-caps text-[11px] uppercase text-outline tracking-wider block">
                Pilar • Plataforma y Desarrollo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
