import { revalidatePath } from 'next/cache';

/**
 * Servicio de Indexación Ultrarrápida para El Designado.
 * Notifica a los motores de búsqueda (Google, Bing, IndexNow)
 * y revalida la caché de la aplicación en el mismo instante en que se publica o actualiza una noticia.
 */
export async function notifySearchEnginesOnPublish(slug?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eldesignadove.vercel.app';
  const urlList: string[] = [baseUrl, `${baseUrl}/noticias`];

  if (slug) {
    urlList.push(`${baseUrl}/noticias/${slug}`);
  }

  // 1. Revalidar rutas en Next.js (Incremental Static Regeneration)
  try {
    revalidatePath('/');
    revalidatePath('/noticias');
    revalidatePath('/sitemap.xml');
    revalidatePath('/sitemap-news.xml');
    revalidatePath('/rss.xml');
    if (slug) {
      revalidatePath(`/noticias/${slug}`);
    }
  } catch (err) {
    console.warn('[SEO] Cache revalidation note:', err);
  }

  // 2. Ping a IndexNow (Indexación instantánea para Bing, Yandex y partners)
  try {
    const indexNowPayload = {
      host: new URL(baseUrl).host,
      key: 'eldesignado2026indexnowkey',
      keyLocation: `${baseUrl}/eldesignado2026indexnowkey.txt`,
      urlList,
    };

    fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(indexNowPayload),
    }).catch(() => {
      // Background non-blocking
    });
  } catch (err) {
    console.warn('[SEO] IndexNow notify failed:', err);
  }

  // 3. Ping a Google para sitemaps
  try {
    const sitemapUrl = encodeURIComponent(`${baseUrl}/sitemap.xml`);
    const newsSitemapUrl = encodeURIComponent(`${baseUrl}/sitemap-news.xml`);

    fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`).catch(() => {});
    fetch(`https://www.google.com/ping?sitemap=${newsSitemapUrl}`).catch(() => {});
  } catch (err) {
    console.warn('[SEO] Google ping failed:', err);
  }
}
