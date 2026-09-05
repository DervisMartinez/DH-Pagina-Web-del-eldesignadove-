import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest py-section-gap-sm">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop mb-12">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                alt="DH Logo"
                src="/dh-logo.png"
                width={200}
                height={64}
                className="h-16 w-auto object-contain mix-blend-lighten"
              />
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Santuario fotográfico de la cultura beisbolera. Curaduría visual de autor, capturas en
              alta fidelidad y archivo patrimonial de la LVBP y Grandes Ligas.
            </p>
            <div className="pt-2">
              <a
                href="https://instagram.com/eldesignadove"
                className="font-label-caps text-label-caps uppercase text-secondary tracking-widest hover:text-primary transition-colors"
              >
                Instagram • @eldesignadove
              </a>
            </div>
          </div>
          <div className="md:col-span-4 space-y-3">
            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest block">
              Archivo Visual
            </span>
            <ul className="space-y-2 font-body-sm text-body-sm text-secondary">
              <li className="hover:text-primary transition-colors">
                <Link href="#">Series • LVBP en Color</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="#">Series • Grandes Ligas de Noche</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="#">Bodegón & Texturas de Dugout</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="#">Acción Rápida en el Diamante</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="#">Archivo Histórico en 35mm</Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-4 space-y-3">
            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest block">
              Redes & Canales
            </span>
            <ul className="space-y-2 font-body-sm text-body-sm text-secondary">
              <li className="hover:text-primary transition-colors">
                <a
                  href="https://instagram.com/eldesignadove"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group"
                >
                  <span>Instagram • @eldesignadove</span>
                  <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary">
                    north_east
                  </span>
                </a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a
                  href="https://x.com/eldesignadove"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group"
                >
                  <span>X (Twitter) • @eldesignadove</span>
                  <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary">
                    north_east
                  </span>
                </a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a
                  href="https://youtube.com/@eldesignadove"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group"
                >
                  <span>YouTube • @eldesignadove</span>
                  <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary">
                    north_east
                  </span>
                </a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a
                  href="https://threads.net/@eldesignadove"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group"
                >
                  <span>Threads • @eldesignadove</span>
                  <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary">
                    north_east
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            © 2020 El Designado. Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-6 font-label-caps text-label-caps uppercase text-on-surface-variant">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Términos
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
