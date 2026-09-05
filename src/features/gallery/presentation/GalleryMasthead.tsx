export function GalleryMasthead() {
  return (
    <section className="relative w-full overflow-hidden border-b border-surface-container-highest bg-surface-dim">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop pt-12 pb-14 md:pt-16 md:pb-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-surface-container-highest/80 backdrop-blur-md border border-outline-variant/30">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-label-caps text-[10px] md:text-label-caps uppercase tracking-widest text-on-surface-variant">
                Curaduría Visual Oficial • El Designado
              </span>
            </div>
            <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl leading-[0.95] tracking-tight uppercase text-primary font-black">
              Archivo Visual
              <br />
              <span className="text-on-surface-variant font-light italic">del Diamante</span>
            </h1>
            <p className="font-body-lead text-body-md md:text-body-lead text-secondary max-w-2xl pt-2 font-normal">
              Fotoperiodismo deportivo de alta gama, luz natural y memoria plástica del béisbol
              caribeño e internacional. Sin notas de prensa; solo la pureza visual y el instante
              congelado.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-4 p-5 rounded-xl bg-surface-container-low border border-surface-container-highest backdrop-blur-sm self-start md:self-end min-w-[260px]">
            <div className="flex items-center justify-between gap-6 pb-3 border-b border-surface-container-highest/60">
              <span className="font-label-caps text-[11px] text-outline uppercase">
                Obras en Archivo
              </span>
              <span className="font-stat-numeric text-headline-sm text-primary">148+</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="font-label-caps text-[11px] text-outline uppercase">
                Formato Maestro
              </span>
              <span className="font-label-caps text-[11px] text-secondary uppercase">
                Alta Resolución
              </span>
            </div>
            <div className="flex items-center justify-between gap-6 pt-1">
              <span className="font-label-caps text-[11px] text-outline uppercase">
                Estilo Visual
              </span>
              <span className="font-label-caps text-[11px] text-primary uppercase">
                Documental Nativo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
