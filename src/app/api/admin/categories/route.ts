import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const res = await pool.query('SELECT id, name, slug FROM categorias ORDER BY id ASC');
    return NextResponse.json({ categories: res.rows });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Nombre de categoría requerido' }, { status: 400 });
    }

    const cleanName = name.trim();
    const slug = cleanName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const res = await pool.query(
      `INSERT INTO categorias (name, slug) 
       VALUES ($1, $2) 
       ON CONFLICT (name) DO NOTHING 
       RETURNING id, name, slug`,
      [cleanName, slug]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'La categoría ya existe.' }, { status: 400 });
    }

    return NextResponse.json({ success: true, category: res.rows[0] });
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requerido.' }, { status: 400 });
    }

    await pool.query('DELETE FROM categorias WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
