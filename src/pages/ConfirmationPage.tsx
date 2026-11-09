import React, { useState } from 'react';
import { PageId, ConfirmedReservation } from '../types/retreat';
import { formatINR, cancelBooking } from '../services/bookingStorage';
import {
  CheckCircle2,
  Calendar,
  Users,
  Printer,
  Compass,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Download,
} from 'lucide-react';

interface ConfirmationPageProps {
  reservation: ConfirmedReservation;
  onNavigate: (page: PageId) => void;
  onReservationUpdated?: (updated: ConfirmedReservation) => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  reservation,
  onNavigate,
  onReservationUpdated,
}) => {
  const [currentStatus, setCurrentStatus] = useState(reservation.status);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [showPrintToast, setShowPrintToast] = useState(false);

  const handlePrint = () => {
    setShowPrintToast(true);
    setTimeout(() => {
      window.print();
      setShowPrintToast(false);
    }, 400);
  };

  const handleCancelReservation = () => {
    cancelBooking(reservation.bookingId);
    setCurrentStatus('cancelled');
    if (onReservationUpdated) {
      onReservationUpdated({ ...reservation, status: 'cancelled' });
    }
    setCancelModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#292929] pt-24 pb-24 print:bg-white print:pt-6 print:pb-6">
      <div className="max-w-4xl mx-auto px-6 md:px-10 space-y-8">
        {/* Status Banner */}
        <div className="bg-white p-8 md:p-10 border border-[#AD9870]/30 shadow-md text-center space-y-4">
          <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
              Reservation Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#263D32] font-normal">
              We Look Forward to Welcoming You
            </h1>
            <p className="text-xs md:text-sm text-[#292929]/75 font-light max-w-lg mx-auto">
              Your sanctuary reservation at Vaana Retreat has been confirmed. A confirmation copy has been dispatched to{' '}
              <strong className="font-semibold text-[#263D32]">{reservation.guest.email}</strong>.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
            <div className="p-3 bg-[#F5F2EA] border border-[#AD9870]/30 font-mono text-sm font-semibold text-[#263D32]">
              Booking Reference: {reservation.bookingId}
            </div>

            <span
              className={`px-3 py-1.5 uppercase tracking-wider text-xs font-semibold ${
                currentStatus === 'confirmed'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              Status: {currentStatus}
            </span>
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#263D32] border border-[#AD9870]/40 hover:bg-[#AD9870]/10 transition-colors"
            >
              <Printer className="w-4 h-4 text-[#AD9870]" />
              <span>Print / Save Receipt</span>
            </button>

            {currentStatus === 'confirmed' && (
              <button
                onClick={() => setCancelModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold text-rose-800 border border-rose-300 hover:bg-rose-50 transition-colors"
              >
                <span>Cancel Reservation</span>
              </button>
            )}
          </div>
        </div>

        {/* Itemized Reservation Details Card */}
        <div className="bg-white p-8 md:p-10 border border-[#AD9870]/30 shadow-md space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#AD9870]/20">
            <div>
              <div className="font-serif text-2xl font-normal text-[#263D32]">
                {reservation.room.name}
              </div>
              <p className="text-xs text-[#292929]/70 italic font-serif">
                {reservation.room.tagline}
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-[#292929]/75 font-mono">
              <div>Reserved on {new Date(reservation.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</div>
            </div>
          </div>

          {/* Stay Specifics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs bg-[#F5F2EA]/60 p-5 border border-[#AD9870]/20">
            <div className="space-y-1">
              <span className="text-[10px] uppercase text-[#AD9870] font-semibold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Stay Dates
              </span>
              <p className="font-medium text-[#263D32]">
                {reservation.checkInDate} → {reservation.checkOutDate}
              </p>
              <span className="text-[#292929]/65">
                ({reservation.nightsCount} {reservation.nightsCount === 1 ? 'Night' : 'Nights'})
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase text-[#AD9870] font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Guests
              </span>
              <p className="font-medium text-[#263D32]">
                {reservation.totalGuests} Guests
              </p>
              <span className="text-[#292929]/65">
                ({reservation.adults} Adults{reservation.children > 0 ? `, ${reservation.children} Children` : ''})
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase text-[#AD9870] font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Check-in Time
              </span>
              <p className="font-medium text-[#263D32]">
                From 14:00 (Est: {reservation.guest.arrivalTime || '14:00'})
              </p>
              <span className="text-[#292929]/65">Check-out by 11:00</span>
            </div>
          </div>

          {/* Guest Information */}
          <div className="space-y-2 text-xs">
            <h3 className="font-serif text-lg font-normal text-[#263D32]">Guest Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#292929]/80">
              <p>
                <strong className="text-[#263D32]">Lead Guest:</strong> {reservation.guest.firstName} {reservation.guest.lastName}
              </p>
              <p>
                <strong className="text-[#263D32]">Contact Email:</strong> {reservation.guest.email}
              </p>
              <p>
                <strong className="text-[#263D32]">Telephone:</strong> {reservation.guest.phone}
              </p>
              {reservation.guest.specialRequests && (
                <p className="sm:col-span-2">
                  <strong className="text-[#263D32]">Special Preferences:</strong> {reservation.guest.specialRequests}
                </p>
              )}
            </div>
          </div>

          {/* Selected Addons Breakdown */}
          {reservation.selectedAddons.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[#AD9870]/20 text-xs">
              <h3 className="font-serif text-lg font-normal text-[#263D32]">Bespoke Inclusions</h3>
              <div className="space-y-2">
                {reservation.selectedAddons.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[#292929]/80">
                    <span>
                      {item.addon.name} ({item.quantity} {item.addon.unit})
                    </span>
                    <span className="font-mono">{formatINR(item.addon.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Ledger */}
          <div className="pt-6 border-t border-[#AD9870]/25 space-y-2 text-xs">
            <h3 className="font-serif text-lg font-normal text-[#263D32] mb-3">Itemized Account</h3>
            <div className="flex justify-between text-[#292929]/80">
              <span>Sanctuary Room Rate ({reservation.nightsCount} nights)</span>
              <span className="font-mono">{formatINR(reservation.pricing.roomBaseTotal)}</span>
            </div>
            {reservation.pricing.addonsTotal > 0 && (
              <div className="flex justify-between text-[#292929]/80">
                <span>Add-on Experiences</span>
                <span className="font-mono">{formatINR(reservation.pricing.addonsTotal)}</span>
              </div>
            )}
            {reservation.pricing.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Privilege Discount</span>
                <span className="font-mono">-{formatINR(reservation.pricing.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-[#292929]/80">
              <span>Luxury Hospitality GST (18%)</span>
              <span className="font-mono">{formatINR(reservation.pricing.gstAmount)}</span>
            </div>
            <div className="pt-3 border-t border-[#AD9870]/25 flex justify-between items-baseline text-base font-semibold text-[#263D32]">
              <span>Grand Total</span>
              <span className="font-mono text-xl">{formatINR(reservation.pricing.grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Arrival Guide & Sanctuary Guidelines */}
        <div className="bg-[#EAE4D7]/40 p-6 md:p-8 border border-[#AD9870]/30 space-y-4 text-xs text-[#292929]/80">
          <h3 className="font-serif text-xl font-normal text-[#263D32] flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#AD9870]" />
            <span>Essential Arrival Information</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <strong className="block text-[#263D32] mb-1">Getting to Vaana</strong>
              <p className="font-light leading-relaxed">
                Located 2.5 hours by scenic road from Calicut International Airport (CCJ). Our private chauffeur service can be dispatched upon request.
              </p>
            </div>
            <div>
              <strong className="block text-[#263D32] mb-1">What to Bring</strong>
              <p className="font-light leading-relaxed">
                Evenings on the ridge are cool (16°C – 20°C). We recommend comfortable walking boots for nature trails, warm woolens, and swimwear for the spring pool.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Sanctuary CTA */}
        <div className="text-center pt-4 print:hidden">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold text-white bg-[#263D32] hover:bg-[#1A2C23] transition-colors"
          >
            <span>Return to Sanctuary Overview</span>
            <ArrowRight className="w-4 h-4 text-[#AD9870]" />
          </button>
        </div>
      </div>

      {/* Cancel Confirmation Dialog Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setCancelModalOpen(false)} />
          <div className="relative bg-[#F5F2EA] p-6 max-w-md w-full border border-rose-300 shadow-2xl z-10 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-rose-800 font-serif text-xl">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Cancel Reservation {reservation.bookingId}?</span>
            </div>
            <p className="text-[#292929]/80 leading-relaxed font-light">
              Are you certain you wish to release your reservation for {reservation.room.name}? Because this is a demonstration environment, no cancellation fees apply.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="px-4 py-2 border border-[#AD9870]/40 text-[#292929] hover:bg-black/5"
              >
                Keep Reservation
              </button>
              <button
                onClick={handleCancelReservation}
                className="px-4 py-2 bg-rose-800 text-white font-semibold hover:bg-rose-900"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
