const SOCIAL_CHANNELS = [
  {
    name: 'Instagram',
    handle: '@eldesignadove',
    desc: '36.6K Seguidores • 4993 Publicaciones',
    icon: 'photo_camera',
    link: 'https://instagram.com/eldesignadove',
  },
  {
    name: 'YouTube',
    handle: '@eldesignado',
    desc: 'Documentales & Resúmenes Visuales',
    icon: 'play_circle',
    link: 'https://youtube.com/@eldesignado',
  },
  {
    name: 'Facebook',
    handle: '@eldesignadove',
    desc: 'Próximamente',
    icon: 'facebook',
    link: '#',
  },
  {
    name: 'TikTok',
    handle: '@eldesignadove',
    desc: 'Próximamente',
    icon: 'music_note',
    link: '#',
  },
];

export function SocialLinks() {
  return (
    <section className="w-full py-16 bg-surface-container-lowest" id="redes-sociales">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                Canales Oficiales
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary uppercase">
              Comunidad & Redes Oficiales
            </h2>
          </div>
          <span className="font-body-sm text-body-sm text-secondary">
            Conéctate con el archivo vivo de la pelota
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SOCIAL_CHANNELS.map((channel) => (
            <a
              key={channel.name}
              href={channel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface-container-low hover:bg-surface-container p-6 rounded-xl flex flex-col justify-between group transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">{channel.icon}</span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[20px]">
                  north_east
                </span>
              </div>
              <div>
                <span className="font-label-caps text-[11px] text-outline uppercase tracking-wider block mb-1">
                  {channel.name}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-tertiary-fixed transition-colors mb-2">
                  {channel.handle}
                </h3>
                <p className="font-body-sm text-body-sm text-secondary leading-snug">
                  {channel.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
