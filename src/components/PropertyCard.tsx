'use client';

import React from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import { useApp } from '@/context/AppContext';
import { Heart, Layers, Bed, Bath, Maximize, MapPin, CheckCircle2, Flame, ArrowUpRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
}

export function PropertyCard({ property, viewMode = 'grid' }: PropertyCardProps) {
  const { isFavorite, toggleFavorite, isInCompare, toggleCompare, formatPrice, currencySymbol, currency } = useApp();
  const favorite = isFavorite(property.id);
  const compared = isInCompare(property.id);

  const formattedPrice = formatPrice(property.price);
  const pricePerSqFt = formatPrice(property.pricePerSqFt, true);

  const primaryImage = property.images.find(img => img.isPrimary)?.url || property.images[0]?.url;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row group border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden bg-slate-100 shrink-0">
          <img
            src={primaryImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.isVerified && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-emerald-700 border border-emerald-200 flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white shadow-sm">
              {property.listingType}
            </span>
          </div>

          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleCompare(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
                compared
                  ? 'bg-slate-900 text-white'
                  : 'bg-white/90 text-slate-700 hover:bg-white hover:text-slate-900'
              }`}
              title={compared ? 'Remove Compare' : 'Add Compare'}
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
                favorite
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500'
              }`}
              title={favorite ? 'Remove Favorite' : 'Save Favorite'}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <div className="p-6 md:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                {property.propertyType} • {property.locality}
              </span>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-slate-900">
                  {formattedPrice}
                </span>
                {property.listingType === 'Rent' && (
                  <span className="text-xs text-slate-500">/{property.rentPeriod}</span>
                )}
              </div>
            </div>

            <Link href={`/properties/${property.id}`}>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                {property.title}
              </h3>
            </Link>

            <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 mb-4">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{property.address}, {property.city}</span>
            </p>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
              {property.description}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-medium text-slate-700">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bed className="w-4 h-4 text-emerald-600" />
                  <strong>{property.bedrooms}</strong> Beds
                </span>
              )}
              <span className="flex items-center gap-1">
                <Bath className="w-4 h-4 text-emerald-600" />
                <strong>{property.bathrooms}</strong> Baths
              </span>
              <span className="flex items-center gap-1">
                <Maximize className="w-4 h-4 text-emerald-600" />
                <strong>{property.areaSqFt.toLocaleString()}</strong> sqft
              </span>
            </div>

            <Link
              href={`/properties/${property.id}`}
              className="flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-emerald-600 transition-all"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden flex flex-col group border border-slate-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ease-out h-full">
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img
          src={primaryImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {property.isVerified && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-emerald-700 border border-emerald-200 flex items-center gap-1 shadow-sm">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
            </span>
          )}
          {property.isHotDeal && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1">
              <Flame className="w-3 h-3" /> Hot Deal
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleCompare(property.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              compared
                ? 'bg-slate-900 text-white'
                : 'bg-white/90 text-slate-700 hover:bg-white hover:text-slate-900'
            }`}
            title={compared ? 'Remove Compare' : 'Add Compare'}
          >
            <Layers className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(property.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              favorite
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500'
            }`}
            title={favorite ? 'Remove Favorite' : 'Save Favorite'}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
          <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-900 px-3 py-1 rounded-full bg-white/95 shadow-sm border border-slate-200">
            {property.listingType} • {property.propertyType}
          </span>
          <span className="text-xs font-mono font-bold text-white bg-slate-900/80 px-2.5 py-1 rounded-full">
            {pricePerSqFt}/sqft
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-xl font-extrabold text-slate-900 mb-1">
            {formattedPrice}
            {property.listingType === 'Rent' && (
              <span className="text-xs text-slate-500 font-normal">/{property.rentPeriod}</span>
            )}
          </div>

          <Link href={`/properties/${property.id}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{property.locality}, {property.city}</span>
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-700">
          <div className="flex items-center gap-3">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-emerald-600" />
                <strong>{property.bedrooms}</strong>
              </span>
            )}
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-emerald-600" />
              <strong>{property.bathrooms}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5 text-emerald-600" />
              <strong>{property.areaSqFt.toLocaleString()}</strong>
            </span>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-emerald-600"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
