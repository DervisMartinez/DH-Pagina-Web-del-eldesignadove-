import type { Metadata } from 'next';
import { Chivo, Hanken_Grotesk, Space_Grotesk } from 'next/font/google';
import './globals.css';

const chivo = Chivo({
  subsets: ['latin'],
  variable: '--font-chivo',
  weight: ['400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
  weight: ['400', '500', '600', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '700'],
});

export const metadata: Metadata = {
  title: 'El Designado | Medio Digital Deportivo',
  description: 'Medio digital que brinda cobertura de las ligas y eventos más importantes para el fanático venezolano: LVBP, Grandes Ligas (MLB), Clásico Mundial (WBC) y Serie del Caribe.',
  keywords: ['Béisbol', 'LVBP', 'MLB', 'Grandes Ligas', 'Serie del Caribe', 'Noticias de Béisbol', 'El Designado', 'Deportes', 'Venezuela'],
};

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RadioProvider } from '@/features/core/providers/RadioContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`dark ${chivo.variable} ${hankenGrotesk.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <RadioProvider>
          <Header />
          {children}
          <Footer />
        </RadioProvider>
      </body>
    </html>
  );
}
