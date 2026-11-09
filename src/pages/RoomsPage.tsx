import React, { useState } from 'react';
import { PageId, RoomCategory } from '../types/retreat';
import { ROOM_CATEGORIES } from '../data/retreatData';
import { SafeImage } from '../components/SafeImage';
import { formatINR } from '../services/bookingStorage';
import { Users, Maximize2, Bed, Check, ArrowRight, Eye } from 'lucide-react';

interface RoomsPageProps {
  onNavigate: (page: PageId, roomId?: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | '2-guests' | '4-guests' | 'pool' | 'valley'>('all');

  const filteredRooms = ROOM_CATEGORIES.filter((room) => {
    if (activeFilter === '2-guests') return room.maxGuests === 2;
    if (activeFilter === '4-guests') return room.maxGuests === 4;
    if (activeFilter === 'pool') return room.id === 'private-pool-villa';
    if (activeFilter === 'valley') return room.view.toLowerCase().includes('valley');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#292929] pt-24 pb-24">
      {/* Page Header */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
          Private Sanctuaries
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#263D32] font-normal">
          Suites & Secluded Villas
        </h1>
        <p className="text-sm md:text-base text-[#292929]/75 font-light max-w-2xl mx-auto leading-relaxed">
          Only 18 sanctuaries thoughtfully situated across 75 acres of high-altitude rainforest canopy. Each crafted with organic stone, local timber, and private terraces.
        </p>

        {/* Filter Segmented Controls (allowed per Frontend Design §1.A as functional button controls) */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-[#263D32] text-white'
                : 'bg-white/80 border border-[#AD9870]/30 text-[#292929]/70 hover:text-[#263D32]'
            }`}
          >
            All Sanctuaries ({ROOM_CATEGORIES.length})
          </button>
          <button
            onClick={() => setActiveFilter('2-guests')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeFilter === '2-guests'
                ? 'bg-[#263D32] text-white'
                : 'bg-white/80 border border-[#AD9870]/30 text-[#292929]/70 hover:text-[#263D32]'
            }`}
          >
            Couples & 2 Guests
          </button>
          <button
            onClick={() => setActiveFilter('4-guests')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeFilter === '4-guests'
                ? 'bg-[#263D32] text-white'
                : 'bg-white/80 border border-[#AD9870]/30 text-[#292929]/70 hover:text-[#263D32]'
            }`}
          >
            Family Villa (4 Guests)
          </button>
          <button
            onClick={() => setActiveFilter('pool')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeFilter === 'pool'
                ? 'bg-[#263D32] text-white'
                : 'bg-white/80 border border-[#AD9870]/30 text-[#292929]/70 hover:text-[#263D32]'
            }`}
          >
            Private Pool
          </button>
          <button
            onClick={() => setActiveFilter('valley')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeFilter === 'valley'
                ? 'bg-[#263D32] text-white'
                : 'bg-white/80 border border-[#AD9870]/30 text-[#292929]/70 hover:text-[#263D32]'
            }`}
          >
            Valley Views
          </button>
        </div>
      </section>

      {/* Room Category Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 space-y-16">
        {filteredRooms.map((room, index) => (
          <div
            key={room.id}
            className="bg-white border border-[#AD9870]/30 overflow-hidden shadow-xs hover:border-[#263D32]/50 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Room Photography Gallery Preview */}
              <div
                className={`lg:col-span-7 relative overflow-hidden group ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <SafeImage
                  src={room.primaryImage}
                  alt={room.name}
                  aspectRatio="aspect-16/10 lg:aspect-auto"
                  width={800}
                  height={500}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="group-hover:scale-105 transition-transform duration-700"
                  wrapperClassName="w-full h-full min-h-[300px]"
                />
                <div className="absolute top-4 left-4 bg-[#263D32]/90 backdrop-blur-xs text-[#F5F2EA] px-3.5 py-1.5 text-xs font-mono tracking-wider z-10">
                  {room.sampleAvailability} units available
                </div>
              </div>

              {/* Room Specifications & Details */}
              <div
                className={`lg:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-6 ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#AD9870] font-semibold">
                      Sanctuary 0{index + 1}
                    </span>
                    <div className="text-right">
                      <span className="font-serif text-2xl font-semibold text-[#263D32]">
                        {formatINR(room.pricePerNight)}
                      </span>
                      <span className="text-xs text-[#292929]/70 block font-light">per night</span>
                    </div>
                  </div>

                  <h2 className="font-serif text-3xl font-normal text-[#263D32]">
                    {room.name}
                  </h2>

                  <p className="text-xs text-[#AD9870] font-serif italic">
                    "{room.tagline}"
                  </p>

                  <p className="text-xs text-[#292929]/80 leading-relaxed font-light">
                    {room.description}
                  </p>

                  {/* Room Key Metrics (Clean metadata unboxed) */}
                  <div className="pt-2 pb-2 border-y border-[#AD9870]/20 grid grid-cols-3 gap-2 text-xs text-[#292929]/80">
                    <div>
                      <span className="text-[10px] uppercase text-[#AD9870] block">Size</span>
                      <span className="font-medium">{room.areaSqFt} sq. ft.</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#AD9870] block">Occupancy</span>
                      <span className="font-medium">Up to {room.maxGuests}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#AD9870] block">Bed</span>
                      <span className="font-medium truncate block">{room.bedType.split(' ')[0]} King</span>
                    </div>
                  </div>

                  {/* Facilities Checklist */}
                  <div className="space-y-1.5 text-xs text-[#263D32]/90">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#263D32] block">
                      Highlights:
                    </span>
                    {room.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#AD9870] shrink-0" />
                        <span className="text-xs text-[#292929]/80">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onNavigate('room-detail', room.id)}
                    className="w-full sm:w-1/2 py-3 text-xs uppercase tracking-[0.16em] font-medium text-[#263D32] border border-[#263D32]/40 hover:border-[#263D32] hover:bg-[#263D32]/5 transition-colors text-center"
                  >
                    View Details & Gallery
                  </button>

                  <button
                    onClick={() => onNavigate('booking', room.id)}
                    className="w-full sm:w-1/2 py-3 text-xs uppercase tracking-[0.16em] font-semibold text-white bg-[#263D32] hover:bg-[#1A2C23] transition-colors text-center shadow-xs"
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Complimentary Inclusions Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-20">
        <div className="bg-[#263D32] text-[#F5F2EA] p-8 md:p-12 border border-[#AD9870]/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif text-2xl font-normal">All Sanctuary Reservations Include:</h3>
            <p className="text-xs text-[#F5F2EA]/80 font-light leading-relaxed">
              Daily morning forest meditation · Gourmet organic breakfast at The Prana Pavilion · Afternoon estate high-tea · Unlimited spring pool access · Unpacking concierge service.
            </p>
          </div>
          <button
            onClick={() => onNavigate('booking')}
            className="px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#263D32] bg-[#F5F2EA] hover:bg-white whitespace-nowrap transition-colors"
          >
            Check Dates & Availability
          </button>
        </div>
      </section>
    </div>
  );
};
