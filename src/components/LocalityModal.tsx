'use client';

import React from 'react';
import Link from 'next/link';
import { Locality } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  TrendingUp, 
  ShieldCheck, 
  GraduationCap, 
  Bus, 
  Sparkles,
  ArrowUpRight,
  Building2
} from 'lucide-react';

interface LocalityModalProps {
  locality: Locality | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LocalityModal({ locality, isOpen, onClose }: LocalityModalProps) {
  const { formatPrice } = useApp();

  if (!isOpen || !locality) return null;

  // Mock 3-Year Price History Curve
  const priceHistory = [
    { year: '2024', price: Math.round(locality.avgPricePerSqFt * 0.82) },
    { year: '2025', price: Math.round(locality.avgPricePerSqFt * 0.91) },
    { year: '2026', price: locality.avgPricePerSqFt },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <img
            src={locality.image}
            alt={locality.name}
            className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-sm"
          />
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center gap-1 w-fit">
              <TrendingUp className="w-3 h-3 text-emerald-600" /> +{locality.growthRatePercent}% YoY Appreciation
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">{locality.name}</h2>
            <p className="text-xs text-slate-500">{locality.city} • {locality.propertyCount} Active Estates</p>
          </div>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {locality.description}
        </p>

        {/* 3-Year Price Growth Visual Bar Chart */}
        <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" /> 3-Year Avg Price / SqFt Appreciation
            </h3>
            <span className="text-xs font-black text-slate-900">{formatPrice(locality.avgPricePerSqFt, true)}/sqft</span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 text-center">
            {priceHistory.map((item, idx) => (
              <div key={item.year} className="space-y-1.5">
                <div className="h-16 bg-slate-100 rounded-xl relative overflow-hidden flex items-end justify-center p-1">
                  <div
                    style={{ height: `${60 + idx * 20}%` }}
                    className="w-full bg-slate-900 rounded-lg transition-all"
                  />
                </div>
                <div className="text-[11px] font-mono font-bold text-slate-900">{formatPrice(item.price, true)}</div>
                <div className="text-[10px] text-slate-400 font-mono">{item.year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Neighborhood Scores Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-1">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto" />
            <div className="text-[10px] text-slate-500 font-mono font-bold">Safety Index</div>
            <div className="text-sm font-extrabold text-slate-900">98 / 100</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-1">
            <GraduationCap className="w-5 h-5 text-indigo-600 mx-auto" />
            <div className="text-[10px] text-slate-500 font-mono font-bold">Schools Rating</div>
            <div className="text-sm font-extrabold text-slate-900">9.6 / 10</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-1">
            <Bus className="w-5 h-5 text-amber-600 mx-auto" />
            <div className="text-[10px] text-slate-500 font-mono font-bold">Transit Score</div>
            <div className="text-sm font-extrabold text-slate-900">92 / 100</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-1">
            <Sparkles className="w-5 h-5 text-rose-500 mx-auto" />
            <div className="text-[10px] text-slate-500 font-mono font-bold">Lifestyle Index</div>
            <div className="text-sm font-extrabold text-slate-900">99 / 100</div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-2">
          <Link
            href={`/properties?locality=${encodeURIComponent(locality.name)}`}
            onClick={onClose}
            className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
          >
            <span>View All Properties in {locality.name}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
