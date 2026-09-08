import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public', 'CARRUSEL');
    let files: string[] = [];
    
    if (fs.existsSync(publicDir)) {
      files = fs.readdirSync(publicDir);
    }
    
    // Solo archivos de imagen
    const imageFiles = files.filter(file => 
      file.match(/\.(jpg|jpeg|png|webp|gif)$/i)
    );

    const slides = imageFiles.map((file, index) => {
      // Intentar extraer el nombre del equipo (o usar el nombre del archivo sin extensión)
      const rawName = file.replace(/\.[^/.]+$/, "");
      const formattedName = rawName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      return {
        id: index + 1,
        image: `/CARRUSEL/${file}`,
        alt: `Fotografía: ${formattedName}`,
        tag: 'Fotografía de Autor • Destacada',
        tech: 'Exclusiva • LVBP',
        title: formattedName,
        description: `Archivo de campo.`
      };
    });

    // Si no hay archivos, podemos mandar unas por defecto
    if (slides.length === 0) {
      slides.push({
        id: 1,
        image: '/caribes celebration.png',
        alt: 'Celebración',
        tag: 'Fotografía de Autor',
        tech: 'Exclusiva',
        title: 'Impacto en el Plato',
        description: 'Obra fotográfica que captura la disipación cinética y la nube de arcilla roja.'
      });
    }

    return NextResponse.json(slides);
  } catch (error) {
    console.error('Error reading public directory:', error);
    return NextResponse.json([
        {
            id: 1,
            image: '/caribes celebration.png',
            alt: 'Celebración por defecto',
            tag: 'Fotografía',
            tech: 'Exclusiva',
            title: 'Gran Jugada',
            description: 'Momento increíble en el béisbol venezolano.'
        }
    ]);
  }
}
