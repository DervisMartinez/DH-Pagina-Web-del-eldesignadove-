import { GalleryMasthead } from '@/features/gallery/presentation/GalleryMasthead';
import { GalleryGrid } from '@/features/gallery/presentation/GalleryGrid';
import { GalleryCollections } from '@/features/gallery/presentation/GalleryCollections';

export default function GalleryPage() {
  return (
    <div className="flex flex-col w-full">
      <GalleryMasthead />
      <GalleryGrid />
      <GalleryCollections />
    </div>
  );
}
