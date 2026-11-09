import React from 'react';
import { PageId } from '../types/retreat';
import { RESORT_IMAGES, RESORT_FACTS } from '../data/retreatData';
import { Compass, Leaf, Sun, Droplets, Trees, ShieldCheck, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#292929] pt-24 pb-20">
      {/* Page Header */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
          <Compass className="w-3.5 h-3.5 text-[#AD9870]" />
          <span>The Story of Vaana</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#263D32] font-normal leading-tight">
          A Sanctuary Born from the Living Forest
        </h1>
        <p className="text-sm md:text-base text-[#292929]/75 font-light max-w-2xl mx-auto leading-relaxed">
          Rooted in the ancient Western Ghats, Vaana was conceived as an ode to stillness—where architecture defers to the wilderness and time returns to its natural rhythm.
        </p>
      </section>

      {/* Hero Image Showcase */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-20">
        <div className="aspect-16/9 md:aspect-21/9 overflow-hidden border border-[#AD9870]/30 shadow-xl">
          <img
            src={RESORT_IMAGES.hero}
            alt="Vaana Retreat Forest Grounds"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Chapter 1: The Origin */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#AD9870] font-semibold">
              01. The Origin
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#263D32] font-normal">
              Reclaiming Silence on a High Ridge
            </h2>
            <div className="w-10 h-[1.5px] bg-[#AD9870]" />
          </div>
          <div className="md:col-span-7 space-y-4 text-sm text-[#292929]/80 font-light leading-relaxed">
            <p>
              In 2017, when the founders first set foot upon this 75-acre ridge at 1,150 meters above sea level, they encountered an overgrown colonial-era coffee and spice plantation surrounded by virgin shola forests. Rather than clearing the land for conventional buildings, a foundational pledge was made:
            </p>
            <p className="font-serif text-lg text-[#263D32] italic border-l-2 border-[#AD9870] pl-4 my-2">
              "Not a single mature indigenous tree would be felled, and every structure would breathe with the natural slope of the mountain."
            </p>
            <p>
              Over five years of meticulous handcrafting, local artisans, stone masons, and landscape ecologists worked together to create just 18 secluded pavilions—tucked seamlessly between silver oaks, wild cinnamon, and natural waterfalls.
            </p>
          </div>
        </div>

        {/* Chapter 2: Biophilic Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center pt-8 border-t border-[#AD9870]/20">
          <div className="md:col-span-5 space-y-4 order-1 md:order-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#AD9870] font-semibold">
              02. Architectural Philosophy
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#263D32] font-normal">
              Structures that Dissolve into the Canopy
            </h2>
            <div className="w-10 h-[1.5px] bg-[#AD9870]" />
          </div>
          <div className="md:col-span-7 space-y-4 text-sm text-[#292929]/80 font-light leading-relaxed order-2 md:order-1">
            <p>
              Our architectural idiom draws inspiration from indigenous Kerala timber carpentry combined with minimalist Japanese spatial sensibilities. We utilized reclaimed teakwood from century-old dismantle projects, sun-baked clay tiles, and breathable lime plaster tinted with earth pigments.
            </p>
            <p>
              Deep overhangs shield interiors from monsoon rains while capturing mountain breezes for passive cooling. Expansive glazed sliding panels erase the barrier between the bedroom and the forest, allowing guests to drift to sleep to the murmur of natural streams.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Triptych */}
      <section className="bg-[#EAE4D7]/50 py-16 px-6 md:px-10 border-y border-[#AD9870]/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="aspect-4/3 overflow-hidden border border-[#AD9870]/20">
              <img
                src={RESORT_IMAGES.gardenRoom}
                alt="Botanical bedroom"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-serif text-lg text-[#263D32]">Artisanal Handcraft</h4>
            <p className="text-xs text-[#292929]/75 font-light">
              Furniture hewn from reclaimed timber, woven jute textiles, and hand-cast bronze hardware.
            </p>
          </div>

          <div className="space-y-3">
            <div className="aspect-4/3 overflow-hidden border border-[#AD9870]/20">
              <img
                src={RESORT_IMAGES.dining}
                alt="Open air pavilion dining"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-serif text-lg text-[#263D32]">Passive Aerodynamics</h4>
            <p className="text-xs text-[#292929]/75 font-light">
              High timber louvers circulate cooling mountain drafts without energy-intensive air conditioning.
            </p>
          </div>

          <div className="space-y-3">
            <div className="aspect-4/3 overflow-hidden border border-[#AD9870]/20">
              <img
                src={RESORT_IMAGES.spa}
                alt="Sunken natural stone pool"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-serif text-lg text-[#263D32]">Living Waters</h4>
            <p className="text-xs text-[#292929]/75 font-light">
              Spring-fed mineral waters filtered naturally through quartz and charcoal beds.
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability Pillars */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 space-y-14">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
            Ecological Responsibility
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#263D32] font-normal">
            Pillars of Our Stewardship
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 border border-[#AD9870]/25 space-y-3">
            <Sun className="w-6 h-6 text-[#AD9870]" />
            <h3 className="font-serif text-lg font-medium text-[#263D32]">100% Solar Energy</h3>
            <p className="text-xs text-[#292929]/75 font-light leading-relaxed">
              Our off-grid solar array powers the entire estate with clean battery storage, ensuring zero diesel noise pollution.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#AD9870]/25 space-y-3">
            <Droplets className="w-6 h-6 text-[#AD9870]" />
            <h3 className="font-serif text-lg font-medium text-[#263D32]">Mountain Springs</h3>
            <p className="text-xs text-[#292929]/75 font-light leading-relaxed">
              Pristine rain catchment and perennial mountain springs supply all guest suites with alkaline drinking water in glass carafes.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#AD9870]/25 space-y-3">
            <Leaf className="w-6 h-6 text-[#AD9870]" />
            <h3 className="font-serif text-lg font-medium text-[#263D32]">Zero Single-Use Plastic</h3>
            <p className="text-xs text-[#292929]/75 font-light leading-relaxed">
              From organic refillable ceramic toiletry vessels to bamboo toothbrushes, no single-use plastics enter the sanctuary.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#AD9870]/25 space-y-3">
            <Trees className="w-6 h-6 text-[#AD9870]" />
            <h3 className="font-serif text-lg font-medium text-[#263D32]">Native Reforestation</h3>
            <p className="text-xs text-[#292929]/75 font-light leading-relaxed">
              Over 2,400 native endemic trees planted to date, creating a protected wildlife corridor for hornbills and flying squirrels.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#263D32] text-[#F5F2EA] py-16 px-6 text-center space-y-6">
        <h2 className="font-serif text-3xl md:text-4xl font-normal max-w-xl mx-auto">
          Experience the Living Sanctuary Firsthand
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('rooms')}
            className="px-8 py-3 text-xs uppercase tracking-[0.18em] font-semibold text-[#263D32] bg-[#F5F2EA] hover:bg-white transition-colors"
          >
            Explore Suites & Villas
          </button>
          <button
            onClick={() => onNavigate('booking')}
            className="px-8 py-3 text-xs uppercase tracking-[0.18em] font-medium text-white border border-[#AD9870] hover:bg-white/10 transition-colors"
          >
            Reserve Your Dates
          </button>
        </div>
      </section>
    </div>
  );
};
