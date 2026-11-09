import React, { useState } from 'react';
import { X, Search, CheckCircle2, AlertCircle, Calendar, Users, MapPin } from 'lucide-react';
import { getBookingById, cancelBooking, formatINR } from '../services/bookingStorage';
import { ConfirmedReservation, PageId } from '../types/retreat';

interface BookingLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBooking: (booking: ConfirmedReservation) => void;
  onNavigate: (page: PageId) => void;
}

export const BookingLookupModal: React.FC<BookingLookupModalProps> = ({
  isOpen,
  onClose,
  onSelectBooking,
}) => {
  const [bookingIdInput, setBookingIdInput] = useState('');
  const [searchedRecord, setSearchedRecord] = useState<ConfirmedReservation | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingIdInput.trim()) return;
    const found = getBookingById(bookingIdInput);
    setSearchedRecord(found);
    setHasSearched(true);
    setCancelSuccess(false);
  };

  const handleCancel = () => {
    if (!searchedRecord) return;
    const ok = window.confirm(
      `Are you sure you wish to cancel reservation ${searchedRecord.bookingId}? This is a simulated demo action.`
    );
    if (ok) {
      setIsCancelling(true);
      setTimeout(() => {
        cancelBooking(searchedRecord.bookingId);
        setSearchedRecord({ ...searchedRecord, status: 'cancelled' });
        setIsCancelling(false);
        setCancelSuccess(true);
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-[#F5F2EA] text-[#292929] max-w-lg w-full p-6 md:p-8 border border-[#AD9870]/40 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#AD9870]/20">
          <div>
            <h3 className="font-serif text-2xl font-medium text-[#263D32]">Find Your Reservation</h3>
            <p className="text-xs text-[#292929]/70 mt-0.5">
              Enter your 7-character booking ID (e.g. <span className="font-mono font-medium">VN-48219</span>)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#292929]/70 hover:text-[#263D32] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mt-5 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. VN-48219"
              value={bookingIdInput}
              onChange={(e) => {
                setBookingIdInput(e.target.value.toUpperCase());
                setHasSearched(false);
              }}
              className="flex-1 bg-white border border-[#AD9870]/40 px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider focus:outline-hidden focus:border-[#263D32] focus:ring-1 focus:ring-[#263D32]"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-[#263D32] hover:bg-[#1A2C23] flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </div>
          <p className="text-[11px] text-[#292929]/60">
            Tip: You can use sample booking reference <button type="button" onClick={() => setBookingIdInput('VN-48219')} className="underline text-[#263D32] font-mono font-semibold">VN-48219</button> to test.
          </p>
        </form>

        {/* Search Results */}
        {hasSearched && (
          <div className="mt-6 pt-5 border-t border-[#AD9870]/20">
            {searchedRecord ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-[#263D32]">
                    {searchedRecord.bookingId}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 uppercase tracking-wider font-semibold rounded-xs ${
                      searchedRecord.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {searchedRecord.status}
                  </span>
                </div>

                <div className="bg-white p-4 border border-[#AD9870]/25 space-y-2.5 text-xs">
                  <div className="font-serif text-lg font-medium text-[#263D32]">
                    {searchedRecord.room.name}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[#292929]/80">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#AD9870]" />
                      <span>{searchedRecord.checkInDate} → {searchedRecord.checkOutDate}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#AD9870]" />
                      <span>{searchedRecord.totalGuests} Guests ({searchedRecord.nightsCount} Nights)</span>
                    </p>
                  </div>
                  <div className="pt-1 text-[#292929]/80">
                    <span>Guest: {searchedRecord.guest.firstName} {searchedRecord.guest.lastName} ({searchedRecord.guest.email})</span>
                  </div>
                  <div className="pt-1 flex items-center justify-between border-t border-[#AD9870]/15">
                    <span className="text-[#292929]/70">Grand Total:</span>
                    <span className="font-serif text-base font-semibold text-[#263D32]">
                      {formatINR(searchedRecord.pricing.grandTotal)}
                    </span>
                  </div>
                </div>

                {cancelSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>Reservation successfully cancelled.</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    onClick={() => {
                      onSelectBooking(searchedRecord);
                      onClose();
                    }}
                    className="flex-1 py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-[#263D32] hover:bg-[#1A2C23] text-center"
                  >
                    View Full Details & Receipt
                  </button>

                  {searchedRecord.status === 'confirmed' && (
                    <button
                      onClick={handleCancel}
                      disabled={isCancelling}
                      className="px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-rose-800 border border-rose-300 hover:bg-rose-50 text-center"
                    >
                      {isCancelling ? 'Processing...' : 'Cancel Stay'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-[#292929]/70 space-y-2">
                <AlertCircle className="w-7 h-7 mx-auto text-[#AD9870]" />
                <p>No reservation found for reference "{bookingIdInput}".</p>
                <p className="text-[11px] text-[#292929]/50">
                  Please verify the ID on your confirmation email or make a new reservation.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
