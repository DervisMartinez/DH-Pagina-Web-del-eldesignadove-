import Image from 'next/image';

export default function ContactoPage() {
  return (
    <main className="w-full bg-background min-h-[100dvh] text-on-surface pt-32 pb-24 overflow-hidden relative">
      {/* Background with fading logo on the right */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-end items-center opacity-30 md:opacity-60 mix-blend-screen overflow-hidden">
        {/* Gradient Mask to fade the logo from left to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        
        <div className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] translate-x-1/4">
          <Image
            src="/DH LOGO fondo blanco.jpeg"
            alt="Logo DH Background"
            fill
            className="object-contain filter grayscale contrast-125"
            unoptimized
          />
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop relative z-20">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
              Conecta con nosotros
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-[80px] text-primary tracking-tight uppercase mb-4 leading-none">
            Contacto
          </h1>
          <p className="font-body-lead text-body-md md:text-body-lead text-secondary max-w-xl">
            Ponte en contacto con nuestro equipo para coberturas, prensa, alianzas comerciales o cualquier consulta.
          </p>
        </div>

        <div className="flex flex-col gap-8 max-w-xl">
          {/* Email Card */}
          <div className="bg-surface-container-low/50 backdrop-blur-md border border-surface-container-highest p-8 rounded-2xl shadow-xl hover:bg-surface-container-low transition-colors group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">mail</span>
              </div>
              <h2 className="font-headline-lg text-headline-sm text-on-surface">Correo Electrónico</h2>
            </div>
            <a 
              href="mailto:info.eldesignado@gmail.com"
              className="text-[20px] md:text-[28px] font-bold text-primary hover:text-secondary transition-colors"
            >
              info.eldesignado@gmail.com
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-surface-container-low/50 backdrop-blur-md border border-surface-container-highest p-8 rounded-2xl shadow-xl hover:bg-surface-container-low transition-colors group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">call</span>
              </div>
              <h2 className="font-headline-lg text-headline-sm text-on-surface">Teléfono</h2>
            </div>
            <a 
              href="tel:+584121886215"
              className="text-[20px] md:text-[28px] font-bold text-primary hover:text-secondary transition-colors tracking-wider"
            >
              0412-1886215
            </a>
          </div>

          {/* Social Card */}
          <div className="bg-surface-container-low/50 backdrop-blur-md border border-surface-container-highest p-8 rounded-2xl shadow-xl hover:bg-surface-container-low transition-colors group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">public</span>
              </div>
              <h2 className="font-headline-lg text-headline-sm text-on-surface">Redes Sociales</h2>
            </div>
            <a 
              href="https://instagram.com/eldesignadove"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[20px] md:text-[28px] font-bold text-primary hover:text-secondary transition-colors"
            >
              @eldesignadove
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
