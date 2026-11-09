import { ConfirmedReservation, RoomCategory, BookingAddon } from '../types/retreat';
import { ROOM_CATEGORIES, BOOKING_ADDONS } from '../data/retreatData';

const STORAGE_KEY = 'vaana_retreat_bookings_v1';

export const PROMO_CODES: Record<string, number> = {
  VAANA10: 0.1, // 10% off room rate
  NATURE: 0.15, // 15% off room rate
  SERENE: 0.05, // 5% off
};

// Seed an initial demo reservation if empty
function initializeStorage(): ConfirmedReservation[] {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
      // ignore
    }
  }

  const sampleBooking: ConfirmedReservation = {
    bookingId: 'VN-48219',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    checkInDate: getFutureDate(3),
    checkOutDate: getFutureDate(6),
    nightsCount: 3,
    adults: 2,
    children: 0,
    totalGuests: 2,
    room: ROOM_CATEGORIES[1], // Deluxe Valley
    selectedAddons: [
      {
        addon: BOOKING_ADDONS[0], // Ayurvedic Massage
        quantity: 2,
      },
      {
        addon: BOOKING_ADDONS[1], // Chef dinner
        quantity: 1,
      },
    ],
    guest: {
      firstName: 'Aarav',
      lastName: 'Mehta',
      email: 'aarav.mehta@example.com',
      phone: '+91 98201 45678',
      specialRequests: 'Quiet room away from footpath, non-dairy almond milk preference for breakfast.',
      arrivalTime: '14:30',
    },
    pricing: {
      roomBaseTotal: 7500 * 3,
      addonsTotal: 2400 * 2 + 3600,
      subtotal: 7500 * 3 + 4800 + 3600,
      gstAmount: Math.round((7500 * 3 + 4800 + 3600) * 0.18),
      discountAmount: 0,
      grandTotal: Math.round((7500 * 3 + 4800 + 3600) * 1.18),
      currency: 'INR',
    },
    status: 'confirmed',
    demoNotice: 'Demonstration Booking Record – No real payment was processed or card charged.',
  };

  const initialList = [sampleBooking];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialList));
  return initialList;
}

export function getAllBookings(): ConfirmedReservation[] {
  if (typeof window === 'undefined') return [];
  return initializeStorage();
}

export function getBookingById(bookingId: string): ConfirmedReservation | null {
  const bookings = getAllBookings();
  const cleanId = bookingId.trim().toUpperCase();
  return bookings.find((b) => b.bookingId.toUpperCase() === cleanId) || null;
}

export function saveBooking(booking: ConfirmedReservation): void {
  const current = getAllBookings();
  // Check if exists
  const index = current.findIndex((b) => b.bookingId === booking.bookingId);
  if (index >= 0) {
    current[index] = booking;
  } else {
    current.unshift(booking);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

export function cancelBooking(bookingId: string): boolean {
  const current = getAllBookings();
  const target = current.find((b) => b.bookingId.toUpperCase() === bookingId.toUpperCase());
  if (target) {
    target.status = 'cancelled';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return true;
  }
  return false;
}

export function generateBookingId(): string {
  const chars = '0123456789';
  let rand = '';
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VN-${rand}`;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diffTime = outDate.getTime() - inDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

export function getFutureDate(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
