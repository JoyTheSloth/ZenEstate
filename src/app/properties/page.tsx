'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_PROPERTIES, MOCK_LOCALITIES } from '@/data/mockData';
import { PropertyCard } from '@/components/PropertyCard';
import { InteractiveMap } from '@/components/InteractiveMap';
import { PropertyType, ListingType } from '@/types';
import { 
  Search, 
  Filter, 
  Map, 
  Grid, 
  List, 
  X, 
  RotateCcw, 
  SlidersHorizontal,
  Check,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Waves
} from 'lucide-react';

function PropertySearchContent() {
  const searchParams = useSearchParams();

  const [listingType, setListingType] = useState<ListingType>(
    (searchParams.get('tab') as ListingType) || 'Buy'
  );
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [propertyType, setPropertyType] = useState<string>(searchParams.get('type') || 'All');
  const [locality, setLocality] = useState<string>(searchParams.get('locality') || 'All');
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  const [selectedBeds, setSelectedBeds] = useState<number | 'Any'>('Any');
  const [selectedBaths, setSelectedBaths] = useState<number | 'Any'>('Any');
  const [furnishing, setFurnishing] = useState<string>('All');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Quick Smart Filter Badges
  const [onlyHotDeals, setOnlyHotDeals] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyReadyToMove, setOnlyReadyToMove] = useState(false);
  const [onlyWaterfront, setOnlyWaterfront] = useState(false);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMap, setShowMap] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const availableAmenities = [
    'Private Pool',
    'Smart Automation',
    'Gym',
    'Solar Power',
    'Wine Cellar',
    'Private Elevator',
    'Gated Security',
    'EV Charger',
  ];

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(p => {
      if (p.listingType !== listingType) return false;

      if (query.trim() !== '') {
        const q = query.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesAddress = p.address.toLowerCase().includes(q);
        const matchesLocality = p.locality.toLowerCase().includes(q);
        const matchesCity = p.city.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAddress && !matchesLocality && !matchesCity) return false;
      }

      if (propertyType !== 'All' && p.propertyType !== propertyType) return false;
      if (locality !== 'All' && p.locality !== locality) return false;
      if (p.listingType === 'Buy' && p.price > maxPrice) return false;
      if (selectedBeds !== 'Any' && p.bedrooms < Number(selectedBeds)) return false;
      if (selectedBaths !== 'Any' && p.bathrooms < Number(selectedBaths)) return false;
      if (furnishing !== 'All' && p.furnishing !== furnishing) return false;

      // Smart Badge Filters
      if (onlyHotDeals && !p.isHotDeal) return false;
      if (onlyVerified && !p.isVerified) return false;
      if (onlyReadyToMove && p.possessionStatus !== 'Ready to Move') return false;
      if (onlyWaterfront && !p.locality.toLowerCase().includes('marina') && !p.title.toLowerCase().includes('water')) return false;

      if (selectedAmenities.length > 0) {
        const hasAllSelected = selectedAmenities.every(a => p.amenities.includes(a));
        if (!hasAllSelected) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [listingType, query, propertyType, locality, maxPrice, selectedBeds, selectedBaths, furnishing, selectedAmenities, onlyHotDeals, onlyVerified, onlyReadyToMove, onlyWaterfront, sortBy]);

  const toggleAmenity = (name: string) => {
    setSelectedAmenities(prev =>
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  const handleResetFilters = () => {
    setQuery('');
    setPropertyType('All');
    setLocality('All');
    setMaxPrice(5000000);
    setSelectedBeds('Any');
    setSelectedBaths('Any');
    setFurnishing('All');
    setSelectedAmenities([]);
    setOnlyHotDeals(false);
    setOnlyVerified(false);
    setOnlyReadyToMove(false);
    setOnlyWaterfront(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    query !== '' ||
    propertyType !== 'All' ||
    locality !== 'All' ||
    selectedBeds !== 'Any' ||
    selectedBaths !== 'Any' ||
    furnishing !== 'All' ||
    onlyHotDeals ||
    onlyVerified ||
    onlyReadyToMove ||
    onlyWaterfront ||
    selectedAmenities.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-[#F8F9FA]">
      
      {/* Search Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Property List
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Discover Premier Properties</h1>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 self-start">
            <button
              onClick={() => setListingType('Buy')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                listingType === 'Buy' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Buy Properties
            </button>
            <button
              onClick={() => setListingType('Rent')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                listingType === 'Rent' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rent Residences
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="glass-input-light flex-1 px-4 py-2.5 rounded-2xl flex items-center gap-3 w-full">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, location, street or keyword..."
              className="bg-transparent w-full text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-900">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className="md:hidden w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
            <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
          </button>
        </div>

        {/* QUICK SMART FILTER BADGES */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mr-1">Quick Filters:</span>
          
          <button
            onClick={() => setOnlyHotDeals(!onlyHotDeals)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 border ${
              onlyHotDeals
                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Hot Deals</span>
          </button>

          <button
            onClick={() => setOnlyVerified(!onlyVerified)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 border ${
              onlyVerified
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Title</span>
          </button>

          <button
            onClick={() => setOnlyReadyToMove(!onlyReadyToMove)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 border ${
              onlyReadyToMove
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ready to Move</span>
          </button>

          <button
            onClick={() => setOnlyWaterfront(!onlyWaterfront)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 border ${
              onlyWaterfront
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Waterfront</span>
          </button>
        </div>

      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar */}
        <aside className={`lg:col-span-3 space-y-6 ${filterDrawerOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-600" /> Filter Criteria
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-500 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Type */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="glass-input-light w-full px-3 py-2 rounded-xl text-xs"
              >
                <option value="All">All Property Types</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            {/* Locality */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Locality</label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="glass-input-light w-full px-3 py-2 rounded-xl text-xs"
              >
                <option value="All">All Localities</option>
                {MOCK_LOCALITIES.map(loc => (
                  <option key={loc.id} value={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Price Slider */}
            {listingType === 'Buy' && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Max Price</span>
                  <span className="text-slate-900 font-bold">${(maxPrice / 1000000).toFixed(1)}M</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="250000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-slate-900"
                />
              </div>
            )}

            {/* Bedrooms */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Bedrooms (Min)</label>
              <div className="flex gap-1">
                {(['Any', 1, 2, 3, 4, 5] as const).map(num => (
                  <button
                    key={num}
                    onClick={() => setSelectedBeds(num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      selectedBeds === num
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700 mb-2">Luxury Amenities</label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {availableAmenities.map((amenity) => {
                  const checked = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        checked ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{amenity}</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'}`}>
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </aside>

        {/* Results */}
        <main className="lg:col-span-9 space-y-6">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-600">
              Found <strong className="text-slate-900">{filteredProperties.length}</strong> Properties
            </span>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="glass-input-light px-3 py-1.5 rounded-xl text-xs"
              >
                <option value="featured">Sort: Featured First</option>
                <option value="price-asc">Sort: Price Low to High</option>
                <option value="price-desc">Sort: Price High to Low</option>
                <option value="newest">Sort: Newest Added</option>
              </select>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
                <button
                  onClick={() => {
                    setViewMode('grid');
                    setShowMap(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    !showMap && viewMode === 'grid' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Grid</span>
                </button>

                <button
                  onClick={() => {
                    setViewMode('list');
                    setShowMap(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    !showMap && viewMode === 'list' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List</span>
                </button>

                <button
                  onClick={() => setShowMap(!showMap)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    showMap ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>{showMap ? 'Hide Map' : 'Map View'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-1 ${showMap ? 'xl:grid-cols-12' : ''} gap-6`}>
            <div className={`${showMap ? 'xl:col-span-6' : 'w-full'}`}>
              {filteredProperties.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">No Properties Found</h3>
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? `grid grid-cols-1 ${showMap ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6` : 'space-y-4'}>
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} viewMode={viewMode} />
                  ))}
                </div>
              )}
            </div>

            {showMap && (
              <div className="xl:col-span-6 h-[680px] sticky top-24 rounded-3xl overflow-hidden shadow-md">
                <InteractiveMap properties={filteredProperties} />
              </div>
            )}
          </div>

        </main>

      </div>

    </div>
  );
}

export default function PropertySearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Property Search...</div>}>
      <PropertySearchContent />
    </Suspense>
  );
}
