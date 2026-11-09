import React from 'react';
import { PageId, RoomCategory } from '../types/retreat';
import { ROOM_CATEGORIES, EXPERIENCES, RESORT_FACTS, RESORT_IMAGES } from '../data/retreatData';
import { BookingSearchWidget } from '../components/BookingSearchWidget';
import { SafeImage } from '../components/SafeImage';
import { ArrowRight, Sparkles, Compass, Wind, Droplets, Sun, ChevronRight } from 'lucide-react';
import { formatINR } from '../services/bookingStorage';

interface HomePageProps {
  onNavigate: (page: PageId, roomId?: string) => void;
  onSearch: (params: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    roomId?: string;
  }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSearch }) => {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#292929]">
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0 bg-[#1b2b22]">
          <SafeImage
            src={RESORT_IMAGES.hero}
            alt="Vaana Retreat Secluded Rainforest Sanctuary at Dusk"
            pictureSources={[
              { media: '(max-width: 767px)', srcSet: RESORT_IMAGES.heroMobile },
              { media: '(min-width: 768px)', srcSet: RESORT_IMAGES.hero },
            ]}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            width={1920}
            height={1080}
            className="scale-105"
            wrapperClassName="w-full h-full bg-[#1b2b22]"
          />
          {/* Measured Scrim ensuring WCAG AA contrast for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white pt-24 pb-32 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#AD9870] font-medium">
            <Compass className="w-3.5 h-3.5 text-[#AD9870]" />
            <span>Western Ghats Canopy · Kerala, India</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#F5F2EA] leading-[1.08] text-balance max-w-4xl mx-auto">
            Where Ancient Forest Meets Silent Architectural Luxury
          </h1>

          <p className="text-sm md:text-base text-[#F5F2EA]/85 font-light max-w-2xl mx-auto leading-relaxed">
            Secluded private villas, mineral spring plunge pools, and bespoke Ayurvedic rituals nestled within 75 acres of protected mountain rainforest.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase text-white bg-[#263D32] hover:bg-[#1A2C23] border border-[#AD9870]/40 transition-all duration-200 shadow-lg"
            >
              Reserve Your Sanctuary
            </button>
            <button
              onClick={() => onNavigate('rooms')}
              className="px-8 py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#F5F2EA] hover:text-white border border-white/40 hover:border-white transition-all duration-200 backdrop-blur-xs"
            >
              Explore Sanctuaries
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[11px] uppercase tracking-[0.2em] text-[#F5F2EA]/70 flex flex-col items-center gap-1.5 animate-bounce">
          <span>Explore</span>
          <span className="w-[1px] h-4 bg-[#AD9870]" />
        </div>
      </section>

      {/* Floating Booking Search Bar (Hero Split Anchor) */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <BookingSearchWidget onSearch={onSearch} />
      </div>

      {/* 2. Philosophy & Introduction */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
              The Philosophy
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#263D32] leading-tight text-balance">
              Restoring the cadence of quiet human living
            </h2>
            <div className="w-12 h-[1.5px] bg-[#AD9870]" />
            <p className="text-sm leading-relaxed text-[#292929]/80 font-light">
              Vaana was conceived not merely as a luxury retreat, but as a silent sanctuary from modern acceleration. Set upon a high ridge where cool mountain mists embrace cardamom and ancient silver oaks, our low-density estate is rooted in biophilic architecture, unhurried time, and deep ecological restoration.
            </p>
            <p className="text-sm leading-relaxed text-[#292929]/80 font-light">
              Here, rooms are constructed without felling a single native tree, spring water flows directly to stone plunge baths, and meals are harvested each morning from heirloom seed patches.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#263D32] hover:text-[#1A2C23] group"
              >
                <span>Read Our Heritage Story</span>
                <ArrowRight className="w-4 h-4 text-[#AD9870] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <SafeImage
                src={RESORT_IMAGES.sanctuaryPool}
                alt="Private pool villa terrace looking out to mountain mist"
                aspectRatio="aspect-4/5"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="hover:scale-105 transition-transform duration-700"
                wrapperClassName="border border-[#AD9870]/20 shadow-md"
              />
              <p className="text-xs text-[#292929]/70 italic font-serif">
                Natural stone plunge pools perched along emerald ridge contours.
              </p>
            </div>

            <div className="space-y-4 sm:pt-10">
              <SafeImage
                src={RESORT_IMAGES.sanctuarySpa}
                alt="Sunken stone lotus bathing sanctuary at Vaana"
                aspectRatio="aspect-4/5"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="hover:scale-105 transition-transform duration-700"
                wrapperClassName="border border-[#AD9870]/20 shadow-md"
              />
              <p className="text-xs text-[#292929]/70 italic font-serif">
                Therapeutic herbal bath rituals guided by Vedic wellness traditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sanctuary Specifications / 4 Room Categories */}
      <section className="bg-[#EAE4D7]/40 py-24 px-6 md:px-10 border-y border-[#AD9870]/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
                Private Habitations
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#263D32]">
                Curated Suites & Private Villas
              </h2>
            </div>
            <button
              onClick={() => onNavigate('rooms')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#263D32] hover:underline"
            >
              <span>View All 4 Categories & Inclusions</span>
              <ChevronRight className="w-4 h-4 text-[#AD9870]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {ROOM_CATEGORIES.map((room) => (
              <div
                key={room.id}
                className="bg-[#F5F2EA] border border-[#AD9870]/30 overflow-hidden flex flex-col group hover:border-[#263D32]/60 transition-all duration-300"
              >
                {/* Room Image */}
                <div className="relative overflow-hidden">
                  <SafeImage
                    src={room.primaryImage}
                    alt={room.name}
                    aspectRatio="aspect-16/10"
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-[#263D32]/90 backdrop-blur-xs text-[#F5F2EA] px-3.5 py-1.5 text-xs font-mono font-medium tracking-wider z-10">
                    {formatINR(room.pricePerNight)}
                    <span className="text-[10px] text-[#AD9870] ml-1 font-sans">/ night</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#292929]/70">
                      <span>{room.areaSqFt} sq. ft.</span>
                      <span aria-hidden="true">·</span>
                      <span>Up to {room.maxGuests} Guests</span>
                      <span aria-hidden="true">·</span>
                      <span>{room.view}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#263D32]">
                      {room.name}
                    </h3>

                    <p className="text-xs text-[#292929]/80 leading-relaxed font-light line-clamp-2">
                      {room.description}
                    </p>

                    {/* Unboxed features list */}
                    <div className="pt-2 flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] text-[#263D32]/90">
                      {room.features.slice(0, 3).map((feat, idx) => (
                        <span key={idx} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#AD9870]" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#AD9870]/20 flex items-center justify-between gap-4">
                    <button
                      onClick={() => onNavigate('room-detail', room.id)}
                      className="text-xs uppercase tracking-[0.16em] font-medium text-[#263D32] hover:text-[#AD9870] transition-colors"
                    >
                      Explore Details
                    </button>

                    <button
                      onClick={() => onNavigate('booking', room.id)}
                      className="px-5 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-white bg-[#263D32] hover:bg-[#1A2C23] transition-colors"
                    >
                      Reserve Stay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Experiences Spotlight */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
            Immersion & Healing
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#263D32]">
            Journeys Within the Forest
          </h2>
          <p className="text-xs md:text-sm text-[#292929]/75 font-light leading-relaxed">
            Every moment at Vaana is attuned to the rhythm of nature—from sunrise guided wilderness treks to candlelit dining under bamboo groves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERIENCES.slice(0, 3).map((exp) => (
            <div
              key={exp.id}
              className="bg-white border border-[#AD9870]/25 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <SafeImage
                  src={exp.image}
                  alt={exp.title}
                  aspectRatio="aspect-4/3"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#263D32]/90 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 z-10">
                  {exp.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] text-[#AD9870] font-medium">
                    {exp.duration} · {exp.schedule}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#263D32]">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-[#292929]/75 leading-relaxed font-light">
                    {exp.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#AD9870]/15">
                  <button
                    onClick={() => onNavigate('experiences')}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#263D32] hover:text-[#AD9870] transition-colors"
                  >
                    <span>Discover Experience</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('experiences')}
            className="px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#263D32] border border-[#263D32] hover:bg-[#263D32] hover:text-white transition-all duration-200"
          >
            View All Retreat Experiences
          </button>
        </div>
      </section>

      {/* 5. Dining Feature Banner */}
      <section className="relative py-28 px-6 md:px-10 overflow-hidden bg-[#263D32] text-[#F5F2EA]">
        <SafeImage
          src={RESORT_IMAGES.dining}
          alt="The Prana Pavilion dining"
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
          wrapperClassName="absolute inset-0 opacity-20 pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
            Gastronomy of the Earth
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal max-w-3xl mx-auto leading-tight text-balance">
            The Prana Pavilion & Open Hearth
          </h2>
          <p className="text-xs md:text-sm text-[#F5F2EA]/80 font-light max-w-2xl mx-auto leading-relaxed">
            Food as medicine, ritual, and communion. Driven by six Ayurvedic tastes, cold-pressed stone-milled oils, and zero-kilometer harvest from our mountain orchard.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('dining')}
              className="px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#263D32] bg-[#F5F2EA] hover:bg-white transition-colors"
            >
              Explore Dining & Menus
            </button>
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-medium text-[#F5F2EA] border border-[#AD9870] hover:bg-white/10 transition-colors"
            >
              Book Stay with Breakfast Included
            </button>
          </div>
        </div>
      </section>

      {/* 6. Resort Facts / Ecological Metrics Strip */}
      <section className="py-16 bg-[#1A2C23] text-[#F5F2EA] border-t border-[#AD9870]/25">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            {RESORT_FACTS.map((fact, index) => (
              <div key={index} className="space-y-1.5 px-4">
                <div className="font-serif text-3xl md:text-4xl font-normal text-[#AD9870]">
                  {fact.value}
                </div>
                <div className="text-xs uppercase tracking-wider font-medium text-[#F5F2EA]">
                  {fact.label}
                </div>
                <div className="text-[11px] text-[#F5F2EA]/50 font-light">
                  {fact.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Authentic Guest Reflections */}
      <section className="py-24 px-6 md:px-10 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
            Guest Reflections
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#263D32]">
            Words from Those Who Stayed
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 border border-[#AD9870]/20 space-y-4 shadow-xs flex flex-col justify-between">
            <p className="font-serif text-base text-[#292929] italic leading-relaxed">
              "The silence here is tangible. Waking up to mist rolling through the valley outside our private pool villa while drinking single-origin estate coffee was deeply transformative."
            </p>
            <div className="pt-4 border-t border-[#AD9870]/15">
              <div className="text-xs font-semibold text-[#263D32]">Devika & Rohan Singhal</div>
              <div className="text-[11px] text-[#292929]/60">Stayed 4 nights in Private Pool Villa · Mumbai</div>
            </div>
          </div>

          <div className="bg-white p-8 border border-[#AD9870]/20 space-y-4 shadow-xs flex flex-col justify-between">
            <p className="font-serif text-base text-[#292929] italic leading-relaxed">
              "The Ayurveda sanctuary and the food at Prana Pavilion are leagues beyond typical resort dining. Genuine herbal care and chefs who understand the vitality of raw seasonal produce."
            </p>
            <div className="pt-4 border-t border-[#AD9870]/15">
              <div className="text-xs font-semibold text-[#263D32]">Marcus Lindqvist</div>
              <div className="text-[11px] text-[#292929]/60">Stayed 6 nights in Deluxe Valley Room · Stockholm</div>
            </div>
          </div>

          <div className="bg-white p-8 border border-[#AD9870]/20 space-y-4 shadow-xs flex flex-col justify-between">
            <p className="font-serif text-base text-[#292929] italic leading-relaxed">
              "Architecturally, it is a masterwork. Timber rafters, natural spring pool, and no concrete eyesores anywhere. Truly a restorative paradise."
            </p>
            <div className="pt-4 border-t border-[#AD9870]/15">
              <div className="text-xs font-semibold text-[#263D32]">Ananya & Siddharth Nair</div>
              <div className="text-[11px] text-[#292929]/60">Stayed 3 nights in Premium Suite · Bengaluru</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call to Reservation */}
      <section className="bg-[#EAE4D7] py-20 px-6 md:px-10 border-t border-[#AD9870]/25 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#263D32]">
            Begin Your Journey to Stillness
          </h2>
          <p className="text-xs md:text-sm text-[#292929]/80 font-light leading-relaxed">
            With only 18 individual habitations spread across our 75-acre ridge, each stay is tailored with absolute privacy and mindful attention.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('booking')}
              className="px-10 py-4 text-xs uppercase tracking-[0.2em] font-semibold text-white bg-[#263D32] hover:bg-[#1A2C23] border border-[#263D32] shadow-md transition-colors"
            >
              Reserve Sanctuary Stay
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
