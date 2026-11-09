import React, { useState } from 'react';
import { PageId, RoomCategory } from '../types/retreat';
import { ROOM_CATEGORIES } from '../data/retreatData';
import { formatINR, calculateNights, getFutureDate } from '../services/bookingStorage';
import { ArrowLeft, Check, Users, Maximize2, Bed, Calendar, ShieldCheck, Sparkles, Coffee } from 'lucide-react';

interface RoomDetailPageProps {
  roomId?: string;
  onNavigate: (page: PageId, roomId?: string) => void;
  onBookWithDates: (params: {
    roomId: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }) => void;
}

export const RoomDetailPage: React.FC<RoomDetailPageProps> = ({
  roomId = 'deluxe-valley',
  onNavigate,
  onBookWithDates,
}) => {
  const room = ROOM_CATEGORIES.find((r) => r.id === roomId) || ROOM_CATEGORIES[1];
  const [selectedImage, setSelectedImage] = useState(room.primaryImage);
  const [checkIn, setCheckIn] = useState(() => getFutureDate(2));
  const [checkOut, setCheckOut] = useState(() => getFutureDate(5));
  const [adults, setAdults] = useState(Math.min(2, room.maxGuests));
  const [children, setChildren] = useState(0);

  const nights = calculateNights(checkIn, checkOut);
  const baseTotal = nights * room.pricePerNight;
  const gstAmount = Math.round(baseTotal * 0.18);
  const estimatedTotal = baseTotal + gstAmount;

  const todayStr = new Date().toISOString().split('T')[0];

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (nights <= 0) return;
    onBookWithDates({
      roomId: room.id,
      checkIn,
      checkOut,
      adults,
      children,
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#292929] pt-24 pb-24">
      {/* Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
        <button
          onClick={() => onNavigate('rooms')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#263D32] hover:text-[#AD9870] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Sanctuaries</span>
        </button>
      </div>

      {/* Main Room Presentation */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 space-y-12">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#AD9870]/25">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
              Sanctuary Profile
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal">
              {room.name}
            </h1>
            <p className="text-xs text-[#292929]/75 italic font-serif text-lg">
              {room.tagline}
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="font-serif text-3xl font-semibold text-[#263D32]">
              {formatINR(room.pricePerNight)}
            </div>
            <span className="text-xs text-[#292929]/70 block font-light">
              per night · exclusive of 18% luxury GST
            </span>
          </div>
        </div>

        {/* Large Visual Gallery */}
        <div className="space-y-4">
          <div className="aspect-16/9 md:aspect-21/10 overflow-hidden border border-[#AD9870]/30 shadow-lg">
            <img
              src={selectedImage}
              alt={room.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {room.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-24 h-16 md:w-32 md:h-20 shrink-0 border-2 overflow-hidden transition-all ${
                  selectedImage === img
                    ? 'border-[#263D32] opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`View ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content Split: Details vs. In-Page Booking Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6">
          {/* Left Column: Room Story & Amenities */}
          <div className="lg:col-span-7 space-y-10">
            {/* Architectural Story */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-normal text-[#263D32]">
                Architectural Narrative
              </h3>
              <p className="text-sm leading-relaxed text-[#292929]/80 font-light">
                {room.detailedStory}
              </p>
            </div>

            {/* Spatial Specifications */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white border border-[#AD9870]/25 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#AD9870] font-semibold block">Total Area</span>
                <span className="font-medium text-[#263D32] text-sm">{room.areaSqFt} sq. ft.</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#AD9870] font-semibold block">Max Occupancy</span>
                <span className="font-medium text-[#263D32] text-sm">{room.maxGuests} Guests</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#AD9870] font-semibold block">Bedding</span>
                <span className="font-medium text-[#263D32] text-sm truncate block">{room.bedType}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#AD9870] font-semibold block">View Horizon</span>
                <span className="font-medium text-[#263D32] text-sm truncate block">{room.view}</span>
              </div>
            </div>

            {/* Features & Inclusions */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-normal text-[#263D32]">
                Sanctuary Inclusions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#292929]/80">
                {room.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#AD9870] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-normal text-[#263D32]">
                Detailed Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#292929]/80">
                {room.amenities.map((amenity, aIdx) => (
                  <div key={aIdx} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#AD9870] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: In-Page Booking Calculator Widget */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white p-6 md:p-8 border border-[#AD9870]/40 shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#AD9870] font-semibold block">
                  Reserve This Suite
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#263D32]">
                  Check Rates & Book
                </h3>
              </div>

              <form onSubmit={handleBookNow} className="space-y-4 text-xs">
                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                      Check-In
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      min={checkIn || todayStr}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                      required
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                      Adults
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                    >
                      {Array.from({ length: room.maxGuests }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'Adult' : 'Adults'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                      Children (under 12)
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                    >
                      <option value={0}>0 Children</option>
                      <option value={1}>1 Child</option>
                      <option value={2}>2 Children</option>
                    </select>
                  </div>
                </div>

                {/* Live Cost Breakdown */}
                {nights > 0 ? (
                  <div className="pt-4 border-t border-[#AD9870]/20 space-y-2 text-xs">
                    <div className="flex justify-between text-[#292929]/80">
                      <span>{formatINR(room.pricePerNight)} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                      <span className="font-mono">{formatINR(baseTotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#292929]/80">
                      <span>Luxury Hospitality GST (18%)</span>
                      <span className="font-mono">{formatINR(gstAmount)}</span>
                    </div>
                    <div className="pt-2 border-t border-[#AD9870]/20 flex justify-between text-sm font-semibold text-[#263D32]">
                      <span>Estimated Total</span>
                      <span className="font-mono text-base">{formatINR(estimatedTotal)}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-rose-700">Please select valid arrival and departure dates.</p>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={nights <= 0}
                  className="w-full py-3.5 text-xs uppercase tracking-[0.18em] font-semibold text-white bg-[#263D32] hover:bg-[#1A2C23] disabled:opacity-50 transition-colors shadow-xs"
                >
                  Proceed to Reservation
                </button>
              </form>

              <div className="pt-3 border-t border-[#AD9870]/20 flex items-center gap-2 text-[11px] text-[#292929]/65">
                <ShieldCheck className="w-4 h-4 text-[#AD9870] shrink-0" />
                <span>Complimentary cancellation up to 72 hours prior to arrival</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
