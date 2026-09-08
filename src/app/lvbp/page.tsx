import { StandingsTable } from '@/features/lvbp/presentation/StandingsTable';

export default function LVBPPage() {
  return (
    <main className="w-full bg-background min-h-[100dvh] text-on-surface pt-32 pb-24">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
              Centro de Estadísticas
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight uppercase mb-4">
            Liga Venezolana de Béisbol Profesional
          </h1>
          <p className="font-body-lead text-body-md md:text-body-lead text-secondary max-w-2xl">
            Sigue la tabla de posiciones en tiempo real, juegos ganados, perdidos y la clasificación hacia el tan ansiado Round Robin.
          </p>
        </div>

        <StandingsTable />
      </div>
    </main>
  );
}
