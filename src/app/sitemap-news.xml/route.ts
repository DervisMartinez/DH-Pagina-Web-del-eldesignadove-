import { NextResponse } from 'next/server';
import { getNoticias } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eldesignadove.vercel.app';

  try {
    const noticias = await getNoticias(undefined, 'published');
    // Las noticias más recientes para Google News
    const recentNoticias = noticias.slice(0, 50);

    const xmlItems = recentNoticias
      .map((item) => {
        const pubDate = new Date(item.published_at || item.created_at || Date.now()).toISOString();
        const safeTitle = (item.title || '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');

        return `  <url>
    <loc>${baseUrl}/noticias/${item.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>El Designado</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${safeTitle}</news:title>
    </news:news>
  </url>`;
      })
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${xmlItems}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error generating Google News sitemap:', error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
      }
    );
  }
}
