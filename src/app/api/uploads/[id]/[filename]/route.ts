import { pool } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; filename: string }> }
) {
  const { id } = await params;
  const imageId = parseInt(id, 10);

  if (isNaN(imageId)) {
    return new Response('ID inválido', { status: 400 });
  }

  try {
    const res = await pool.query('SELECT mime_type, data FROM imagenes WHERE id = $1 LIMIT 1', [imageId]);

    if (res.rows.length === 0) {
      return new Response('Imagen no encontrada', { status: 404 });
    }

    const { mime_type, data } = res.rows[0];

    return new Response(data, {
      headers: {
        'Content-Type': mime_type,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching image from database:', error);
    return new Response('Error del servidor', { status: 500 });
  }
}
