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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://eldesignadove.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'El Designado | Medio Digital Deportivo',
    template: '%s | El Designado',
  },
  description: 'Medio digital que brinda cobertura de las ligas y eventos más importantes para el fanático venezolano: LVBP, Grandes Ligas (MLB), Clásico Mundial (WBC) y Serie del Caribe.',
  keywords: ['Béisbol', 'LVBP', 'MLB', 'Grandes Ligas', 'Serie del Caribe', 'Noticias de Béisbol', 'El Designado', 'Deportes', 'Venezuela'],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'El Designado | Medio Digital Deportivo',
    description: 'Medio digital que brinda cobertura de las ligas y eventos más importantes para el fanático venezolano: LVBP, Grandes Ligas (MLB), Clásico Mundial (WBC) y Serie del Caribe.',
    url: SITE_URL,
    siteName: 'El Designado',
    images: [
      {
        url: '/icon.png',
        width: 800,
        height: 800,
        alt: 'El Designado Logo',
      },
    ],
    locale: 'es_VE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Designado | Medio Digital Deportivo',
    description: 'Medio digital que brinda cobertura de las ligas y eventos más importantes para el fanático venezolano.',
    images: ['/icon.png'],
  },
};

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RadioProvider } from '@/features/core/providers/RadioContext';
import { WordPressAdminBar } from '@/components/layout/WordPressAdminBar';
import { ThemeProvider } from '@/features/core/providers/ThemeContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'El Designado',
    alternateName: ['El Designado VE', 'ElDesignado', 'El Designado - Medio Digital Deportivo'],
    url: SITE_URL,
    inLanguage: 'es-VE',
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'El Designado',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.png`,
      },
    },
  };

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`dark ${chivo.variable} ${hankenGrotesk.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebsite),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedTheme = localStorage.getItem('dh_theme') || 'dark';
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(savedTheme);
              } catch (e) {}
            `,
          }}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="El Designado - Noticias de Béisbol"
          href="/rss.xml"
        />
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
        <ThemeProvider>
          <WordPressAdminBar />
          <RadioProvider>
            <Header />
            {children}
            <Footer />
          </RadioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
