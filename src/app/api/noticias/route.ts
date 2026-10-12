import { NextResponse } from 'next/server';
import { pool, getNoticias } from '@/lib/db';
import { notifySearchEnginesOnPublish } from '@/lib/seo-indexer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const statusFilter = (searchParams.get('status') as 'all' | 'published' | 'draft') || 'published';

  const noticias = await getNoticias(category, statusFilter);
  return NextResponse.json({ noticias });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, title, subtitle, content, category, author, image_url, external_link, is_featured, status } = body;

    if (!title || !content || !image_url) {
      return NextResponse.json(
        { error: 'Título, contenido e imagen son campos requeridos.' },
        { status: 400 }
      );
    }

    const postStatus = status === 'draft' ? 'draft' : 'published';

    // If ID is provided, it's an UPDATE!
    if (id) {
      const res = await pool.query(
        `UPDATE noticias 
         SET title = $1, subtitle = $2, content = $3, category = $4, author = $5, image_url = $6, external_link = $7, is_featured = $8, status = $9
         WHERE id = $10
         RETURNING *`,
        [
          title,
          subtitle || null,
          content,
          category || 'LVBP',
          author || 'Redacción El Designado',
          image_url,
          external_link || null,
          Boolean(is_featured),
          postStatus,
          id,
        ]
      );

      const savedNoticia = res.rows[0];
      if (savedNoticia.status === 'published') {
        notifySearchEnginesOnPublish(savedNoticia.slug);
      }

      return NextResponse.json({ success: true, noticia: savedNoticia, updated: true });
    }

    // Auto generate clean slug
    const baseSlug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const res = await pool.query(
      `INSERT INTO noticias (slug, title, subtitle, content, category, author, image_url, external_link, is_featured, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        slug,
        title,
        subtitle || null,
        content,
        category || 'LVBP',
        author || 'Redacción El Designado',
        image_url,
        external_link || null,
        Boolean(is_featured),
        postStatus,
      ]
    );

    const createdNoticia = res.rows[0];
    if (createdNoticia.status === 'published') {
      notifySearchEnginesOnPublish(createdNoticia.slug);
    }

    return NextResponse.json({ success: true, noticia: createdNoticia });
  } catch (error: any) {
    console.error('Error creating/updating noticia:', error);
    return NextResponse.json({ error: error.message || 'Error al guardar' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requerido.' }, { status: 400 });
    }

    await pool.query('DELETE FROM noticias WHERE id = $1', [id]);
    notifySearchEnginesOnPublish();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting noticia:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
