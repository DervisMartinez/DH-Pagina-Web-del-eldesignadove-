import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No se subió ningún archivo' }, { status: 400 });
    }

    const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const mimeType = file.type || 'image/jpeg';
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const sizeBytes = buffer.length;

    // Insert into Supabase imagenes table
    const res = await pool.query(
      `INSERT INTO imagenes (filename, mime_type, data, size_bytes)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [filename, mimeType, buffer, sizeBytes]
    );

    const imageId = res.rows[0].id;
    const publicUrl = `/api/uploads/${imageId}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      id: imageId,
      filename,
    });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: error.message || 'Error al subir imagen' }, { status: 500 });
  }
}
