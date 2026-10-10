import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNoticiaBySlug, getRecentNoticias } from '@/lib/db';
import type { Metadata } from 'next';

export const revalidate = 60; // 1 min

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);

  if (!noticia) {
    return {
      title: 'Noticia no encontrada | El Designado',
    };
  }

  return {
    title: `${noticia.title} | El Designado`,
    description: noticia.subtitle || noticia.content.slice(0, 160),
    openGraph: {
      title: noticia.title,
      description: noticia.subtitle || noticia.content.slice(0, 160),
      images: [noticia.image_url],
      type: 'article',
      publishedTime: noticia.published_at,
      authors: [noticia.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: noticia.title,
      description: noticia.subtitle || noticia.content.slice(0, 160),
      images: [noticia.image_url],
    },
  };
}

export default async function NoticiaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);

  if (!noticia) {
    notFound();
  }

  const related = await getRecentNoticias(3, noticia.slug);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('es-VE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const paragraphs = noticia.content.split('\n\n').filter((p) => p.trim() !== '');

  return (
    <main className="w-full bg-background min-h-[100dvh] text-on-surface pt-28 md:pt-36 pb-24">
      <article className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs font-label-caps uppercase tracking-wider text-outline">
          <Link href="/noticias" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Todas las Noticias
          </Link>
          <span>/</span>
          <span className="text-secondary">{noticia.category}</span>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-label-caps text-xs uppercase font-bold tracking-widest">
              {noticia.category}
            </span>
            <span className="text-xs text-outline font-label-caps uppercase tracking-wider">
              {formatDate(noticia.published_at)}
            </span>
          </div>

          <h1 className="font-display-lg text-[28px] sm:text-[42px] md:text-[54px] text-primary font-black tracking-tight leading-[1.1] mb-6">
            {noticia.title}
          </h1>

          {noticia.subtitle && (
            <p className="font-body-lead text-[18px] md:text-[22px] text-secondary leading-relaxed border-l-2 border-primary pl-4 my-6 italic">
              {noticia.subtitle}
            </p>
          )}

          {/* Author info & Read time */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-surface-container-highest">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-md">
                {noticia.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="font-label-caps text-sm text-primary block font-bold">
                  Por {noticia.author}
                </span>
                <span className="text-xs text-outline block">
                  El Designado • Cobertura Especial
                </span>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-label-caps text-outline uppercase mr-2 hidden sm:inline">
                Compartir:
              </span>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `${noticia.title} https://eldesignadove.vercel.app/noticias/${noticia.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-surface-container-highest hover:bg-green-600 hover:text-white transition-colors flex items-center justify-center text-secondary"
                title="Compartir en WhatsApp"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  noticia.title
                )}&url=${encodeURIComponent(`https://eldesignadove.vercel.app/noticias/${noticia.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-surface-container-highest hover:bg-sky-500 hover:text-white transition-colors flex items-center justify-center text-secondary"
                title="Compartir en X"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </a>
            </div>
          </div>
        </header>

        {/* Lead Image */}
        <div className="relative w-full h-[320px] sm:h-[460px] md:h-[540px] rounded-3xl overflow-hidden mb-12 shadow-2xl bg-surface-container-highest border border-surface-container-highest">
          <Image
            src={noticia.image_url}
            alt={noticia.title}
            fill
            className="object-cover"
            priority
            unoptimized={noticia.image_url.startsWith('http')}
          />
        </div>

        {/* Article Body Content */}
        <div className="max-w-[760px] mx-auto prose prose-invert prose-lg">
          {paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-on-surface text-[17px] md:text-[19px] leading-[1.8] mb-6 font-body-md text-justify"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Article Footer & Author Box */}
        <div className="max-w-[760px] mx-auto mt-16 p-8 rounded-2xl bg-surface-container-low border border-surface-container-highest">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary font-bold">
              DH
            </div>
            <div>
              <h4 className="font-label-caps text-base uppercase text-primary font-bold">
                El Designado
              </h4>
              <p className="text-xs text-outline">
                Medio digital líder en béisbol venezolano y Grandes Ligas
              </p>
            </div>
          </div>
          <p className="text-sm text-secondary">
            Sigue toda la actualidad de la LVBP, MLB y la Serie del Caribe en nuestras redes sociales y a través de nuestra señal de radio online 24/7.
          </p>
        </div>

        {/* Related News Section */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-surface-container-highest">
            <div className="flex items-center gap-2 mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <h3 className="font-label-caps text-label-caps text-primary uppercase tracking-widest font-bold">
                Más Noticias Relacionadas
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/noticias/${item.slug}`}
                  className="group block rounded-2xl overflow-hidden bg-surface-container-low border border-surface-container-highest hover:border-primary/40 transition-all p-4"
                >
                  <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3 bg-surface-container-highest">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized={item.image_url.startsWith('http')}
                    />
                  </div>
                  <span className="text-[10px] text-primary font-label-caps uppercase font-bold block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-headline-sm text-sm text-on-surface font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
