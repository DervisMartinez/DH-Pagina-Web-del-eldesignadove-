import { NextResponse } from 'next/server';
import { pool, getNoticias } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;

  const noticias = await getNoticias(category);
  return NextResponse.json({ noticias });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, subtitle, content, category, author, image_url, is_featured, password } = body;

    // Simple security check
    const expectedPassword = process.env.ADMIN_PASSWORD || 'eldesignado2025';
    if (password !== expectedPassword) {
      return NextResponse.json({ error: 'Contraseña de administrador incorrecta.' }, { status: 401 });
    }

    if (!title || !content || !image_url) {
      return NextResponse.json(
        { error: 'Título, contenido e imagen son campos obligatorios.' },
        { status: 400 }
      );
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
      `INSERT INTO noticias (slug, title, subtitle, content, category, author, image_url, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        slug,
        title,
        subtitle || null,
        content,
        category || 'LVBP',
        author || 'Redacción El Designado',
        image_url,
        Boolean(is_featured),
      ]
    );

    return NextResponse.json({ success: true, noticia: res.rows[0] });
  } catch (error: any) {
    console.error('Error creating noticia:', error);
    return NextResponse.json({ error: error.message || 'Error al guardar la noticia' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const password = searchParams.get('password');

    const expectedPassword = process.env.ADMIN_PASSWORD || 'eldesignado2025';
    if (password !== expectedPassword) {
      return NextResponse.json({ error: 'Contraseña incorrecta.' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'ID requerido.' }, { status: 400 });
    }

    await pool.query('DELETE FROM noticias WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting noticia:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
