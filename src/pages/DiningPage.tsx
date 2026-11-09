import React, { useState } from 'react';
import { PageId } from '../types/retreat';
import { DINING_INFO, RESORT_IMAGES } from '../data/retreatData';
import { Utensils, Clock, Flame, Leaf, CheckCircle2, HeartHandshake, ArrowRight } from 'lucide-react';

interface DiningPageProps {
  onNavigate: (page: PageId) => void;
}

export const DiningPage: React.FC<DiningPageProps> = ({ onNavigate }) => {
  const [activeMenuTab, setActiveMenuTab] = useState(0);
  const [tableGuestName, setTableGuestName] = useState('');
  const [tableTime, setTableTime] = useState('19:30');
  const [tableParty, setTableParty] = useState(2);
  const [tableSubmitted, setTableSubmitted] = useState(false);

  const currentCategory = DINING_INFO.menuHighlights[activeMenuTab];

  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableGuestName.trim()) return;
    setTableSubmitted(true);
    setTimeout(() => {
      setTableSubmitted(false);
      setTableGuestName('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#292929] pt-24 pb-24">
      {/* Page Header */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
          Culinary Alchemy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#263D32] font-normal">
          {DINING_INFO.name}
        </h1>
        <p className="text-sm md:text-base text-[#292929]/75 font-light max-w-2xl mx-auto leading-relaxed">
          {DINING_INFO.description}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-[#263D32] font-medium">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#AD9870]" />
            <span>{DINING_INFO.timings}</span>
          </span>
          <span aria-hidden="true" className="text-[#AD9870]">·</span>
          <span className="flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-[#AD9870]" />
            <span>Farm-to-Table & Wild Foraged</span>
          </span>
        </div>
      </section>

      {/* Hero Visual */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-20">
        <div className="aspect-16/9 md:aspect-21/9 overflow-hidden border border-[#AD9870]/30 shadow-xl relative">
          <img
            src={RESORT_IMAGES.dining}
            alt="The Prana Pavilion Open Air Dining"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-[#1A2C23]/90 backdrop-blur-md p-6 text-white max-w-md border border-white/10">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#AD9870] font-semibold">
              The Setting
            </div>
            <p className="font-serif text-lg mt-1">
              "Open-timber pavilion perched above misty forest canopy lit by warm candlelight and bronze lanterns."
            </p>
          </div>
        </div>
      </div>

      {/* Culinary Philosophy: 3 Pillars */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-12 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#AD9870] font-semibold">
            Our Kitchen Code
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#263D32] font-normal">
            Grounded in Earth & Season
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 border border-[#AD9870]/25 space-y-3">
            <Leaf className="w-6 h-6 text-[#AD9870]" />
            <h3 className="font-serif text-xl font-medium text-[#263D32]">Zero-Kilometer Sourcing</h3>
            <p className="text-xs text-[#292929]/75 font-light leading-relaxed">
              Every leaf, edible flower, and tender gourd is hand-picked at dawn from our organic hillside garden or nearby community growers.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#AD9870]/25 space-y-3">
            <Flame className="w-6 h-6 text-[#AD9870]" />
            <h3 className="font-serif text-xl font-medium text-[#263D32]">Ancient Wood Hearth</h3>
            <p className="text-xs text-[#292929]/75 font-light leading-relaxed">
              Clay ovens and unglazed earthen pots preserve micro-nutrients while imparting the smoky depth of jackfruit wood embers.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#AD9870]/25 space-y-3">
            <HeartHandshake className="w-6 h-6 text-[#AD9870]" />
            <h3 className="font-serif text-xl font-medium text-[#263D32]">Six Ayurvedic Tastes</h3>
            <p className="text-xs text-[#292929]/75 font-light leading-relaxed">
              Menus harmonize Sweet, Sour, Salty, Pungent, Bitter, and Astringent (Shad Rasa) for digestive ease and sustained vitality.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Showcase with Tabs */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        <div className="bg-white border border-[#AD9870]/30 shadow-md p-8 md:p-12 space-y-8">
          <div className="text-center space-y-3 pb-6 border-b border-[#AD9870]/20">
            <span className="text-xs uppercase tracking-[0.25em] text-[#AD9870] font-semibold">
              Seasonal Tasting
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#263D32] font-normal">
              Curated Menu Selections
            </h2>
          </div>

          {/* Menu Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#AD9870]/20 pb-4">
            {DINING_INFO.menuHighlights.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMenuTab(idx)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors ${
                  activeMenuTab === idx
                    ? 'bg-[#263D32] text-white'
                    : 'text-[#292929]/70 hover:text-[#263D32] hover:bg-[#F5F2EA]'
                }`}
              >
                {cat.category.split(' ')[0]} {cat.category.split(' ')[1] || ''}
              </button>
            ))}
          </div>

          {/* Menu Items List */}
          <div className="space-y-8 pt-4">
            <h3 className="font-serif text-2xl text-[#263D32] text-center font-normal">
              {currentCategory.category}
            </h3>

            <div className="space-y-6">
              {currentCategory.items.map((item, i) => (
                <div key={i} className="pb-6 border-b border-[#AD9870]/15 last:border-0 space-y-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="font-serif text-lg font-medium text-[#263D32]">
                      {item.name}
                    </h4>
                    <span className="font-mono text-xs font-semibold text-[#AD9870] whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-xs text-[#292929]/75 font-light leading-relaxed">
                    {item.desc}
                  </p>
                  <span className="inline-block text-[10px] uppercase tracking-wider text-[#263D32] bg-[#EAE4D7] px-2 py-0.5 rounded-xs mt-1">
                    {item.dietary}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Private Dining Inquiry Box */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 mt-12">
        <div className="bg-[#263D32] text-[#F5F2EA] p-8 md:p-10 border border-[#AD9870]/30 space-y-6">
          <div className="space-y-2 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-[#AD9870] font-semibold">
              Private Gastronomic Celebrations
            </span>
            <h3 className="font-serif text-3xl font-normal">Reserve a Candlelit Terrace Table</h3>
            <p className="text-xs text-[#F5F2EA]/80 font-light max-w-lg mx-auto">
              Resident guests and visiting patrons may request intimate private table arrangements on the cliffside deck.
            </p>
          </div>

          {tableSubmitted ? (
            <div className="p-4 bg-emerald-900/40 border border-emerald-400 text-emerald-200 text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Table request received for {tableGuestName}. Our dining maitre will confirm promptly.</span>
            </div>
          ) : (
            <form onSubmit={handleTableSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <input
                type="text"
                placeholder="Your Name / Suite #"
                value={tableGuestName}
                onChange={(e) => setTableGuestName(e.target.value)}
                className="bg-white/10 border border-white/20 p-2.5 text-white placeholder-white/50 focus:outline-hidden focus:border-[#AD9870]"
                required
              />
              <select
                value={tableTime}
                onChange={(e) => setTableTime(e.target.value)}
                className="bg-white/10 border border-white/20 p-2.5 text-white focus:outline-hidden focus:border-[#AD9870]"
              >
                <option value="12:30" className="text-black">12:30 Lunch</option>
                <option value="13:30" className="text-black">13:30 Lunch</option>
                <option value="19:00" className="text-black">19:00 Dinner</option>
                <option value="19:30" className="text-black">19:30 Dinner</option>
                <option value="20:30" className="text-black">20:30 Dinner</option>
              </select>
              <select
                value={tableParty}
                onChange={(e) => setTableParty(Number(e.target.value))}
                className="bg-white/10 border border-white/20 p-2.5 text-white focus:outline-hidden focus:border-[#AD9870]"
              >
                <option value={2} className="text-black">2 Guests</option>
                <option value={4} className="text-black">4 Guests</option>
                <option value={6} className="text-black">6 Guests</option>
              </select>
              <button
                type="submit"
                className="py-2.5 px-4 text-xs uppercase tracking-wider font-semibold text-[#263D32] bg-[#F5F2EA] hover:bg-white transition-colors"
              >
                Request Table
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
