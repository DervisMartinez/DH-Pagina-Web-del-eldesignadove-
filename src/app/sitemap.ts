import { MetadataRoute } from 'next';
import { getNoticias } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://eldesignadove.vercel.app';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lvbp`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nuestro-equipo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic news articles from Supabase
  try {
    const noticias = await getNoticias(undefined, 'published');
    const newsRoutes: MetadataRoute.Sitemap = noticias.map((noticia) => ({
      url: `${baseUrl}/noticias/${noticia.slug}`,
      lastModified: new Date(noticia.published_at || noticia.created_at || new Date()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticRoutes, ...newsRoutes];
  } catch (error) {
    console.error('Error generating sitemap dynamic routes:', error);
    return staticRoutes;
  }
}
