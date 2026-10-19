import { Pool } from 'pg';

const connectionString =
  process.env.DATABASE_URL ||
  'postgres://postgres.sqwqekmnmqdbzscbnowa:rloE3UK8JjPAn8tS@aws-0-us-east-1.pooler.supabase.com:6543/postgres';

declare global {
  // eslint-disable-next-line no-var
  var __dbPool: Pool | undefined;
}

export const pool =
  global.__dbPool ||
  new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 3,
    idleTimeoutMillis: 10000,
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
  gallery_images?: string[] | null;
  external_link?: string | null;
  is_featured: boolean;
  status: 'published' | 'draft';
  views: number;
  published_at: string;
  created_at: string;
}

export function parseNoticiaRow(row: any): Noticia {
  let gallery = row.gallery_images;
  if (typeof gallery === 'string') {
    try {
      gallery = JSON.parse(gallery);
    } catch {
      gallery = [];
    }
  }
  return {
    ...row,
    gallery_images: Array.isArray(gallery) ? gallery : [],
  };
}

export interface Usuario {
  id: number;
  name: string;
  username: string;
  password?: string;
  role: 'admin' | 'redactor';
  created_at: string;
}

export async function getNoticias(
  category?: string,
  statusFilter?: 'all' | 'published' | 'draft'
): Promise<Noticia[]> {
  try {
    const conditions: string[] = [];
    const params: any[] = [];

    // By default, for public pages, only return published articles
    if (statusFilter === 'all') {
      // no status condition
    } else if (statusFilter === 'draft') {
      conditions.push(`status = 'draft'`);
    } else {
      conditions.push(`status = 'published'`);
    }

    if (category && category !== 'Todas') {
      params.push(category);
      conditions.push(`category = $${params.length}`);
    }

    let query = 'SELECT * FROM noticias';
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ' ORDER BY is_featured DESC, published_at DESC';

    const res = await pool.query(query, params);
    return res.rows.map(parseNoticiaRow);
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

    return parseNoticiaRow(res.rows[0]);
  } catch (error) {
    console.error(`Error fetching noticia "${slug}":`, error);
    return null;
  }
}

export async function getRecentNoticias(limit: number = 3, excludeSlug?: string): Promise<Noticia[]> {
  try {
    let query = `SELECT * FROM noticias WHERE status = 'published'`;
    const params: any[] = [];

    if (excludeSlug) {
      params.push(excludeSlug);
      query += ` AND slug != $${params.length}`;
    }

    query += ` ORDER BY published_at DESC LIMIT ${limit}`;

    const res = await pool.query(query, params);
    return res.rows.map(parseNoticiaRow);
  } catch (error) {
    console.error('Error fetching recent noticias:', error);
    return [];
  }
}

export async function getUsuarios(): Promise<Usuario[]> {
  try {
    const res = await pool.query('SELECT id, name, username, role, created_at FROM usuarios ORDER BY id ASC');
    return res.rows;
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    return [];
  }
}

export async function authenticateUsuario(username: string, password: string):Promise<Usuario | null> {
  try {
    const res = await pool.query(
      'SELECT id, name, username, role, created_at FROM usuarios WHERE username = $1 AND password = $2 LIMIT 1',
      [username.trim().toLowerCase(), password]
    );
    if (res.rows.length === 0) {
      // Check if root emergency password was provided
      if (
        (username === 'admin' || username === 'dervis') &&
        (password === 'eldesignado2025' || password === 'rloE3UK8JjPAn8tS')
      ) {
        return {
          id: 1,
          name: 'Dervis Martínez',
          username: 'admin',
          role: 'admin',
          created_at: new Date().toISOString(),
        };
      }
      return null;
    }
    return res.rows[0];
  } catch (error) {
    console.error('Error authenticating usuario:', error);
    return null;
  }
}
