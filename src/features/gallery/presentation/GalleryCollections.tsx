export function GalleryCollections() {
  const COLLECTIONS = [
    {
      id: 1,
      vol: 'Volumen I',
      count: '18 Fotografías',
      title: 'Serie Octubre: Luces de Postemporada',
      desc: 'El drama ininterrumpido de las Series Divisionales y de Campeonato. Sombras densas, presión en dugout y la soledad del montículo.',
      tag: 'Estadios MLB • 2023-24',
    },
    {
      id: 2,
      vol: 'Volumen II',
      count: '24 Fotografías',
      title: 'Esencia del Caribe: La Pasión del Diamante',
      desc: 'Crónica gráfica del clásico invernal. La cadencia, la percusión en las tribunas y los héroes locales de la pelota venezolana y dominicana.',
      tag: 'LVBP / Serie del Caribe',
    },
    {
      id: 3,
      vol: 'Volumen III',
      count: '12 Fotografías',
      title: 'Piel de Guante, Brea & Ceniza',
      desc: 'Acercamientos visuales sobre las texturas del juego: la resina pegada al bate de abedul, el bordado desgastado de la franela y el polvo volcánico.',
      tag: 'Detalles • Archivo',
    },
  ];

  return (
    <section className="w-full py-16 bg-surface-container-lowest border-t border-surface-container-highest">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-[11px] md:text-label-caps uppercase text-outline tracking-widest">
                Compilaciones Editoriales
              </span>
              <span className="text-surface-container-highest">•</span>
              <span className="font-label-caps text-[11px] md:text-label-caps uppercase text-secondary">
                Series Completas
              </span>
            </div>
            <h2 className="font-headline-lg text-[32px] md:text-headline-lg text-primary uppercase font-extrabold tracking-tight">
              Ensayos Fotográficos Temáticos
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Narrativas visuales extendidas construidas en semanas de cobertura inmersiva a pie de
              campo y camerinos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label
              className="font-label-caps text-[11px] uppercase text-outline"
              htmlFor="order-select"
            >
              Ordenar por:
            </label>
            <select
              className="bg-surface-container-low text-primary font-label-caps text-[11px] uppercase px-4 py-2 rounded-lg border border-surface-container-highest focus:outline-none focus:border-outline"
              id="order-select"
            >
              <option value="crono">Cronológico (Más Reciente)</option>
              <option value="visto">Colecciones Más Consultadas</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              className="group relative rounded-xl bg-surface-container-low p-6 border border-surface-container-highest hover:border-outline transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest/60">
                  <span className="font-label-caps text-[11px] uppercase text-secondary">
                    {col.vol}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest font-stat-numeric text-body-sm text-primary">
                    {col.count}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold group-hover:text-secondary-fixed transition-colors">
                    {col.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{col.desc}</p>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-surface-container-highest/60 flex items-center justify-between">
                <span className="font-label-caps text-[10px] text-outline uppercase">
                  {col.tag}
                </span>
                <span className="inline-flex items-center gap-1 font-label-caps text-[10px] uppercase text-primary group-hover:translate-x-1 transition-transform">
                  Explorar Serie{' '}
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
