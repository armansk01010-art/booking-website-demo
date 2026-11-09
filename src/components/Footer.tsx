import React from 'react';
import { PageId } from '../types/retreat';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenLookup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLookup }) => {
  return (
    <footer className="bg-[#1A2C23] text-[#F5F2EA] pt-16 pb-12 border-t border-[#AD9870]/25">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          {/* Col 1: Wordmark & Philosophy */}
          <div className="space-y-4">
            <div className="font-serif text-2xl tracking-[0.25em] font-medium uppercase text-[#F5F2EA]">
              VAANA RETREAT
            </div>
            <p className="text-xs leading-relaxed text-[#F5F2EA]/75 max-w-sm">
              A 75-acre sustainable ecological haven tucked within the high-canopy rainforest of the
              Western Ghats. Dedicated to silent luxury, regenerative architecture, and mindful hospitality.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#AD9870]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Certified Sustainable Sanctuary · Zero-Plastic Estate</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#AD9870]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F2EA]/80">
              <li>
                <button
                  onClick={() => onNavigate('rooms')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Suites & Pool Villas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Wellness & Ayurveda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dining')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  The Prana Pavilion & Hearth
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Visual Archive & Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Our Heritage & Ecology Story
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Guest Services */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#AD9870]">
              Guest Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F2EA]/80">
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Reserve a Sanctuary
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLookup}
                  className="hover:text-white hover:underline transition-colors text-left text-[#AD9870] font-medium"
                >
                  Manage / Lookup Reservation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Arrival Guide & Transfers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Private Celebrations & Retreats
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Sanctuary Location & Inquiries */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#AD9870]">
              The Sanctuary
            </h4>
            <div className="space-y-2.5 text-xs text-[#F5F2EA]/80">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#AD9870] shrink-0 mt-0.5" />
                <span>Valley Mist Ridge, Meppadi Hills, Wayanad 673577, Kerala, India</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#AD9870] shrink-0" />
                <span>+91 4936 288 400 / +91 94471 20088</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#AD9870] shrink-0" />
                <span>concierge@vaanaretreat.com</span>
              </p>
              <p className="flex items-center gap-2.5 text-[11px] text-[#F5F2EA]/60 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#AD9870] shrink-0" />
                <span>Check-in: 14:00 · Check-out: 11:00</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demo Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F5F2EA]/60">
          <p>© {new Date().getFullYear()} Vaana Retreat Pvt. Ltd. All rights reserved.</p>
          <div className="p-2 px-3 bg-white/5 border border-white/10 rounded-sm text-[11px] text-[#AD9870] text-center md:text-right">
            <span>Demo Hospitality Platform · Sample Availability & Rates for Illustrative Purposes</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
