import Image from 'next/image';

export function Manifesto() {
  return (
    <section className="w-full py-16 bg-surface-container-lowest" id="manifiesto">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-start">
            <Image
              alt="El Designado Oficial Logo"
              src="/dh-logo.png"
              width={350}
              height={200}
              className="w-56 md:w-72 h-auto object-contain mb-6 mix-blend-lighten"
            />
            <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
              Manifiesto • Est. 2020
            </span>
          </div>
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary uppercase">
              Béisbol con rigor visual, pureza fotográfica y memoria en celuloide.
            </h2>
            <p className="font-body-lead text-body-lead text-secondary leading-relaxed">
              Santuario fotográfico dedicado a la captura plástica del deporte rey. Sin formato de
              blog ni reseñas superfluas: cada imagen es tratada como una pieza de colección visual,
              documentando la plasticidad del movimiento, la luz de diamante y la memoria eterna de
              la pelota.
            </p>
            <div className="flex items-center flex-wrap gap-6 pt-2 font-label-caps text-label-caps text-on-surface-variant">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> FOTOGRAFÍA DE AUTOR
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> OPTICAS ANALÓGICAS &
                DIGITALES
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> ARCHIVO PATRIMONIAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
