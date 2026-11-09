import React, { useState } from 'react';
import { Calendar, Users, BedDouble, ArrowRight } from 'lucide-react';
import { ROOM_CATEGORIES } from '../data/retreatData';
import { calculateNights, getFutureDate } from '../services/bookingStorage';

interface BookingSearchWidgetProps {
  onSearch: (params: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    roomId?: string;
  }) => void;
  className?: string;
}

export const BookingSearchWidget: React.FC<BookingSearchWidgetProps> = ({
  onSearch,
  className = '',
}) => {
  const [checkIn, setCheckIn] = useState(() => getFutureDate(2));
  const [checkOut, setCheckOut] = useState(() => getFutureDate(5));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomId, setRoomId] = useState('');
  const [dateError, setDateError] = useState('');

  const nights = calculateNights(checkIn, checkOut);

  const handleCheckInChange = (newDate: string) => {
    setCheckIn(newDate);
    if (newDate >= checkOut) {
      // automatically advance checkOut by at least 1 day
      const d = new Date(newDate);
      d.setDate(d.getDate() + 2);
      setCheckOut(d.toISOString().split('T')[0]);
      setDateError('');
    } else {
      setDateError('');
    }
  };

  const handleCheckOutChange = (newDate: string) => {
    if (newDate <= checkIn) {
      setDateError('Check-out date must be after check-in date');
    } else {
      setDateError('');
      setCheckOut(newDate);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkOut <= checkIn) {
      setDateError('Please select a valid check-out date after check-in.');
      return;
    }
    setDateError('');
    onSearch({
      checkIn,
      checkOut,
      adults,
      children,
      roomId: roomId || undefined,
    });
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div
      className={`bg-[#F5F2EA] text-[#292929] border border-[#AD9870]/30 shadow-xl p-5 md:p-6 lg:p-7 ${className}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Check-In Field */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[#263D32] mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#AD9870]" />
              Check-In Date
            </label>
            <input
              type="date"
              min={todayStr}
              value={checkIn}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="w-full bg-white border border-[#AD9870]/30 text-xs px-3.5 py-2.5 rounded-none focus:outline-hidden focus:border-[#263D32] focus:ring-1 focus:ring-[#263D32] text-[#292929]"
              required
            />
          </div>

          {/* Check-Out Field */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[#263D32] mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#AD9870]" />
              Check-Out Date
              {nights > 0 && (
                <span className="text-[10px] text-[#AD9870] font-medium lowercase">
                  ({nights} {nights === 1 ? 'night' : 'nights'})
                </span>
              )}
            </label>
            <input
              type="date"
              min={checkIn || todayStr}
              value={checkOut}
              onChange={(e) => handleCheckOutChange(e.target.value)}
              className="w-full bg-white border border-[#AD9870]/30 text-xs px-3.5 py-2.5 rounded-none focus:outline-hidden focus:border-[#263D32] focus:ring-1 focus:ring-[#263D32] text-[#292929]"
              required
            />
          </div>

          {/* Guests Count */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[#263D32] mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#AD9870]" />
              Guests
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full bg-white border border-[#AD9870]/30 text-xs px-2.5 py-2.5 rounded-none focus:outline-hidden focus:border-[#263D32] focus:ring-1 focus:ring-[#263D32] text-[#292929]"
              >
                <option value={1}>1 Adult</option>
                <option value={2}>2 Adults</option>
                <option value={3}>3 Adults</option>
                <option value={4}>4 Adults</option>
              </select>

              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full bg-white border border-[#AD9870]/30 text-xs px-2.5 py-2.5 rounded-none focus:outline-hidden focus:border-[#263D32] focus:ring-1 focus:ring-[#263D32] text-[#292929]"
              >
                <option value={0}>0 Children</option>
                <option value={1}>1 Child</option>
                <option value={2}>2 Children</option>
              </select>
            </div>
          </div>

          {/* Sanctuary Category / Room Selection */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[#263D32] mb-1.5 flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-[#AD9870]" />
              Sanctuary
            </label>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full bg-white border border-[#AD9870]/30 text-xs px-3.5 py-2.5 rounded-none focus:outline-hidden focus:border-[#263D32] focus:ring-1 focus:ring-[#263D32] text-[#292929]"
            >
              <option value="">All Sanctuaries (Best Available)</option>
              {ROOM_CATEGORIES.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} — ₹{room.pricePerNight.toLocaleString('en-IN')}/nt
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-[11px] text-[#292929]/70 flex items-center gap-2">
            <span>Special: Complimentary guided canopy walks & wellness tea included</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.18em] font-semibold text-white bg-[#263D32] hover:bg-[#1A2C23] border border-[#263D32] transition-colors whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#AD9870]"
          >
            <span>Check Availability</span>
            <ArrowRight className="w-4 h-4 text-[#AD9870]" />
          </button>
        </div>

        {dateError && (
          <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-2 text-center">
            {dateError}
          </p>
        )}
      </form>
    </div>
  );
};
