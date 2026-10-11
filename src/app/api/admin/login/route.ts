import { NextResponse } from 'next/server';
import { authenticateUsuario } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña requeridos.' },
        { status: 400 }
      );
    }

    const user = await authenticateUsuario(username, password);

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario o contraseña incorrectos.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
