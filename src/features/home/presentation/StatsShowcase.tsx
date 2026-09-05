export function StatsShowcase() {
  const STATS = [
    {
      title: 'Comunidad del DH',
      icon: 'photo_camera',
      value: '+36.6K',
      description: 'Seguidores de nuestra pagina deportiva en @eldesignadove',
    },
    {
      title: 'Jornadas en Terreno',
      icon: 'stadium',
      value: '162+',
      description: 'Juegos con cobertura a nivel de terreno',
    },
    {
      title: 'Fotografías',
      icon: 'photo_library',
      value: '4,993',
      description: 'Publicaciones y tomas maestras publicadas oficialmente',
    },
    {
      title: 'Series Capturadas',
      icon: 'collections',
      value: '340+',
      description: 'Ensayos visuales de autor en diamantes invernales y Grandes Ligas',
    },
  ];

  return (
    <section className="w-full py-16 bg-surface-container-low">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-surface-container-lowest p-8 md:p-12 rounded-xl flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest block mb-4">
                Cultura de Indumentaria
              </span>
              <h3 className="font-headline-lg text-headline-md md:text-headline-lg text-primary uppercase leading-tight mb-6">
                &quot;El béisbol no es solo un marcador; es una liturgia de detalles.&quot;
              </h3>
              <p className="font-body-md text-body-md text-secondary">
                Gorras de lana virgen de ocho paneles, costuras rojas con memoria centenaria, bates
                de arce torneados a mano y uniformes de franela que definieron épocas doradas.
              </p>
            </div>
            <div className="pt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  sports_baseball
                </span>
              </div>
              <div>
                <span className="font-headline-sm text-headline-sm text-primary block leading-none">
                  Colección Editorial
                </span>
                <span className="font-body-sm text-body-sm text-outline">
                  Curaduría trimestral para puristas
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.title}
                className="bg-surface-container p-6 rounded-xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-caps text-label-caps text-outline uppercase">
                    {stat.title}
                  </span>
                  <span className="material-symbols-outlined text-primary">{stat.icon}</span>
                </div>
                <div>
                  <span className="font-stat-numeric text-display-lg text-primary block leading-none mb-1">
                    {stat.value}
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary">
                    {stat.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
