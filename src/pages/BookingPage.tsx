import React, { useState, useEffect } from 'react';
import { PageId, RoomCategory, BookingAddon, ConfirmedReservation } from '../types/retreat';
import { ROOM_CATEGORIES, BOOKING_ADDONS } from '../data/retreatData';
import {
  saveBooking,
  generateBookingId,
  calculateNights,
  getFutureDate,
  formatINR,
  PROMO_CODES,
} from '../services/bookingStorage';
import {
  Calendar,
  Users,
  BedDouble,
  Check,
  ShieldCheck,
  Sparkles,
  Info,
  CreditCard,
  Tag,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface BookingPageProps {
  initialRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
  initialChildren?: number;
  onBookingConfirmed: (reservation: ConfirmedReservation) => void;
  onNavigate: (page: PageId) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialRoomId,
  initialCheckIn,
  initialCheckOut,
  initialAdults = 2,
  initialChildren = 0,
  onBookingConfirmed,
  onNavigate,
}) => {
  // Booking Form State
  const [checkIn, setCheckIn] = useState<string>(() => initialCheckIn || getFutureDate(2));
  const [checkOut, setCheckOut] = useState<string>(() => initialCheckOut || getFutureDate(5));
  const [adults, setAdults] = useState<number>(initialAdults);
  const [children, setChildren] = useState<number>(initialChildren);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(() => initialRoomId || 'deluxe-valley');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Guest Details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [arrivalTime, setArrivalTime] = useState('14:00');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [guaranteeType, setGuaranteeType] = useState<'pay-on-arrival' | 'demo-card'>('pay-on-arrival');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Validation & Processing State
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const nights = calculateNights(checkIn, checkOut);
  const totalGuests = adults + children;

  // Selected room object
  const room = ROOM_CATEGORIES.find((r) => r.id === selectedRoomId) || ROOM_CATEGORIES[0];

  // Room capacity check
  const isRoomOverCapacity = totalGuests > room.maxGuests;

  // Calculate pricing
  const roomBaseTotal = nights * room.pricePerNight;

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = BOOKING_ADDONS.find((a) => a.id === addonId);
    if (!addon) return sum;
    if (addon.unit === 'per person') return sum + addon.price * adults;
    return sum + addon.price;
  }, 0);

  const subtotalBeforeDiscount = roomBaseTotal + addonsTotal;
  const discountRate = appliedPromo ? PROMO_CODES[appliedPromo] || 0 : 0;
  const discountAmount = Math.round(roomBaseTotal * discountRate);
  const taxableSubtotal = Math.max(0, subtotalBeforeDiscount - discountAmount);
  const gstAmount = Math.round(taxableSubtotal * 0.18);
  const grandTotal = taxableSubtotal + gstAmount;

  // Auto-switch room if user guest count exceeds 2 and they had a 2-guest room
  useEffect(() => {
    if (totalGuests > 2 && room.maxGuests === 2) {
      const villa = ROOM_CATEGORIES.find((r) => r.maxGuests >= totalGuests);
      if (villa) {
        setSelectedRoomId(villa.id);
      }
    }
  }, [totalGuests, room.maxGuests]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCodeInput.trim().toUpperCase();
    if (PROMO_CODES[clean]) {
      setAppliedPromo(clean);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "VAANA10" or "NATURE"');
    }
  };

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validations
    if (nights <= 0) {
      setValidationError('Please select valid check-in and check-out dates.');
      return;
    }
    if (checkIn < todayStr) {
      setValidationError('Check-in date cannot be in the past.');
      return;
    }
    if (isRoomOverCapacity) {
      setValidationError(
        `Selected sanctuary (${room.name}) accommodates maximum ${room.maxGuests} guests. Please choose our Private Pool Villa or reduce guest count.`
      );
      return;
    }
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setValidationError('Please complete all required guest contact fields.');
      return;
    }
    if (!agreeTerms) {
      setValidationError('Please acknowledge the retreat booking guidelines and demo policy.');
      return;
    }

    setIsSubmitting(true);

    // Simulate backend booking generation
    setTimeout(() => {
      const newBookingId = generateBookingId();
      const confirmedAddons = selectedAddons.map((id) => {
        const addon = BOOKING_ADDONS.find((a) => a.id === id)!;
        return {
          addon,
          quantity: addon.unit === 'per person' ? adults : 1,
        };
      });

      const newReservation: ConfirmedReservation = {
        bookingId: newBookingId,
        createdAt: new Date().toISOString(),
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nightsCount: nights,
        adults,
        children,
        totalGuests,
        room,
        selectedAddons: confirmedAddons,
        guest: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          specialRequests: specialRequests.trim() || undefined,
          arrivalTime,
        },
        pricing: {
          roomBaseTotal,
          addonsTotal,
          subtotal: taxableSubtotal,
          gstAmount,
          discountAmount,
          grandTotal,
          currency: 'INR',
        },
        status: 'confirmed',
        demoNotice: 'Demonstration Booking Record – No real payment was charged.',
      };

      saveBooking(newReservation);
      setIsSubmitting(false);
      onBookingConfirmed(newReservation);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#292929] pt-24 pb-24">
      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-10 text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
          Reservation Process
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal">
          Reserve Your Sanctuary
        </h1>
        <p className="text-xs md:text-sm text-[#292929]/75 font-light max-w-xl mx-auto">
          Experience unhurried time. All stays include daily organic estate breakfast, morning guided forest meditation, and spring pool access.
        </p>

        {/* Prominent Demo Notice */}
        <div className="inline-flex items-center gap-2 p-2.5 px-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left max-w-xl mx-auto mt-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Demo Booking Engine:</strong> Rooms, dates, and prices are fully interactive for demonstration. No real financial cards are processed.
          </span>
        </div>
      </section>

      {/* Main Reservation Layout: Form (Left) + Live Itemized Summary (Right) */}
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        <form onSubmit={handleSubmitBooking}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Step Controls */}
            <div className="lg:col-span-7 space-y-10">
              {/* Step 1: Stay Dates & Guests */}
              <div className="bg-white p-6 md:p-8 border border-[#AD9870]/30 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#AD9870]/20">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#263D32] text-white text-xs flex items-center justify-center font-semibold">
                      1
                    </span>
                    <h2 className="font-serif text-xl font-normal text-[#263D32]">
                      Dates of Sojourn & Party
                    </h2>
                  </div>
                  {nights > 0 && (
                    <span className="text-xs font-mono font-medium text-[#AD9870]">
                      {nights} {nights === 1 ? 'Night' : 'Nights'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#AD9870]" />
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (e.target.value >= checkOut) {
                          const d = new Date(e.target.value);
                          d.setDate(d.getDate() + 2);
                          setCheckOut(d.toISOString().split('T')[0]);
                        }
                      }}
                      className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#AD9870]" />
                      Check-Out Date
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#AD9870]" />
                      Adults (Age 12+)
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                    >
                      <option value={1}>1 Adult</option>
                      <option value={2}>2 Adults</option>
                      <option value={3}>3 Adults</option>
                      <option value={4}>4 Adults</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#AD9870]" />
                      Children (Under 12)
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
              </div>

              {/* Step 2: Choose Sanctuary Category */}
              <div className="bg-white p-6 md:p-8 border border-[#AD9870]/30 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#AD9870]/20">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#263D32] text-white text-xs flex items-center justify-center font-semibold">
                      2
                    </span>
                    <h2 className="font-serif text-xl font-normal text-[#263D32]">
                      Select Sanctuary Category
                    </h2>
                  </div>
                  <span className="text-xs text-[#292929]/70">
                    Party: {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ROOM_CATEGORIES.map((cat) => {
                    const isSelected = selectedRoomId === cat.id;
                    const exceeds = totalGuests > cat.maxGuests;

                    return (
                      <div
                        key={cat.id}
                        onClick={() => {
                          if (!exceeds) setSelectedRoomId(cat.id);
                        }}
                        className={`p-4 border text-left transition-all relative flex flex-col justify-between ${
                          exceeds
                            ? 'opacity-40 cursor-not-allowed bg-neutral-100 border-neutral-300'
                            : isSelected
                            ? 'border-[#263D32] bg-[#F5F2EA] ring-1 ring-[#263D32] cursor-pointer'
                            : 'border-[#AD9870]/30 hover:border-[#263D32]/50 cursor-pointer bg-white'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="aspect-16/10 overflow-hidden mb-2">
                            <img
                              src={cat.primaryImage}
                              alt={cat.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex items-baseline justify-between">
                            <h3 className="font-serif text-lg font-medium text-[#263D32]">
                              {cat.name}
                            </h3>
                            <span className="text-xs font-mono font-semibold text-[#263D32]">
                              {formatINR(cat.pricePerNight)}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#292929]/70">
                            <span>Max {cat.maxGuests} Guests · {cat.areaSqFt} sq. ft.</span>
                          </div>
                          <p className="text-[11px] text-[#292929]/75 line-clamp-2">
                            {cat.description}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#AD9870]/20 flex items-center justify-between text-[11px]">
                          <span className="text-[#AD9870]">
                            {cat.sampleAvailability} available
                          </span>
                          {exceeds ? (
                            <span className="text-rose-700">Max {cat.maxGuests} guests</span>
                          ) : isSelected ? (
                            <span className="font-semibold text-[#263D32] flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Selected
                            </span>
                          ) : (
                            <span className="text-[#263D32]/80 hover:underline">Choose</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {isRoomOverCapacity && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Your guest count ({totalGuests}) exceeds the capacity of {room.name} ({room.maxGuests} guests). Please choose Private Pool Villa.</span>
                  </div>
                )}
              </div>

              {/* Step 3: Bespoke Add-on Experiences */}
              <div className="bg-white p-6 md:p-8 border border-[#AD9870]/30 shadow-xs space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#AD9870]/20">
                  <span className="w-6 h-6 rounded-full bg-[#263D32] text-white text-xs flex items-center justify-center font-semibold">
                    3
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-normal text-[#263D32]">
                      Enhance Your Sojourn (Optional)
                    </h2>
                    <p className="text-xs text-[#292929]/60">
                      Curated rituals and private gastronomic experiences
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {BOOKING_ADDONS.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => handleToggleAddon(addon.id)}
                        className={`p-4 border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                          isChecked
                            ? 'border-[#263D32] bg-[#F5F2EA]'
                            : 'border-[#AD9870]/25 hover:border-[#AD9870]/60 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}} // handled by parent div
                            className="mt-1 accent-[#263D32]"
                          />
                          <div>
                            <div className="text-xs font-semibold text-[#263D32]">
                              {addon.name}
                            </div>
                            <p className="text-[11px] text-[#292929]/75 font-light mt-0.5">
                              {addon.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-mono text-xs font-semibold text-[#263D32]">
                            {formatINR(addon.price)}
                          </div>
                          <span className="text-[10px] text-[#292929]/60 block">{addon.unit}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Guest Contact & Preferences */}
              <div className="bg-white p-6 md:p-8 border border-[#AD9870]/30 shadow-xs space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#AD9870]/20">
                  <span className="w-6 h-6 rounded-full bg-[#263D32] text-white text-xs flex items-center justify-center font-semibold">
                    4
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-normal text-[#263D32]">
                      Lead Guest Information
                    </h2>
                    <p className="text-xs text-[#292929]/60">
                      Confirmation notice and arrival concierge details
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Maya"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sharma"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. maya.sharma@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                      Estimated Arrival Time at Retreat
                    </label>
                    <select
                      value={arrivalTime}
                      onChange={(e) => setArrivalTime(e.target.value)}
                      className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                    >
                      <option value="12:00">12:00 - 14:00 (Early Arrival / Lunch)</option>
                      <option value="14:00">14:00 (Standard Check-in Time)</option>
                      <option value="16:00">16:00 - 18:00 (Afternoon High Tea)</option>
                      <option value="19:00">19:00 - 21:00 (Evening / Dinner)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                      Special Dietary Needs & Sanctuary Preferences
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Vegan dietary preference, extra feather pillows, anniversary celebration..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                    />
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="pt-2 border-t border-[#AD9870]/20">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#AD9870]" />
                    Promotional Sanctuary Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try 'VAANA10' or 'NATURE'"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="bg-[#F5F2EA] border border-[#AD9870]/30 p-2 text-xs flex-1 uppercase font-mono tracking-wider focus:outline-hidden focus:border-[#263D32]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#263D32] border border-[#263D32] hover:bg-[#263D32] hover:text-white transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Promo '{appliedPromo}' applied: {PROMO_CODES[appliedPromo] * 100}% discount on room rate.
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-rose-700 mt-1">{promoError}</p>
                  )}
                </div>
              </div>

              {/* Step 5: Guarantee Type & Acknowledgement */}
              <div className="bg-white p-6 md:p-8 border border-[#AD9870]/30 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#AD9870]/20">
                  <span className="w-6 h-6 rounded-full bg-[#263D32] text-white text-xs flex items-center justify-center font-semibold">
                    5
                  </span>
                  <h2 className="font-serif text-xl font-normal text-[#263D32]">
                    Reservation Guarantee (Demo Mode)
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label
                    className={`p-3 border cursor-pointer flex items-center gap-2.5 ${
                      guaranteeType === 'pay-on-arrival'
                        ? 'border-[#263D32] bg-[#F5F2EA]'
                        : 'border-[#AD9870]/25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="guarantee"
                      value="pay-on-arrival"
                      checked={guaranteeType === 'pay-on-arrival'}
                      onChange={() => setGuaranteeType('pay-on-arrival')}
                      className="accent-[#263D32]"
                    />
                    <div>
                      <div className="font-semibold text-[#263D32]">Pay at Property upon Arrival</div>
                      <span className="text-[10px] text-[#292929]/70">No upfront charge needed</span>
                    </div>
                  </label>

                  <label
                    className={`p-3 border cursor-pointer flex items-center gap-2.5 ${
                      guaranteeType === 'demo-card'
                        ? 'border-[#263D32] bg-[#F5F2EA]'
                        : 'border-[#AD9870]/25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="guarantee"
                      value="demo-card"
                      checked={guaranteeType === 'demo-card'}
                      onChange={() => setGuaranteeType('demo-card')}
                      className="accent-[#263D32]"
                    />
                    <div>
                      <div className="font-semibold text-[#263D32]">Demo Card Pre-authorization</div>
                      <span className="text-[10px] text-[#292929]/70">Instant simulation approval</span>
                    </div>
                  </label>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2 text-xs text-[#292929]/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 accent-[#263D32]"
                      required
                    />
                    <span>
                      I understand that this is a simulated demo booking for Vaana Retreat. I acknowledge the tranquility guidelines (quiet hours after 22:00, zero single-use plastics) and flexible cancellation policy.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Sticky Itemized Price Summary */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="bg-white p-6 md:p-8 border border-[#AD9870]/40 shadow-xl space-y-6">
                <div className="space-y-1 pb-4 border-b border-[#AD9870]/20">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#AD9870] font-semibold block">
                    Your Stay Summary
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#263D32]">
                    Reservation Breakdown
                  </h3>
                </div>

                {/* Room Preview Mini-Card */}
                <div className="space-y-2">
                  <div className="aspect-16/9 overflow-hidden">
                    <img
                      src={room.primaryImage}
                      alt={room.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="font-serif text-lg font-medium text-[#263D32]">
                      {room.name}
                    </span>
                    <span className="text-xs font-mono font-medium text-[#263D32]">
                      {formatINR(room.pricePerNight)}/nt
                    </span>
                  </div>
                  <div className="text-[11px] text-[#292929]/70">
                    <span>{checkIn} → {checkOut} ({nights} nights · {totalGuests} guests)</span>
                  </div>
                </div>

                {/* Itemized Calculation */}
                <div className="pt-4 border-t border-[#AD9870]/20 space-y-2.5 text-xs">
                  <div className="flex justify-between text-[#292929]/80">
                    <span>Room Charges ({nights} nights)</span>
                    <span className="font-mono">{formatINR(roomBaseTotal)}</span>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between text-[#292929]/80">
                      <span>Add-on Experiences ({selectedAddons.length})</span>
                      <span className="font-mono">+{formatINR(addonsTotal)}</span>
                    </div>
                  )}

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-medium">
                      <span>Promotional Privilege ({appliedPromo})</span>
                      <span className="font-mono">-{formatINR(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#292929]/80">
                    <span>Luxury Hospitality GST (18%)</span>
                    <span className="font-mono">{formatINR(gstAmount)}</span>
                  </div>

                  <div className="pt-3 border-t border-[#AD9870]/25 flex items-baseline justify-between">
                    <div>
                      <span className="font-serif text-base font-semibold text-[#263D32] block">
                        Estimated Grand Total
                      </span>
                      <span className="text-[10px] text-[#292929]/60">All taxes and fees inclusive</span>
                    </div>
                    <span className="font-serif text-2xl font-bold text-[#263D32]">
                      {formatINR(grandTotal)}
                    </span>
                  </div>
                </div>

                {validationError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Final Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting || isRoomOverCapacity || nights <= 0}
                  className="w-full py-4 text-xs uppercase tracking-[0.2em] font-semibold text-white bg-[#263D32] hover:bg-[#1A2C23] disabled:opacity-40 transition-all duration-200 shadow-md"
                >
                  {isSubmitting ? 'Confirming Sanctuary...' : 'Complete Reservation'}
                </button>

                <div className="space-y-1.5 pt-2 text-[11px] text-[#292929]/70">
                  <p className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Instant booking confirmation ID issued</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Free cancellation up to 72 hours before arrival</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Concierge airport transfer assistance</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};
