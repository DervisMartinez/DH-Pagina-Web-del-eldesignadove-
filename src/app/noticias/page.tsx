import Image from 'next/image';
import Link from 'next/link';
import { getNoticias, Noticia } from '@/lib/db';

export const revalidate = 30; // Revalidate every 30 seconds

export default async function NoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.categoria || 'Todas';
  const allNoticias: Noticia[] = await getNoticias(currentCategory);

  const categories = ['Todas', 'LVBP', 'MLB', 'Serie del Caribe', 'Opinión'];

  const featured = allNoticias.find((n) => n.is_featured) || allNoticias[0];
  const regularNoticias = featured
    ? allNoticias.filter((n) => n.id !== featured.id)
    : allNoticias;

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
    <main className="w-full bg-background min-h-[100dvh] text-on-surface pt-28 md:pt-36 pb-24">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-surface-container-highest">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                Crónica y Cobertura Exclusiva
              </span>
            </div>
            <h1 className="font-display-lg text-[36px] md:text-[68px] text-primary uppercase font-black tracking-tight leading-none">
              Noticias & Reportajes
            </h1>
            <p className="font-body-lead text-body-md md:text-body-lead text-secondary max-w-2xl mt-3">
              Información de primera mano, análisis del diamante, entrevistas y los momentos más vibrantes del béisbol venezolano y las Grandes Ligas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/noticias"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-highest/80 hover:bg-primary hover:text-on-primary text-secondary text-xs uppercase font-label-caps tracking-wider transition-all duration-200 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
              Redactar Noticia
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-4 mb-10">
          {categories.map((cat) => {
            const isActive = currentCategory === cat;
            const href = cat === 'Todas' ? '/noticias' : `/noticias?categoria=${encodeURIComponent(cat)}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`px-5 py-2 rounded-full font-label-caps text-[12px] uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 scale-105'
                    : 'bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {allNoticias.length === 0 ? (
          <div className="text-center py-24 bg-surface-container-low rounded-2xl border border-surface-container-highest">
            <span className="material-symbols-outlined text-[48px] text-outline mb-4 block">article</span>
            <h3 className="text-headline-sm text-primary font-bold mb-2">No hay noticias en esta sección</h3>
            <p className="text-secondary text-sm max-w-md mx-auto mb-6">
              Sé el primero en publicar una nota de prensa o reportaje en esta categoría.
            </p>
            <Link
              href="/admin/noticias"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label-caps uppercase text-xs tracking-wider"
            >
              Crear Noticia Ahora
            </Link>
          </div>
        ) : (
          <>
            {/* Featured Article (Hero Card) */}
            {featured && (
              <div className="mb-14">
                <Link
                  href={`/noticias/${featured.slug}`}
                  className="group block relative rounded-3xl overflow-hidden bg-surface-container-low border border-surface-container-highest hover:border-primary/50 transition-all duration-300 shadow-2xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    <div className="lg:col-span-7 relative h-[280px] sm:h-[380px] lg:h-[480px] overflow-hidden bg-surface-container-highest">
                      <Image
                        src={featured.image_url}
                        alt={featured.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        priority
                        unoptimized={featured.image_url.startsWith('http')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent lg:hidden" />
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-caps text-[10px] uppercase font-bold tracking-widest shadow-md">
                          En Portada
                        </span>
                        <span className="px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-primary font-label-caps text-[10px] uppercase font-bold tracking-wider">
                          {featured.category}
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-6 sm:p-8 lg:p-12 flex flex-col justify-between bg-surface-container-low">
                      <div>
                        <div className="hidden lg:flex items-center gap-2 mb-4">
                          <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-caps text-[10px] uppercase font-bold tracking-widest">
                            En Portada
                          </span>
                          <span className="px-3 py-1 rounded-full bg-surface-container-highest text-primary font-label-caps text-[10px] uppercase font-bold tracking-wider">
                            {featured.category}
                          </span>
                        </div>

                        <h2 className="font-display-md text-[24px] sm:text-[32px] lg:text-[38px] text-primary group-hover:text-secondary-fixed transition-colors font-bold leading-tight mb-4">
                          {featured.title}
                        </h2>

                        {featured.subtitle && (
                          <p className="font-body-md text-secondary line-clamp-3 mb-6 text-sm sm:text-base leading-relaxed">
                            {featured.subtitle}
                          </p>
                        )}
                      </div>

                      <div className="pt-6 border-t border-surface-container-highest flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs uppercase">
                            {featured.author.slice(0, 2)}
                          </div>
                          <div>
                            <span className="font-label-caps text-xs text-on-surface block font-medium">
                              {featured.author}
                            </span>
                            <span className="text-[11px] text-outline block">
                              {formatDate(featured.published_at)}
                            </span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 font-label-caps text-xs text-primary group-hover:translate-x-1 transition-transform uppercase tracking-wider font-bold">
                          Leer Reportaje
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Regular Grid */}
            {regularNoticias.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <h3 className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                    Más Titulares y Crónicas
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularNoticias.map((item) => (
                    <Link
                      key={item.id}
                      href={`/noticias/${item.slug}`}
                      className="group flex flex-col rounded-2xl overflow-hidden bg-surface-container-low border border-surface-container-highest hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl"
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

                          <h4 className="font-headline-sm text-[18px] md:text-[20px] text-primary group-hover:text-secondary-fixed transition-colors font-bold leading-snug mb-3 line-clamp-2">
                            {item.title}
                          </h4>

                          {item.subtitle && (
                            <p className="font-body-sm text-secondary text-xs sm:text-sm line-clamp-2 mb-4">
                              {item.subtitle}
                            </p>
                          )}
                        </div>

                        <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between text-xs font-label-caps text-primary uppercase font-bold">
                          <span>Leer completo</span>
                          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                            arrow_forward
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
