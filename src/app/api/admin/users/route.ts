import { NextResponse } from 'next/server';
import { pool, getUsuarios } from '@/lib/db';

export async function GET() {
  const users = await getUsuarios();
  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  try {
    const { name, username, password, role } = await request.json();

    if (!name || !username || !password) {
      return NextResponse.json(
        { error: 'Nombre, usuario y contraseña son requeridos.' },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim().toLowerCase();

    // Check if username already exists
    const existing = await pool.query('SELECT id FROM usuarios WHERE username = $1', [cleanUsername]);
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: 'El nombre de usuario ya está en uso. Elige otro.' },
        { status: 400 }
      );
    }

    const res = await pool.query(
      `INSERT INTO usuarios (name, username, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, username, role, created_at`,
      [name.trim(), cleanUsername, password, role || 'redactor']
    );

    return NextResponse.json({ success: true, user: res.rows[0] });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: error.message || 'Error del servidor' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requerido.' }, { status: 400 });
    }

    // Protect primary admin account (id 1 or username admin)
    const check = await pool.query('SELECT username FROM usuarios WHERE id = $1', [id]);
    if (check.rows.length > 0 && check.rows[0].username === 'admin') {
      return NextResponse.json(
        { error: 'No puedes eliminar la cuenta de administrador principal.' },
        { status: 403 }
      );
    }

    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
