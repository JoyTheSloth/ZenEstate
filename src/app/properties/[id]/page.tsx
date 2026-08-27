'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_PROPERTIES, MOCK_AGENTS } from '@/data/mockData';
import { PropertyCard } from '@/components/PropertyCard';
import { ScheduleVisitModal } from '@/components/ScheduleVisitModal';
import { ContactAgentModal } from '@/components/ContactAgentModal';
import { InteractiveMap } from '@/components/InteractiveMap';
import { useApp } from '@/context/AppContext';
import { 
  Heart, 
  Layers, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Calendar, 
  ShieldCheck, 
  Share2, 
  Compass, 
  Car, 
  Sparkles, 
  FileText, 
  Calculator, 
  PhoneCall, 
  Send,
  X,
  Maximize2,
  CheckCircle2
} from 'lucide-react';

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = MOCK_PROPERTIES.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  const agent = MOCK_AGENTS.find((a) => a.id === property.agentId) || MOCK_AGENTS[0];
  const { isFavorite, toggleFavorite, isInCompare, toggleCompare, formatPrice, currencySymbol } = useApp();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [tenureYears, setTenureYears] = useState(30);
  const [interestPct, setInterestPct] = useState(6.5);

  const favorite = isFavorite(property.id);
  const compared = isInCompare(property.id);

  const formattedPrice = formatPrice(property.price);
  const formattedPricePerSqFt = formatPrice(property.pricePerSqFt, true);

  const loanAmt = property.price * (1 - downPaymentPct / 100);
  const monthlyR = interestPct / 100 / 12;
  const nMonths = tenureYears * 12;
  const emiVal = (loanAmt * monthlyR * Math.pow(1 + monthlyR, nMonths)) / (Math.pow(1 + monthlyR, nMonths) - 1);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const similarProperties = MOCK_PROPERTIES.filter(
    (p) => p.id !== property.id && (p.propertyType === property.propertyType || p.locality === property.locality)
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 bg-[#F8F9FA]">
      
      {/* Top Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/properties" className="text-xs font-mono font-bold text-slate-700 hover:underline">
              ← Back to Discovery
            </Link>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-widest">
              {property.listingType} • {property.propertyType}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{property.title}</h1>
          <p className="flex items-center gap-2 text-sm text-slate-500 mt-1 font-medium">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{property.address}, {property.locality}, {property.city}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => toggleCompare(property.id)}
            className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all border flex items-center gap-2 ${
              compared
                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{compared ? 'In Compare' : 'Add to Compare'}</span>
          </button>

          <button
            onClick={() => toggleFavorite(property.id)}
            className={`p-2.5 rounded-full transition-all border shadow-sm ${
              favorite
                ? 'bg-rose-500 text-white border-rose-500'
                : 'bg-white text-slate-700 border-slate-200 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm relative"
          >
            <Share2 className="w-5 h-5" />
            {copiedLink && (
              <span className="absolute -bottom-8 right-0 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Hero Image Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md group">
          <img
            src={property.images[activeImageIdx]?.url || property.images[0]?.url}
            alt={property.title}
            className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-700"
            onClick={() => setIsLightboxOpen(true)}
          />
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-white/95 text-slate-900 text-xs font-bold shadow-lg flex items-center gap-2 hover:bg-white transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Lightbox ({property.images.length} Photos)</span>
          </button>
        </div>

        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
          {property.images.slice(0, 3).map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setActiveImageIdx(idx)}
              className={`relative h-28 sm:h-36 rounded-2xl overflow-hidden cursor-pointer border transition-all ${
                activeImageIdx === idx ? 'ring-2 ring-slate-900 border-slate-900 scale-98 shadow' : 'border-slate-200 opacity-80 hover:opacity-100'
              }`}
            >
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Content + Agent Booking Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Price & Primary Specs Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-mono uppercase font-bold text-slate-400">Offered Price</span>
                <div className="text-4xl font-black text-slate-900 mt-0.5">
                  {formattedPrice}
                  {property.listingType === 'Rent' && (
                    <span className="text-base text-slate-500 font-normal">/{property.rentPeriod}</span>
                  )}
                </div>
              </div>

              <div className="text-left sm:text-right font-mono text-xs text-slate-600 space-y-1">
                <div>Price / SqFt: <strong>{formattedPricePerSqFt}</strong></div>
                <div>Status: <strong className="text-emerald-700">{property.possessionStatus}</strong></div>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {property.bedrooms > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-center">
                  <Bed className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-slate-900">{property.bedrooms} Beds</div>
                  <div className="text-[10px] text-slate-400 font-mono">Master En-suite</div>
                </div>
              )}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-center">
                <Bath className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-slate-900">{property.bathrooms} Baths</div>
                <div className="text-[10px] text-slate-400 font-mono">Full Bath</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-center">
                <Maximize className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-slate-900">{property.areaSqFt.toLocaleString()} sqft</div>
                <div className="text-[10px] text-slate-400 font-mono">Usable Area</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-center">
                <Car className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-slate-900">{property.parkingSpaces} Bay</div>
                <div className="text-[10px] text-slate-400 font-mono">Private Parking</div>
              </div>
            </div>
          </div>

          {/* EMI Estimator */}
          {property.listingType === 'Buy' && (
            <div className="bg-emerald-50 p-6 sm:p-8 rounded-3xl border border-emerald-200/80 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">Mortgage Estimator</span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">Estimate Monthly Repayment</h3>
                </div>
                <Link
                  href={`/calculator?price=${property.price}`}
                  className="text-xs text-slate-900 font-bold hover:underline flex items-center gap-1"
                >
                  <Calculator className="w-4 h-4 text-emerald-700" /> Full Suite →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block text-slate-600 mb-1">Down Payment ({downPaymentPct}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                    className="w-full accent-slate-900"
                  />
                  <div className="text-[11px] font-mono text-slate-500 mt-1">
                    {formatPrice(property.price * (downPaymentPct / 100))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Interest Rate ({interestPct}%)</label>
                  <input
                    type="range"
                    min="3.5"
                    max="10"
                    step="0.25"
                    value={interestPct}
                    onChange={(e) => setInterestPct(Number(e.target.value))}
                    className="w-full accent-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Tenure ({tenureYears} Years)</label>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="5"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full accent-slate-900"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-200 flex items-center justify-between shadow-sm">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Estimated Monthly Repayment</div>
                  <div className="text-3xl font-black text-slate-900 mt-0.5">
                    {formatPrice(emiVal)}<span className="text-xs text-slate-500 font-normal">/mo</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsVisitModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-xs shadow"
                >
                  Schedule Tour First
                </button>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" /> Architectural Overview
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {property.description}
            </p>
          </div>

          {/* Detailed Specs Table */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 mb-4">Detailed Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs border-t border-slate-100 pt-4">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Property Type</span>
                <span className="text-slate-900 font-bold">{property.propertyType}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Furnishing</span>
                <span className="text-slate-900 font-bold">{property.furnishing}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Facing Direction</span>
                <span className="text-slate-900 font-bold">{property.facing}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Property Age</span>
                <span className="text-slate-900 font-bold">{property.ageYears} Years</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Floor Level</span>
                <span className="text-slate-900 font-bold">Floor {property.floor || 1} of {property.totalFloors || 1}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Audit Status</span>
                <span className="text-emerald-700 font-bold">★ Verified Title</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" /> Premium Features
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs font-semibold text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Location */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" /> Locality & Map Position
            </h3>
            <div className="h-96 rounded-2xl overflow-hidden">
              <InteractiveMap properties={[property]} selectedPropertyId={property.id} />
            </div>
          </div>

        </div>

        {/* Right Sticky Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xl sticky top-24 space-y-6">
            
            {/* Primary Actions */}
            <div className="space-y-3">
              <button
                onClick={() => setIsVisitModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Schedule VIP Tour</span>
              </button>

              <button
                onClick={() => setIsContactModalOpen(true)}
                className="w-full py-3 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-all flex items-center justify-center gap-2 border border-slate-200"
              >
                <Send className="w-4 h-4 text-emerald-600" />
                <span>Send Direct Message</span>
              </button>
            </div>

            {/* Agent Info */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700">Listing Broker</span>
                  <h4 className="text-base font-bold text-slate-900">{agent.name}</h4>
                  <p className="text-xs text-slate-500">{agent.agencyName}</p>
                </div>
              </div>

              <div className="text-xs text-slate-600 font-medium">
                ★ <strong>{agent.rating}</strong> rating ({agent.reviewCount} reviews) • {agent.experienceYears} Years Experience
              </div>

              <a
                href={`tel:${agent.phone}`}
                className="w-full py-2.5 rounded-full bg-slate-50 text-slate-800 text-xs font-bold hover:bg-slate-100 flex items-center justify-center gap-1.5 border border-slate-200"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>{agent.phone}</span>
              </a>
            </div>

            {/* Verification Guarantee */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>ZenEstate Verified Title</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-normal">
                Title deeds, zoning permits, and structural engineering audit verified prior to listing.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">Related Properties</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Similar Premier Residences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((simProp) => (
              <PropertyCard key={simProp.id} property={simProp} />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-slate-400 hover:text-white rounded-full bg-slate-900/80"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full text-center space-y-4">
            <img
              src={property.images[activeImageIdx]?.url}
              alt={property.title}
              className="max-h-[75vh] w-auto mx-auto rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Modals */}
      <ScheduleVisitModal
        property={property}
        agent={agent}
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />

      <ContactAgentModal
        agent={agent}
        property={property}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

    </div>
  );
}
