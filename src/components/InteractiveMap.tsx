'use client';

import React, { useState } from 'react';
import { Property } from '@/types';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { MapPin, Navigation, Layers, Bed, Bath, ArrowUpRight } from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
  selectedPropertyId?: string;
  onSelectProperty?: (id: string) => void;
}

export function InteractiveMap({ properties, selectedPropertyId, onSelectProperty }: InteractiveMapProps) {
  const { formatPrice } = useApp();
  const [activePin, setActivePin] = useState<Property | null>(
    properties.find(p => p.id === selectedPropertyId) || properties[0] || null
  );

  return (
    <div className="relative w-full h-[500px] md:h-full min-h-[450px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm flex flex-col justify-between">
      
      {/* Map Background Canvas */}
      <div 
        className="absolute inset-0 bg-[#F1F5F9] transition-all"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.08) 0%, transparent 60%),
            linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px'
        }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
          <path
            d="M -100 120 Q 200 80, 400 250 T 900 350"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="50"
            strokeLinecap="round"
          />
        </svg>

        {/* Property Pins */}
        {properties.map((prop, idx) => {
          const leftPercent = 20 + ((idx * 27 + (prop.bedrooms * 12)) % 65);
          const topPercent = 25 + ((idx * 33 + (prop.bathrooms * 15)) % 55);
          const isSelected = activePin?.id === prop.id;

          const displayPrice = prop.listingType === 'Rent'
            ? `${formatPrice(prop.price)}/mo`
            : formatPrice(prop.price, true);

          return (
            <div
              key={prop.id}
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              onClick={() => {
                setActivePin(prop);
                if (onSelectProperty) onSelectProperty(prop.id);
              }}
            >
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold shadow-lg transition-all duration-300 ${
                  isSelected
                    ? 'bg-slate-900 text-white scale-110 shadow-slate-900/30 ring-4 ring-emerald-500/30'
                    : 'bg-white text-slate-900 border border-slate-300 hover:border-emerald-500 hover:scale-105'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span>{displayPrice}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Bar Top */}
      <div className="relative z-30 p-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 shadow-sm border border-slate-200 text-xs text-slate-700">
          <Navigation className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Live Map • Metropolis Region</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button className="p-2 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 text-xs flex items-center gap-1">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline font-medium">Satellite</span>
          </button>
        </div>
      </div>

      {/* Preview Card Bottom */}
      {activePin && (
        <div className="relative z-30 p-4 pointer-events-auto">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={activePin.images[0]?.url}
                alt={activePin.title}
                className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-widest">
                  {activePin.propertyType} • {activePin.locality}
                </span>
                <h4 className="text-sm font-bold text-slate-900 truncate max-w-xs">{activePin.title}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-600 mt-1 font-medium">
                  <span className="font-extrabold text-slate-900">
                    {formatPrice(activePin.price)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Bed className="w-3 h-3 text-emerald-600" /> {activePin.bedrooms} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3 h-3 text-emerald-600" /> {activePin.bathrooms} Baths
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={`/properties/${activePin.id}`}
              className="w-full sm:w-auto px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shrink-0"
            >
              <span>View Property</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
