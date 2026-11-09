import React, { useState } from 'react';
import { PageId } from '../types/retreat';
import { MapPin, Phone, Mail, Clock, Compass, CheckCircle2, ChevronDown, ChevronUp, Send } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Sanctuary Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'What is the climate like across the year at Vaana?',
      a: 'Perched at 1,150m elevation, Vaana enjoys pleasant temperatures year-round. October through March features crisp, misty mornings (16°C – 24°C). The monsoon (June to September) is magical, with dramatic cloud cascades, while summer (April to May) remains comfortably cooler than the plains.',
    },
    {
      q: 'Do you arrange airport or railway transfers?',
      a: 'Yes, our concierge arranges private chauffeur transfers in luxury hybrid SUVs from Calicut International Airport (2.5 hours), Kannur Airport (3 hours), and Mysore Railway Station (3.5 hours). Transfers can be booked directly during reservation.',
    },
    {
      q: 'Can dietary preferences (such as vegan, gluten-free, or Jain) be accommodated?',
      a: 'Absolutely. Every meal at The Prana Pavilion is customized to personal health or philosophical requirements. We ask for dietary notes prior to arrival so Chef Ananya can source suitable fresh ingredients.',
    },
    {
      q: 'What is your children and pet policy?',
      a: 'We welcome children of all ages; our Private Pool Villa is ideal for families. Because the property is a designated wildlife sanctuary bordering primary forests, domestic pets are not permitted in order to safeguard local fauna.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#292929] pt-24 pb-24">
      {/* Page Header */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
          <Compass className="w-3.5 h-3.5 text-[#AD9870]" />
          <span>Connect with the Sanctuary</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#263D32] font-normal">
          Inquiries, Location & Concierge
        </h1>
        <p className="text-sm md:text-base text-[#292929]/75 font-light max-w-2xl mx-auto leading-relaxed">
          Whether planning an intimate retreat, private celebration, or seeking bespoke travel guidance, our resident hosts are at your disposal.
        </p>
      </section>

      {/* Main Grid: Contact Cards & Inquiry Form */}
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Points & Location Guide */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 md:p-8 border border-[#AD9870]/30 shadow-xs space-y-6">
              <h3 className="font-serif text-2xl font-normal text-[#263D32]">
                Sanctuary Address
              </h3>

              <div className="space-y-4 text-xs text-[#292929]/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#AD9870] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#263D32] mb-0.5">Physical Sanctuary</strong>
                    <span>Valley Mist Ridge, Meppadi Hills, Wayanad 673577, Kerala, India</span>
                    <span className="block text-[11px] text-[#AD9870] mt-0.5">GPS: 11.5518° N, 76.1287° E</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#AD9870] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#263D32] mb-0.5">Direct Lines</strong>
                    <span>Reservations: +91 4936 288 400</span>
                    <span className="block">Concierge Mobile: +91 94471 20088</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#AD9870] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#263D32] mb-0.5">Electronic Inquiries</strong>
                    <span>reservations@vaanaretreat.com</span>
                    <span className="block">experiences@vaanaretreat.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#AD9870] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#263D32] mb-0.5">Sanctuary Timings</strong>
                    <span>Resident Check-In: 14:00 onwards</span>
                    <span className="block">Check-Out: 11:00</span>
                    <span className="block text-[11px] text-[#292929]/60">Concierge Desk: 24 Hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Connections */}
            <div className="bg-[#EAE4D7]/50 p-6 md:p-8 border border-[#AD9870]/30 space-y-4 text-xs">
              <h3 className="font-serif text-xl font-normal text-[#263D32]">
                Reaching the Ridge
              </h3>
              <div className="space-y-3 text-[#292929]/80 font-light">
                <div className="pb-2 border-b border-[#AD9870]/20">
                  <strong className="text-[#263D32] font-semibold block">Calicut International Airport (CCJ)</strong>
                  <span>85 km · 2.5 hours via Thamarassery Ghat scenic bypass.</span>
                </div>
                <div className="pb-2 border-b border-[#AD9870]/20">
                  <strong className="text-[#263D32] font-semibold block">Kannur International Airport (CNN)</strong>
                  <span>110 km · 3.0 hours through scenic Western Ghat passes.</span>
                </div>
                <div>
                  <strong className="text-[#263D32] font-semibold block">Mysore Railway Station (MYS)</strong>
                  <span>130 km · 3.5 hours driving through Bandipur & Wayanad reserves.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form & FAQs */}
          <div className="lg:col-span-7 space-y-10">
            {/* Form */}
            <div className="bg-white p-8 md:p-10 border border-[#AD9870]/30 shadow-md space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#AD9870] font-semibold block">
                  Direct Concierge
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#263D32]">
                  Send a Message or Request
                </h3>
              </div>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Inquiry Dispatched to Concierge</span>
                  </div>
                  <p className="font-light text-emerald-900 leading-relaxed">
                    Thank you, {name}. A member of our host team will respond to {email} within 4 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-3 text-xs uppercase tracking-wider font-semibold text-[#263D32] underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Radhika Verma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        placeholder="e.g. radhika@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                        Telephone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                        Nature of Inquiry
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                      >
                        <option value="General Sanctuary Inquiry">General Stay Inquiry</option>
                        <option value="Private Wedding / Whole-Estate Buyout">Private Celebration / Buyout</option>
                        <option value="Ayurveda Wellness Custom Program">Ayurvedic Wellness Program</option>
                        <option value="Dining & Table Reservations">The Prana Pavilion Table</option>
                        <option value="Transport & Chauffeur Services">Airport Transport Arrangements</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#263D32] mb-1">
                      Your Message or Special Requirements *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your planned dates, number of guests, or questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#F5F2EA] border border-[#AD9870]/30 p-2.5 text-xs text-[#292929] focus:outline-hidden focus:border-[#263D32]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold text-white bg-[#263D32] hover:bg-[#1A2C23] transition-colors"
                  >
                    <span>Transmit Inquiry</span>
                    <Send className="w-3.5 h-3.5 text-[#AD9870]" />
                  </button>
                </form>
              )}
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white p-6 md:p-8 border border-[#AD9870]/30 shadow-xs space-y-4">
              <h3 className="font-serif text-2xl font-normal text-[#263D32]">
                Frequently Inquired Inquiries
              </h3>

              <div className="divide-y divide-[#AD9870]/20">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="py-3">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between text-left text-xs font-semibold text-[#263D32] hover:text-[#AD9870] transition-colors py-1"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#AD9870] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#AD9870] shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <p className="pt-2 text-xs text-[#292929]/75 font-light leading-relaxed animate-in fade-in duration-200">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
