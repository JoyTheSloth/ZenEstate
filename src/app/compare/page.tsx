'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { MOCK_PROPERTIES } from '@/data/mockData';
import { 
  Layers, 
  X, 
  Check, 
  RotateCcw, 
  ArrowUpRight 
} from 'lucide-react';

export default function ComparePage() {
  const { compareList, toggleCompare, clearCompare, formatPrice } = useApp();
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  const selectedProperties = MOCK_PROPERTIES.filter((p) => compareList.includes(p.id));

  const compareRows = [
    { label: 'Offered Price', getValue: (p: typeof MOCK_PROPERTIES[0]) => `${formatPrice(p.price)}${p.listingType === 'Rent' ? `/${p.rentPeriod}` : ''}` },
    { label: 'Listing Type', getValue: (p: typeof MOCK_PROPERTIES[0]) => p.listingType },
    { label: 'Property Category', getValue: (p: typeof MOCK_PROPERTIES[0]) => p.propertyType },
    { label: 'Price / SqFt', getValue: (p: typeof MOCK_PROPERTIES[0]) => `${formatPrice(p.pricePerSqFt, true)}/sqft` },
    { label: 'Locality & City', getValue: (p: typeof MOCK_PROPERTIES[0]) => `${p.locality}, ${p.city}` },
    { label: 'Bedrooms', getValue: (p: typeof MOCK_PROPERTIES[0]) => `${p.bedrooms} Beds` },
    { label: 'Bathrooms', getValue: (p: typeof MOCK_PROPERTIES[0]) => `${p.bathrooms} Baths` },
    { label: 'Area (sqft)', getValue: (p: typeof MOCK_PROPERTIES[0]) => `${p.areaSqFt.toLocaleString()} sqft` },
    { label: 'Parking Spaces', getValue: (p: typeof MOCK_PROPERTIES[0]) => `${p.parkingSpaces} Bay` },
    { label: 'Furnishing Status', getValue: (p: typeof MOCK_PROPERTIES[0]) => p.furnishing },
    { label: 'Possession Status', getValue: (p: typeof MOCK_PROPERTIES[0]) => p.possessionStatus },
    { label: 'Facing Direction', getValue: (p: typeof MOCK_PROPERTIES[0]) => p.facing },
    { label: 'Property Age', getValue: (p: typeof MOCK_PROPERTIES[0]) => `${p.ageYears} Yrs` },
  ];

  const allAmenities = [
    'Private Pool',
    'Infinity Pool',
    'Smart Automation',
    'Gym',
    'Solar Power',
    'Wine Cellar',
    'Private Elevator',
    'Home Theater',
    'Concierge 24/7',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F8F9FA]">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            Compare Matrix
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Compare Selected Estates</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Side-by-side specification, financial, and amenity analysis.
          </p>
        </div>

        {selectedProperties.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                highlightDifferences
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <span>{highlightDifferences ? '● Difference Highlight On' : 'Highlight Differences'}</span>
            </button>

            <button
              onClick={clearCompare}
              className="px-4 py-2 rounded-full bg-slate-100 text-xs text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-1.5 border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>
        )}
      </div>

      {selectedProperties.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center space-y-4 max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Properties Added to Comparison</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Browse our property discovery catalog and click the comparison icon (<Layers className="w-3 h-3 inline text-emerald-700" />) to compare specs.
          </p>
          <div className="pt-2">
            <Link
              href="/properties"
              className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow"
            >
              <span>Browse Catalog</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-x-auto shadow-md">
          <table className="w-full text-left border-collapse min-w-[700px]">
            
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-6 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider w-56 shrink-0">
                  Estate Specs
                </th>
                {selectedProperties.map((prop) => (
                  <th key={prop.id} className="p-6 min-w-[220px] max-w-[280px] align-top">
                    <div className="space-y-3 relative group">
                      <button
                        onClick={() => toggleCompare(prop.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors z-10"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="h-32 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                          src={prop.images[0]?.url}
                          alt={prop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                          {prop.propertyType}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{prop.title}</h4>
                        <div className="text-base font-extrabold text-slate-900 mt-1">
                          {formatPrice(prop.price)}
                        </div>
                      </div>

                      <Link
                        href={`/properties/${prop.id}`}
                        className="block text-center py-2 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {compareRows.map((row) => {
                const values = selectedProperties.map((p) => row.getValue(p));
                const isDifferent = new Set(values).size > 1;

                return (
                  <tr
                    key={row.label}
                    className={highlightDifferences && isDifferent ? 'bg-amber-50 font-semibold text-amber-900' : 'hover:bg-slate-50'}
                  >
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/50">
                      {row.label}
                    </td>
                    {selectedProperties.map((prop) => (
                      <td key={prop.id} className="p-4 text-slate-900 font-medium">
                        {row.getValue(prop)}
                      </td>
                    ))}
                  </tr>
                );
              })}

              <tr className="bg-slate-100 font-mono text-[11px] uppercase font-bold text-slate-700">
                <td colSpan={selectedProperties.length + 1} className="p-4 border-t border-slate-200">
                  Amenities Matrix
                </td>
              </tr>

              {allAmenities.map((amenity) => (
                <tr key={amenity} className="hover:bg-slate-50">
                  <td className="p-4 text-slate-700 font-semibold bg-slate-50/50">
                    {amenity}
                  </td>
                  {selectedProperties.map((prop) => {
                    const hasAmenity = prop.amenities.includes(amenity);
                    return (
                      <td key={prop.id} className="p-4">
                        {hasAmenity ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                            <Check className="w-4 h-4" /> Included
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}
