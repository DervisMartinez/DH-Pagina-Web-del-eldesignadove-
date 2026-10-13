import { NextResponse } from 'next/server';
import { getNoticias } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eldesignadove.vercel.app';

  try {
    const noticias = await getNoticias(undefined, 'published');

    const items = noticias
      .slice(0, 30)
      .map((item) => {
        const pubDate = new Date(item.published_at || item.created_at || Date.now()).toUTCString();
        const safeTitle = (item.title || '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        const safeSubtitle = (item.subtitle || item.content?.slice(0, 200) || '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');

        return `    <item>
      <title>${safeTitle}</title>
      <link>${baseUrl}/noticias/${item.slug}</link>
      <guid isPermaLink="true">${baseUrl}/noticias/${item.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${safeSubtitle}</description>
      <category>${item.category || 'LVBP'}</category>
      <author>${item.author || 'El Designado'}</author>
      ${item.image_url ? `<enclosure url="${item.image_url}" type="image/jpeg" />` : ''}
    </item>`;
      })
      .join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>El Designado | Noticias de Béisbol Venezolano e Internacional</title>
    <link>${baseUrl}</link>
    <description>Medio digital deportivo que brinda cobertura de la LVBP, Grandes Ligas (MLB), Serie del Caribe y Clásico Mundial de Béisbol.</description>
    <language>es-VE</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel></channel></rss>`, {
      headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    });
  }
}
