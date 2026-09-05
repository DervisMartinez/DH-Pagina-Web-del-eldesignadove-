import Image from 'next/image';

const EVENTS = [
  {
    year: "'24",
    collection: 'COLECCIÓN 1/3',
    locationBadgeIcon: 'photo_camera',
    locationBadgeText: 'EN TERRENO',
    icon: 'emoji_events',
    logo: '/SERIE%20DEL%20CARIBE/LOGO%20SERIE%20DEL%20CARIBE.jpg',
    org: 'CONFEDERACIÓN DEL CARIBE',
    edition: 'Edición Anual de Campeones',
    title: 'SERIE DEL CARIBE',
    subtitle: 'Cobertura Editorial y Fotografía en Terreno',
    shortId: 'SDC-2024',
    link: 'https://www.mlb.com/es/serie-del-caribe',
    image: '/SERIE%20DEL%20CARIBE/MEXICO.jpg',
  },
  {
    year: "'26",
    collection: 'COLECCIÓN 2/3',
    locationBadgeIcon: 'photo_camera',
    locationBadgeText: 'EN TERRENO',
    icon: 'public',
    logo: '/WBSC/World_Baseball_Classic_logo.svg',
    org: 'WBSC & MLB',
    edition: 'Clásico Mundial de Béisbol',
    title: 'WORLD BASEBALL CLASSIC',
    subtitle: 'Cobertura Editorial y Fotografía en Terreno',
    shortId: 'WBC-2026',
    link: 'https://www.mlb.com/world-baseball-classic',
    image: '/WBSC/usa-rd.jpg',
  },
  {
    year: "'25",
    collection: 'COLECCIÓN 3/3',
    locationBadgeIcon: 'photo_camera',
    locationBadgeText: 'EN TERRENO',
    icon: 'military_tech',
    logo: '/SERIE%20DE%20LAS%20AMERICAS/LOGO.jpg',
    org: 'CIRCUITO CONTINENTAL',
    edition: 'Certamen Panamericano',
    title: 'SERIE DE LAS AMÉRICAS',
    subtitle: 'Cobertura Editorial y Fotografía en Terreno',
    shortId: 'SDA-2025',
    link: 'https://es.wikipedia.org/wiki/Serie_de_las_Am%C3%A9ricas',
    image: '/SERIE%20DE%20LAS%20AMERICAS/VENEZUELA.jpg',
  },
];

export function EventsGrid() {
  return (
    <section
      className="w-full py-section-gap-lg bg-surface-container-lowest"
      id="coberturas-internacionales"
    >
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                Coberturas Internacionales en Terreno
              </span>
            </div>
            <h2 className="font-display-lg text-headline-lg md:text-display-lg text-primary uppercase tracking-tight">
              Eventos en los que hemos estado presentes
            </h2>
          </div>
          <p className="font-body-md text-body-md text-secondary max-w-md">
            Presencia editorial acreditada en los diamantes y certámenes más prestigiosos del
            béisbol internacional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EVENTS.map((event) => (
            <a
              key={event.title}
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/60 flex flex-col transition-all duration-500 hover:scale-[1.02] shadow-2xl p-3 hover:border-primary/50"
            >
              <div className="flex flex-col h-full rounded-lg bg-surface-container-low border border-primary/20 p-2.5">
                <div className="relative w-full aspect-[4/5] rounded overflow-hidden border border-outline-variant/60 bg-surface-container-highest shadow-inner">
                  <Image
                    alt={event.title}
                    src={event.image}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />

                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <div className="px-2 py-0.5 bg-surface-dim/90 backdrop-blur-md rounded border border-primary/30 flex items-center gap-1 shadow">
                      <span className="font-stat-numeric text-[11px] text-primary font-bold tracking-wider">
                        {event.year}
                      </span>
                      <span className="w-[1px] h-2.5 bg-outline-variant" />
                      <span className="font-label-caps text-[8px] text-secondary tracking-widest uppercase">
                        {event.collection}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-surface-dim/90 backdrop-blur-md border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shadow">
                    <span className="material-symbols-outlined text-[15px]">north_east</span>
                  </div>

                  <div className="absolute bottom-2 left-2.5">
                    <span className="px-2 py-0.5 bg-surface-dim/85 backdrop-blur-md rounded border border-outline-variant/40 font-label-caps text-[8px] text-primary uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-[11px]">
                        {event.locationBadgeIcon}
                      </span>{' '}
                      {event.locationBadgeText}
                    </span>
                  </div>
                </div>

                <div className="mt-3 p-4 rounded bg-surface-dim/95 border border-primary/20 shadow flex flex-col justify-between flex-grow space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/30">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center border border-outline-variant/50 shadow-inner overflow-hidden flex-shrink-0 p-1.5">
                      {event.logo ? (
                        <Image
                          src={event.logo}
                          alt={`${event.org} logo`}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain drop-shadow-sm"
                          unoptimized
                        />
                      ) : (
                        <span className="material-symbols-outlined text-[24px] text-surface-container-highest">
                          {event.icon}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-label-caps text-[11px] text-primary font-bold tracking-wider uppercase leading-tight mb-0.5">
                        {event.org}
                      </span>
                      <span className="font-label-caps text-[9.5px] text-outline uppercase tracking-wider leading-tight">
                        {event.edition}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-headline-lg text-[22px] text-primary uppercase tracking-tight leading-none group-hover:text-tertiary-fixed transition-colors">
                      {event.title}
                    </h3>
                    <p className="font-body-md text-body-sm text-secondary mt-1 leading-snug">
                      {event.subtitle}
                    </p>
                  </div>

                  <div className="pt-2.5 flex items-center justify-between border-t border-outline-variant/30 font-label-caps text-[11px] uppercase tracking-wider">
                    <div className="flex items-center gap-1.5 text-primary group-hover:text-tertiary-fixed transition-colors font-bold">
                      <span>VER COBERTURA OFICIAL</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </div>
                    <span className="font-stat-numeric text-[11px] text-outline tracking-widest">
                      {event.shortId}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
