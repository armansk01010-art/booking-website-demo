/**
 * Types for Vaana Retreat Luxury Resort
 */

export type PageId =
  | 'home'
  | 'about'
  | 'rooms'
  | 'room-detail'
  | 'experiences'
  | 'dining'
  | 'gallery'
  | 'booking'
  | 'contact'
  | 'confirmation';

export interface RoomAmenity {
  name: string;
  category: 'comfort' | 'wellness' | 'tech' | 'refreshment';
}

export interface RoomCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  pricePerNight: number;
  maxGuests: number;
  areaSqFt: number;
  bedType: string;
  view: string;
  description: string;
  detailedStory: string;
  primaryImage: string;
  galleryImages: string[];
  features: string[];
  amenities: string[];
  inclusions: string[];
  sampleAvailability: number; // available units
}

export interface ExperienceItem {
  id: string;
  title: string;
  category: 'Wellness & Spa' | 'Dining & Hearth' | 'Outdoors & Wilderness' | 'Cultural & Estate';
  duration: string;
  schedule: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  includedInStay: boolean;
  priceNote?: string;
}

export interface DiningVenue {
  id: string;
  name: string;
  concept: string;
  timings: string;
  cuisine: string;
  setting: string;
  image: string;
  description: string;
  menuHighlights: {
    category: string;
    items: {
      name: string;
      desc: string;
      dietary: 'vegan' | 'vegetarian' | 'organic' | 'gluten-free';
      price: string;
    }[];
  }[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'property' | 'rooms' | 'wellness' | 'dining' | 'surroundings';
  caption: string;
  src: string;
  featured?: boolean;
}

export interface BookingAddon {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: 'per person' | 'per booking' | 'per night';
  description: string;
}

export interface BookingFormState {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  roomId: string;
  selectedAddons: string[];
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
  estimatedArrivalTime: string;
  promoCode: string;
  agreeToTerms: boolean;
}

export interface ConfirmedReservation {
  bookingId: string;
  createdAt: string;
  checkInDate: string;
  checkOutDate: string;
  nightsCount: number;
  adults: number;
  children: number;
  totalGuests: number;
  room: RoomCategory;
  selectedAddons: {
    addon: BookingAddon;
    quantity: number;
  }[];
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests?: string;
    arrivalTime?: string;
  };
  pricing: {
    roomBaseTotal: number;
    addonsTotal: number;
    subtotal: number;
    gstAmount: number; // 18%
    discountAmount: number;
    grandTotal: number;
    currency: string;
  };
  status: 'confirmed' | 'cancelled';
  demoNotice: string;
}
