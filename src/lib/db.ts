import { Pool } from 'pg';

const connectionString =
  process.env.DATABASE_URL ||
  'postgres://postgres.sqwqekmnmqdbzscbnowa:rloE3UK8JjPAn8tS@aws-0-us-east-1.pooler.supabase.com:5432/postgres';

// Global singleton pool across hot reloads in Next.js development
declare global {
  // eslint-disable-next-line no-var
  var __dbPool: Pool | undefined;
}

export const pool =
  global.__dbPool ||
  new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

if (process.env.NODE_ENV !== 'production') {
  global.__dbPool = pool;
}

export interface Noticia {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  content: string;
  category: string;
  author: string;
  image_url: string;
  is_featured: boolean;
  views: number;
  published_at: string;
  created_at: string;
}

export async function getNoticias(category?: string): Promise<Noticia[]> {
  try {
    let query = 'SELECT * FROM noticias';
    const params: any[] = [];

    if (category && category !== 'Todas') {
      query += ' WHERE category = $1';
      params.push(category);
    }

    query += ' ORDER BY is_featured DESC, published_at DESC';

    const res = await pool.query(query, params);
    return res.rows;
  } catch (error) {
    console.error('Error fetching noticias from Supabase:', error);
    return [];
  }
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  try {
    const res = await pool.query('SELECT * FROM noticias WHERE slug = $1 LIMIT 1', [slug]);
    if (res.rows.length === 0) return null;

    // Increment views asynchronously
    pool.query('UPDATE noticias SET views = views + 1 WHERE slug = $1', [slug]).catch(console.error);

    return res.rows[0];
  } catch (error) {
    console.error(`Error fetching noticia "${slug}":`, error);
    return null;
  }
}

export async function getRecentNoticias(limit: number = 3, excludeSlug?: string): Promise<Noticia[]> {
  try {
    let query = 'SELECT * FROM noticias';
    const params: any[] = [];

    if (excludeSlug) {
      query += ' WHERE slug != $1';
      params.push(excludeSlug);
    }

    query += ` ORDER BY published_at DESC LIMIT ${limit}`;

    const res = await pool.query(query, params);
    return res.rows;
  } catch (error) {
    console.error('Error fetching recent noticias:', error);
    return [];
  }
}
