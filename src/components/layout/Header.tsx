'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/70 backdrop-blur-md shadow-2xl">
      <div className="h-20 max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            alt="DH Logo"
            src="/dh-logo.png"
            width={200}
            height={64}
            className="h-16 w-auto object-contain mix-blend-lighten"
          />
        </div>
        <nav className="hidden lg:flex items-center gap-2">
          <Link
            href="/"
            className={`px-4 py-2 font-label-caps text-[11px] uppercase transition-colors rounded-lg ${
              pathname === '/'
                ? 'bg-surface-container-highest text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/#coberturas-internacionales"
            className="px-4 py-2 text-on-surface-variant font-label-caps text-label-caps uppercase transition-colors hover:text-primary"
          >
            Eventos
          </Link>
          <Link
            href="/galeria"
            className={`px-4 py-2 font-label-caps text-[11px] uppercase transition-colors rounded-lg ${
              pathname === '/galeria'
                ? 'bg-surface-container-highest text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            Galería
          </Link>
          <Link
            href="/sobre-nosotros"
            className={`px-4 py-2 font-label-caps text-[11px] uppercase transition-colors rounded-lg ${
              pathname === '/sobre-nosotros'
                ? 'bg-surface-container-highest text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            Sobre Nosotros
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/eldesignadove"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 md:px-4 md:py-2 bg-primary text-on-primary font-label-caps text-[10px] md:text-label-caps uppercase tracking-wider rounded-lg transition-colors hover:bg-secondary-fixed hover:text-on-secondary-fixed"
          >
            <span className="hidden sm:inline">@eldesignadove</span>
            <span className="inline sm:hidden">Seguir</span>
          </a>
          <button
            aria-label="Menú"
            className="lg:hidden w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
