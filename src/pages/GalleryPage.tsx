import React, { useState } from 'react';
import { PageId, GalleryPhoto } from '../types/retreat';
import { GALLERY_ITEMS } from '../data/retreatData';
import { LightboxModal } from '../components/LightboxModal';
import { SafeImage } from '../components/SafeImage';
import { Maximize2, Compass } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'property' | 'rooms' | 'wellness' | 'dining' | 'surroundings'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters: { label: string; key: 'all' | 'property' | 'rooms' | 'wellness' | 'dining' | 'surroundings' }[] = [
    { label: 'All Photographs', key: 'all' },
    { label: 'Property & Grounds', key: 'property' },
    { label: 'Rooms & Villas', key: 'rooms' },
    { label: 'Wellness & Pool', key: 'wellness' },
    { label: 'Dining & Hearth', key: 'dining' },
    { label: 'Surroundings', key: 'surroundings' },
  ];

  const filteredPhotos = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#292929] pt-24 pb-24">
      {/* Page Header */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
          <Compass className="w-3.5 h-3.5 text-[#AD9870]" />
          <span>Visual Archive</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#263D32] font-normal">
          The Living Sanctuary in Frames
        </h1>
        <p className="text-sm md:text-base text-[#292929]/75 font-light max-w-2xl mx-auto leading-relaxed">
          Glimpses of unhurried mornings, architectural stillness, handcrafted teak woodwork, and the eternal mist of Wayanad.
        </p>

        {/* Filter Controls */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
                activeFilter === f.key
                  ? 'bg-[#263D32] text-white'
                  : 'bg-white/80 border border-[#AD9870]/30 text-[#292929]/70 hover:text-[#263D32]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              onMouseEnter={() => {
                // Preload high-res on hover
                const pre = new Image();
                pre.src = photo.src;
              }}
              className="group relative cursor-pointer bg-white border border-[#AD9870]/25 overflow-hidden shadow-xs hover:border-[#263D32]/60 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <SafeImage
                  src={photo.src}
                  alt={photo.title}
                  aspectRatio="aspect-4/3"
                  width={1200}
                  height={900}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white z-10 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#AD9870]">
                    {photo.category}
                  </span>
                  <h4 className="font-serif text-lg text-[#F5F2EA] leading-tight">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-white/75 line-clamp-1 mt-1 font-light">
                    {photo.caption}
                  </p>
                </div>
                <div className="absolute top-3 right-3 p-2 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        photos={filteredPhotos}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};
