import Image from 'next/image';

const EQUIPO = [
  { role: 'Fundador / CM', name: 'Jesús Guerra' },
  { role: 'Director General / Gerente de Ventas', name: 'Diego Yépez' },
  { role: 'Webmaster', name: 'Dervis Martínez' },
  { role: 'Diseñador Gráfico', name: 'Leornardo Carmona - Fabián Alvarado' },
  { role: 'Talentos de Marca', name: 'Janeily Farías - Molly Jiménez' },
  { role: 'Corresponsales', name: 'Miguel Chacin, Oriana García, Ricardo Galán y Anna Palermo' },
  { role: 'Fotógrafos', name: 'Gabriel Lugo - Lucia Vergara' },
  { role: 'Colaboradores Nacionales', name: 'Marco Ruiz y Raúl Zambrano' },
  { role: 'Colaboradores Internacionales', name: 'Miguel Fuenmayor y Luis Gilbert' },
];

export default function NuestroEquipoPage() {
  return (
    <main className="w-full bg-background min-h-[100dvh] text-on-surface pt-32 pb-24 overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop relative z-20">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
              Conoce a los creadores
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-[80px] text-primary tracking-tight uppercase mb-4 leading-none">
            Nuestro Equipo
          </h1>
          <p className="font-body-lead text-body-md md:text-body-lead text-secondary max-w-2xl">
            Detrás de El Designado hay un grupo de profesionales apasionados por el deporte, dedicados a llevarte la mejor cobertura y contenido de calidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EQUIPO.map((member, index) => (
            <div 
              key={index}
              className="bg-surface-container-low/50 backdrop-blur-md border border-surface-container-highest p-6 md:p-8 rounded-2xl shadow-xl hover:bg-surface-container transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              
              <h2 className="font-label-caps text-[12px] md:text-label-caps uppercase text-primary tracking-wider mb-2">
                {member.role}
              </h2>
              <p className="font-headline-sm text-[20px] md:text-headline-sm text-on-surface font-medium leading-snug">
                {member.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
