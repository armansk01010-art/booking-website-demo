import React, { useState, useEffect } from 'react';
import { PageId } from '../types/retreat';
import { Menu, X, CalendarCheck, Compass } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, roomId?: string) => void;
  onOpenLookup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenLookup }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageId }[] = [
    { label: 'Sanctuary', page: 'home' },
    { label: 'Suites & Villas', page: 'rooms' },
    { label: 'Experiences', page: 'experiences' },
    { label: 'Dining', page: 'dining' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Story', page: 'about' },
  ];

  return (
    <>
      {/* Top Bar - Strictly adhering to 3-zone Top Bar Contract */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5F2EA]/95 backdrop-blur-md shadow-xs border-b border-[#AD9870]/20 py-3.5'
            : 'bg-gradient-to-b from-black/60 via-black/25 to-transparent text-white py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element in Cormorant Garamond display) */}
          <button
            onClick={() => onNavigate('home')}
            className={`font-serif text-2xl md:text-3xl tracking-[0.2em] font-medium uppercase whitespace-nowrap shrink-0 text-left transition-colors duration-200 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#AD9870] ${
              isScrolled ? 'text-[#263D32]' : 'text-[#F5F2EA]'
            }`}
          >
            VAANA
            <span className="block text-[10px] tracking-[0.35em] font-sans font-normal opacity-80 mt-[-3px]">
              RETREAT
            </span>
          </button>

          {/* Zone 2: 4-6 clean single-line text navigation links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 text-xs tracking-[0.16em] uppercase font-medium"
          >
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 group focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#AD9870] ${
                    isScrolled
                      ? isActive
                        ? 'text-[#263D32] font-semibold'
                        : 'text-[#292929]/75 hover:text-[#263D32]'
                      : isActive
                      ? 'text-white font-semibold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#AD9870] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action button + lookup affordance */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenLookup}
              title="Lookup existing reservation"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider uppercase font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 ${
                isScrolled
                  ? 'border-[#AD9870]/40 text-[#263D32] hover:bg-[#AD9870]/10'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5 text-[#AD9870]" />
              <span>My Booking</span>
            </button>

            <button
              onClick={() => onNavigate('booking')}
              className="px-5 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase text-white bg-[#263D32] hover:bg-[#1A2C23] border border-[#263D32] shadow-xs transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#AD9870]"
            >
              Reserve Stay
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`lg:hidden p-2 rounded-sm transition-colors ${
                isScrolled ? 'text-[#263D32] hover:bg-black/5' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Side Drawer */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-[#F5F2EA] text-[#292929] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#AD9870]/20">
                <div className="font-serif text-xl tracking-[0.2em] font-medium text-[#263D32] uppercase">
                  VAANA RETREAT
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-[#292929]/70 hover:text-[#263D32]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1 py-6">
                {navLinks.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => {
                      onNavigate(item.page);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-3 text-sm tracking-[0.14em] uppercase font-medium transition-colors ${
                      currentPage === item.page
                        ? 'text-[#263D32] bg-[#AD9870]/15 font-semibold'
                        : 'text-[#292929]/80 hover:text-[#263D32] hover:bg-[#EAE4D7]/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    onNavigate('contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-3 text-sm tracking-[0.14em] uppercase font-medium transition-colors ${
                    currentPage === 'contact'
                      ? 'text-[#263D32] bg-[#AD9870]/15 font-semibold'
                      : 'text-[#292929]/80 hover:text-[#263D32] hover:bg-[#EAE4D7]/50'
                  }`}
                >
                  Contact & Location
                </button>
              </div>
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="pt-6 border-t border-[#AD9870]/20 space-y-3">
              <button
                onClick={() => {
                  onOpenLookup();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider font-medium text-[#263D32] border border-[#AD9870]/40 hover:bg-[#AD9870]/10"
              >
                <CalendarCheck className="w-4 h-4 text-[#AD9870]" />
                <span>Lookup Reservation</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('booking');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 text-xs uppercase tracking-[0.15em] font-semibold text-white bg-[#263D32] hover:bg-[#1A2C23]"
              >
                Book Your Stay
              </button>

              <p className="text-[11px] text-[#292929]/60 text-center flex items-center justify-center gap-1.5 pt-2">
                <Compass className="w-3.5 h-3.5 text-[#AD9870]" />
                <span>Wayanad Hills, Kerala, India</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
