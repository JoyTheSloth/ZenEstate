'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MOCK_PROPERTIES, MOCK_LOCALITIES } from '@/data/mockData';
import { PropertyCard } from '@/components/PropertyCard';
import { InteractiveMap } from '@/components/InteractiveMap';
import { LocalityModal } from '@/components/LocalityModal';
import { Locality } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  Search, 
  ArrowRight, 
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Compass,
  TrendingUp,
  Award,
  Building2,
  Star
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { formatPrice, openAuthModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('House');
  const [lookingForType, setLookingForType] = useState('Villa');
  const [locationQuery, setLocationQuery] = useState('');
  const [roomsCount, setRoomsCount] = useState('3 Bed rooms');

  // Filter tab for Premier Showcase
  const [showcaseFilter, setShowcaseFilter] = useState<'All' | 'Villa' | 'Penthouse' | 'Apartment' | 'Townhouse'>('All');

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Locality Insights Modal State
  const [selectedLocality, setSelectedLocality] = useState<Locality | null>(null);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (lookingForType) params.set('type', lookingForType);
    if (locationQuery) params.set('q', locationQuery);
    router.push(`/properties?${params.toString()}`);
  };

  const showcaseProperties = MOCK_PROPERTIES.filter(p => 
    showcaseFilter === 'All' ? true : p.propertyType === showcaseFilter
  );

  const faqs = [
    {
      q: 'What kind of properties do you sell and list?',
      a: 'We list verified luxury compounds, architectural modern villas, high-yield sky apartments, waterfront townhomes, and executive commercial suites across prime metropolitan regions.'
    },
    {
      q: 'How does structural and title verification work?',
      a: 'Every property undergoes a 42-point title search, zoning compliance verification, ownership background check, and structural engineering audit prior to public listing.'
    },
    {
      q: 'Can I schedule a private evening or weekend tour?',
      a: 'Yes! Click "Schedule VIP Tour" on any property page to choose your preferred date and time slot. A dedicated premier broker will accompany you for a private walkthrough.'
    },
    {
      q: 'How accurate is the EMI Mortgage Calculator?',
      a: 'Our mortgage suite provides exact principal vs interest amortization breakdowns based on live interest rates, custom tenure periods, and down payment percentage inputs.'
    },
    {
      q: 'Can international or non-resident buyers acquire property?',
      a: 'Absolutely. We offer complete cross-border legal assistance, foreign investor escrow services, and currency conversion guidance in both USD ($) and INR (₹).'
    }
  ];

  return (
    <div className="space-y-16 pb-20 bg-[#F8F9FA]">
      
      {/* HERO SECTION CONTAINER CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 min-h-[560px] flex flex-col justify-between p-6 sm:p-12 shadow-2xl border border-slate-800">
          
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
              alt="Architectural Glass Pavilion House"
              className="w-full h-full object-cover opacity-75 animate-pulse-subtle"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/40" />
          </div>

          {/* Top Pill Category Badges */}
          <div className="relative z-10 flex flex-wrap items-center gap-2">
            {(['House', 'Apartment', 'Residential'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Main Hero Headline */}
          <div className="relative z-10 max-w-2xl my-8 space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tight">
              Build Your Future, One Property at a Time.
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm max-w-lg font-light leading-relaxed">
              Own Your World, One Property at a Time. Discover architectural pavilions, luxury compounds, and verified residences tailored for modern living.
            </p>
          </div>

          {/* FLOATING WHITE SEARCH POD */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-2xl space-y-4">
            <form onSubmit={handleHeroSearch} className="space-y-4">
              
              <div className="text-xs font-bold text-slate-900">Find the best place</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                
                <div className="bg-slate-100 p-2.5 rounded-2xl border border-slate-200">
                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-0.5">Looking for:</label>
                  <select
                    value={lookingForType}
                    onChange={(e) => setLookingForType(e.target.value)}
                    className="bg-transparent w-full text-xs text-slate-900 font-semibold focus:outline-none [&>option]:bg-white [&>option]:text-slate-900"
                  >
                    <option value="Villa">Villa / House</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div className="bg-slate-100 p-2.5 rounded-2xl border border-slate-200">
                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-0.5">Price Range:</label>
                  <select
                    className="bg-transparent w-full text-xs text-slate-900 font-semibold focus:outline-none [&>option]:bg-white [&>option]:text-slate-900"
                  >
                    <option>{formatPrice(500000, true)} - {formatPrice(2000000, true)}</option>
                    <option>{formatPrice(2000000, true)} - {formatPrice(5000000, true)}</option>
                    <option>{formatPrice(5000000, true)}+</option>
                  </select>
                </div>

                <div className="bg-slate-100 p-2.5 rounded-2xl border border-slate-200">
                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-0.5">Locations:</label>
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="Marina, Bellevue..."
                    className="bg-transparent w-full text-xs text-slate-900 font-semibold placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div className="bg-slate-100 p-2.5 rounded-2xl border border-slate-200">
                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-0.5">Number of rooms:</label>
                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(e.target.value)}
                    className="bg-transparent w-full text-xs text-slate-900 font-semibold focus:outline-none [&>option]:bg-white [&>option]:text-slate-900"
                  >
                    <option value="2 Bed rooms">2 Bed rooms</option>
                    <option value="3 Bed rooms">3 Bed rooms</option>
                    <option value="4+ Bed rooms">4+ Bed rooms</option>
                  </select>
                </div>

              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200/80">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="text-[11px] text-slate-400 font-mono">Filter:</span>
                  {(['Villa', 'House', 'Waterfront', 'Townhouse'] as const).map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setLookingForType(f)}
                      className={`px-3 py-1 rounded-full text-xs transition-all ${
                        lookingForType === f
                          ? 'bg-slate-900 text-white font-bold'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>Search Properties</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* REDESIGNED FLOATING METRICS STATS CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6 lg:space-y-0 lg:flex items-center justify-between gap-8 hover-lift">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 divide-x-0 sm:divide-x divide-slate-100 flex-1">
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">100%</div>
                <div className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">Satisfaction Rate</div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0 shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">500+</div>
                <div className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">Estates Sold</div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0 shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">150+</div>
                <div className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">Prime Cities</div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center shrink-0 shadow-sm">
                <Star className="w-6 h-6 fill-rose-500" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">2,000+</div>
                <div className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">5-Star Reviews</div>
              </div>
            </div>

          </div>

          <div className="pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 flex items-center justify-between lg:justify-end gap-4 shrink-0">
            <Link
              href="/properties"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Discover Properties</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* DUAL EDITORIAL CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 max-w-xl leading-tight">
            Your primary home might begin to feel left out.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md p-4 relative group">
            <div className="h-80 sm:h-96 rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                alt="Modern Exterior Compound"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-slate-200 flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                </div>
                <span className="text-[10px] font-bold text-slate-900 pr-2">128+ Happy Owners</span>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <p className="text-xs text-slate-600 max-w-md font-medium">
                Whether creating a cozy corner for relaxation or transforming a space into a sanctuary workspace.
              </p>
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                →
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="ZenEstate Logo Icon"
                  className="w-12 h-12 rounded-2xl object-cover shadow-md shrink-0 border border-slate-200"
                />
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  Each listing offers unique features, exceptional quality, and prime locations.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                  Big things can happen in small spaces.
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  With thoughtful design and smart organization, you can maximize every inch, making room for creativity and modern living.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Pricing Starts at</span>
                  <div className="text-lg font-black text-slate-900">{formatPrice(298000)}</div>
                </div>

                <Link
                  href="/properties"
                  className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow"
                >
                  <span>Explore Properties</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PREMIER HOUSES GRID SHOWCASE WITH CATEGORY TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Curated Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">Explore our premier houses</h2>
            <p className="text-xs text-slate-500 mt-1">Hand-picked architectural properties, luxury villas, and modern sanctuaries.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-full border border-slate-200">
            {(['All', 'Villa', 'Penthouse', 'Apartment', 'Townhouse'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setShowcaseFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  showcaseFilter === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* DEDICATED INTERACTIVE LIVE MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-200/80 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">
                <Compass className="w-4 h-4 text-emerald-600" /> METROPOLITAN GEOSPATIAL MAP
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-2">Interactive Metropolitan Live Map</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Pinpoint verified luxury compounds, price distributions, and regional growth metrics directly on our interactive map.
              </p>
            </div>

            <Link
              href="/properties"
              className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow self-start md:self-auto"
            >
              <span>Full Map & Split View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-[520px] rounded-3xl overflow-hidden border border-slate-200 shadow-inner">
            <InteractiveMap properties={MOCK_PROPERTIES} />
          </div>
        </div>
      </section>

      {/* LOCALITY SPOTLIGHT ENCLAVES (WITH INTERACTIVE INSIGHTS MODAL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-md space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">Metropolitan Insights</span>
              <h2 className="text-3xl font-black text-slate-900 mt-1">Popular Neighborhood Enclaves</h2>
            </div>
            <Link href="/properties" className="text-xs font-bold text-slate-900 hover:text-emerald-600">
              View All Enclaves →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_LOCALITIES.map((loc) => (
              <div
                key={loc.id}
                onClick={() => setSelectedLocality(loc)}
                className="bg-slate-50 rounded-2xl overflow-hidden group border border-slate-200/80 flex flex-col justify-between hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-900 shadow flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-600" /> +{loc.growthRatePercent}% YoY
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{loc.description}</p>

                  <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">{formatPrice(loc.avgPricePerSqFt, true)}/sqft</span>
                    <span className="text-emerald-700 font-bold">Insights →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REDESIGNED INTERACTIVE FAQ ACCORDION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-700" /> FREQUENTLY ASKED QUESTIONS
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Got questions? We&apos;ve got clear answers.
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Everything you need to know about purchasing, inspecting, financing, and managing luxury architectural properties.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Still have questions?</h4>
                  <p className="text-[11px] text-slate-500">Our senior property concierge is available 24/7.</p>
                </div>
              </div>
              <button
                onClick={() => openAuthModal('signin')}
                className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-all border border-slate-200"
              >
                Chat with Concierge →
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className={`cursor-pointer rounded-3xl transition-all duration-300 bg-white border ${
                    isOpen
                      ? 'border-l-4 border-l-emerald-600 border-slate-300 shadow-md ring-1 ring-slate-200/60'
                      : 'border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300'
                  }`}
                >
                  <div className="p-6 flex items-center justify-between gap-4">
                    <h3 className={`text-sm sm:text-base font-bold transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-800'}`}>
                      {faq.q}
                    </h3>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-slate-900 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100 mt-1 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Locality Insights Modal */}
      <LocalityModal
        locality={selectedLocality}
        isOpen={!!selectedLocality}
        onClose={() => setSelectedLocality(null)}
      />

    </div>
  );
}
