/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, ConfirmedReservation } from './types/retreat';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingLookupModal } from './components/BookingLookupModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { RoomsPage } from './pages/RoomsPage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { DiningPage } from './pages/DiningPage';
import { GalleryPage } from './pages/GalleryPage';
import { BookingPage } from './pages/BookingPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { ContactPage } from './pages/ContactPage';
import { getAllBookings } from './services/bookingStorage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('deluxe-valley');
  const [activeReservation, setActiveReservation] = useState<ConfirmedReservation | null>(() => {
    const list = getAllBookings();
    return list.length > 0 ? list[0] : null;
  });

  // Pre-filled booking parameters from search or room widgets
  const [bookingParams, setBookingParams] = useState<{
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    roomId?: string;
  }>({});

  // Lookup Modal state
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  // Scroll to top on page switch
  const navigateTo = (page: PageId, roomId?: string) => {
    if (roomId) {
      setSelectedRoomId(roomId);
    }
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Sync hash on initial load & popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'about',
        'rooms',
        'room-detail',
        'experiences',
        'dining',
        'gallery',
        'booking',
        'contact',
        'confirmation',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  // Handle search from HomePage widget
  const handleHomeSearch = (params: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    roomId?: string;
  }) => {
    setBookingParams(params);
    if (params.roomId) {
      setSelectedRoomId(params.roomId);
    }
    navigateTo('booking', params.roomId);
  };

  // Handle booking directly with dates from RoomDetailPage
  const handleBookWithDates = (params: {
    roomId: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }) => {
    setBookingParams({
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      adults: params.adults,
      children: params.children,
      roomId: params.roomId,
    });
    setSelectedRoomId(params.roomId);
    navigateTo('booking', params.roomId);
  };

  // Handle successful reservation creation
  const handleBookingConfirmed = (reservation: ConfirmedReservation) => {
    setActiveReservation(reservation);
    navigateTo('confirmation');
  };

  // Handle lookup selection
  const handleSelectFromLookup = (reservation: ConfirmedReservation) => {
    setActiveReservation(reservation);
    navigateTo('confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#292929] selection:bg-[#AD9870]/20 selection:text-[#263D32]">
      {/* Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenLookup={() => setIsLookupOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={navigateTo} onSearch={handleHomeSearch} />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}

        {currentPage === 'rooms' && <RoomsPage onNavigate={navigateTo} />}

        {currentPage === 'room-detail' && (
          <RoomDetailPage
            roomId={selectedRoomId}
            onNavigate={navigateTo}
            onBookWithDates={handleBookWithDates}
          />
        )}

        {currentPage === 'experiences' && <ExperiencesPage onNavigate={navigateTo} />}

        {currentPage === 'dining' && <DiningPage onNavigate={navigateTo} />}

        {currentPage === 'gallery' && <GalleryPage onNavigate={navigateTo} />}

        {currentPage === 'booking' && (
          <BookingPage
            initialRoomId={bookingParams.roomId || selectedRoomId}
            initialCheckIn={bookingParams.checkIn}
            initialCheckOut={bookingParams.checkOut}
            initialAdults={bookingParams.adults ?? 2}
            initialChildren={bookingParams.children ?? 0}
            onBookingConfirmed={handleBookingConfirmed}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'confirmation' && activeReservation && (
          <ConfirmationPage
            reservation={activeReservation}
            onNavigate={navigateTo}
            onReservationUpdated={(updated) => setActiveReservation(updated)}
          />
        )}

        {currentPage === 'confirmation' && !activeReservation && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center pt-24 px-6 text-center space-y-4">
            <h2 className="font-serif text-3xl text-[#263D32]">No Active Reservation Selected</h2>
            <p className="text-xs text-[#292929]/70 max-w-sm">
              You can search for an existing reservation using your booking reference or make a new reservation.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsLookupOpen(true)}
                className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#263D32] border border-[#263D32]"
              >
                Lookup by ID
              </button>
              <button
                onClick={() => navigateTo('booking')}
                className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-[#263D32]"
              >
                New Booking
              </button>
            </div>
          </div>
        )}

        {currentPage === 'contact' && <ContactPage onNavigate={navigateTo} />}
      </main>

      {/* Global Booking Lookup Dialog */}
      <BookingLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
        onSelectBooking={handleSelectFromLookup}
        onNavigate={navigateTo}
      />

      {/* Quiet Luxury Footer */}
      <Footer onNavigate={navigateTo} onOpenLookup={() => setIsLookupOpen(true)} />
    </div>
  );
}
