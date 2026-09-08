import { HeroCarousel } from '@/features/home/presentation/HeroCarousel';
import { Manifesto } from '@/features/home/presentation/Manifesto';
import { EventsGrid } from '@/features/home/presentation/EventsGrid';
import { InstagramReels } from '@/features/home/presentation/InstagramReels';
import { WebRadio } from '@/features/home/presentation/WebRadio';
import { StatsShowcase } from '@/features/home/presentation/StatsShowcase';
import { InstagramFeed } from '@/features/home/presentation/InstagramFeed';
import { SocialLinks } from '@/features/home/presentation/SocialLinks';

export default function Home() {
  return (
    <main className="w-full bg-background min-h-[100dvh]">
      <div className="flex flex-col w-full">
        <HeroCarousel />
        <Manifesto />
        <WebRadio />
        <EventsGrid />
        <InstagramReels />
        <StatsShowcase />
        <InstagramFeed />
        <SocialLinks />
      </div>
    </main>
  );
}
