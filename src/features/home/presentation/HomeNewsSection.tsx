import Image from 'next/image';
import Link from 'next/link';
import { getRecentNoticias } from '@/lib/db';

export async function HomeNewsSection() {
  const noticias = await getRecentNoticias(3);

  if (!noticias || noticias.length === 0) return null;

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('es-VE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="w-full py-section-gap-lg bg-surface-container-low border-b border-surface-container-highest">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                Crónica & Cobertura Deportiva
              </span>
            </div>
            <h2 className="font-display-lg text-headline-lg md:text-display-lg text-primary uppercase tracking-tight">
              Últimas Noticias & Reportajes
            </h2>
          </div>

          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 font-label-caps text-xs uppercase tracking-wider text-primary hover:text-secondary-fixed transition-colors font-bold"
          >
            <span>Ver Todas las Noticias</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {noticias.map((item) => (
            <Link
              key={item.id}
              href={`/noticias/${item.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden bg-surface-container-lowest border border-surface-container-highest hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl"
            >
              <div className="relative h-[220px] w-full overflow-hidden bg-surface-container-highest">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  unoptimized={item.image_url.startsWith('http')}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-caps text-[10px] uppercase font-bold tracking-wider border border-outline-variant/30">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-outline mb-2 font-label-caps uppercase tracking-wider">
                    <span>{formatDate(item.published_at)}</span>
                    <span>•</span>
                    <span>{item.author}</span>
                  </div>

                  <h3 className="font-headline-sm text-[18px] md:text-[20px] text-primary group-hover:text-secondary-fixed transition-colors font-bold leading-snug mb-3 line-clamp-2">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="font-body-sm text-secondary text-xs sm:text-sm line-clamp-2 mb-4">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between text-xs font-label-caps text-primary uppercase font-bold">
                  <span>Leer Reportaje</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
