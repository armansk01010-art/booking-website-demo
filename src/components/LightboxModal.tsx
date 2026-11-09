import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryPhoto } from '../types/retreat';

interface LightboxModalProps {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  activeIndex,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((activeIndex + 1) % photos.length);
      if (e.key === 'ArrowLeft') onNavigate((activeIndex - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, photos.length, onClose, onNavigate]);

  if (activeIndex === null) return null;
  const current = photos[activeIndex];
  if (!current) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 md:p-6 text-white animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="text-xs uppercase tracking-[0.2em] text-[#AD9870]">
          Photo {activeIndex + 1} of {photos.length} · {current.category}
        </div>
        <button
          onClick={onClose}
          className="p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Close photo preview"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Area with Left/Right Arrows */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        <button
          onClick={() => onNavigate((activeIndex - 1 + photos.length) % photos.length)}
          className="absolute left-2 md:left-6 z-10 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors focus-visible:outline-hidden"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <img
          src={current.src}
          alt={current.title}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] max-w-[90vw] object-contain shadow-2xl transition-all duration-300"
        />

        <button
          onClick={() => onNavigate((activeIndex + 1) % photos.length)}
          className="absolute right-2 md:right-6 z-10 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors focus-visible:outline-hidden"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption */}
      <div className="max-w-2xl mx-auto text-center space-y-1 z-10 pb-2">
        <h4 className="font-serif text-lg md:text-xl text-[#F5F2EA]">{current.title}</h4>
        <p className="text-xs text-[#F5F2EA]/75">{current.caption}</p>
      </div>
    </div>
  );
};
