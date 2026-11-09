import React, { useState } from 'react';
import { PageId, ExperienceItem } from '../types/retreat';
import { EXPERIENCES } from '../data/retreatData';
import { Clock, Calendar, Check, Compass, ArrowRight } from 'lucide-react';

interface ExperiencesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [inquiredExp, setInquiredExp] = useState<string | null>(null);

  const categories = ['All', 'Wellness & Spa', 'Dining & Hearth', 'Outdoors & Wilderness', 'Cultural & Estate'];

  const filtered = EXPERIENCES.filter((exp) => {
    if (activeCategory === 'All') return true;
    return exp.category === activeCategory;
  });

  const handleInquire = (title: string) => {
    setInquiredExp(title);
    setTimeout(() => {
      setInquiredExp(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#292929] pt-24 pb-24">
      {/* Page Header */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
          <Compass className="w-3.5 h-3.5 text-[#AD9870]" />
          <span>Curated Immersions</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#263D32] font-normal">
          Nature, Healing & Slow Discovery
        </h1>
        <p className="text-sm md:text-base text-[#292929]/75 font-light max-w-2xl mx-auto leading-relaxed">
          From Vedic oil rituals beside flowing mountain springs to nocturnal constellation astronomy on the cliff ridge, our experiences awaken deep presence.
        </p>

        {/* Filter Buttons */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-[#263D32] text-white'
                  : 'bg-white/80 border border-[#AD9870]/30 text-[#292929]/70 hover:text-[#263D32]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Experiences Showcase */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 space-y-16">
        {filtered.map((exp, idx) => (
          <div
            key={exp.id}
            className="bg-white border border-[#AD9870]/30 overflow-hidden shadow-xs hover:border-[#263D32]/50 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Photo */}
              <div
                className={`lg:col-span-6 relative aspect-16/10 lg:aspect-auto overflow-hidden group ${
                  idx % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#263D32]/90 backdrop-blur-xs text-[#F5F2EA] px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium">
                  {exp.category}
                </div>
              </div>

              {/* Description & Schedule */}
              <div
                className={`lg:col-span-6 p-8 md:p-10 flex flex-col justify-between space-y-6 ${
                  idx % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs text-[#AD9870]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{exp.duration}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.schedule}</span>
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl font-normal text-[#263D32]">
                    {exp.title}
                  </h2>

                  <p className="text-xs text-[#292929]/80 leading-relaxed font-light">
                    {exp.fullDesc}
                  </p>

                  {/* Highlights */}
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#263D32] block">
                      Experience Highlights:
                    </span>
                    {exp.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#292929]/75">
                        <Check className="w-3.5 h-3.5 text-[#AD9870] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-[#AD9870]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    {exp.includedInStay ? (
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                        Complimentary for Resident Guests
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-[#263D32]">
                        {exp.priceNote || 'Additional Reservation Required'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => handleInquire(exp.title)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#263D32] border border-[#263D32] hover:bg-[#263D32] hover:text-white transition-colors"
                    >
                      {inquiredExp === exp.title ? 'Noted for Concierge!' : 'Inquire / Reserve'}
                    </button>
                    <button
                      onClick={() => onNavigate('booking')}
                      className="flex-1 sm:flex-initial px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-[#263D32] hover:bg-[#1A2C23] transition-colors"
                    >
                      Book Stay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
