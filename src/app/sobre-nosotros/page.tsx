import { AboutHero } from '@/features/about/presentation/AboutHero';
import { AboutValues } from '@/features/about/presentation/AboutValues';
import { AboutVisuals } from '@/features/about/presentation/AboutVisuals';

export default function AboutPage() {
  return (
    <main className="w-full bg-background min-h-screen text-on-surface">
      <div className="flex flex-col w-full">
        <AboutHero />
        <AboutValues />
        <AboutVisuals />
      </div>
    </main>
  );
}
