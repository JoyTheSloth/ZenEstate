'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Layers, X, ArrowRight, RotateCcw } from 'lucide-react';

export function CompareDock() {
  const { compareList, toggleCompare, clearCompare, properties } = useApp();

  if (compareList.length === 0) return null;

  const selectedProperties = properties.filter(p => compareList.includes(p.id));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-bounce-subtle max-w-full px-4">
      <div className="bg-slate-950/95 backdrop-blur-md text-white rounded-full p-2 pl-5 pr-3 shadow-2xl border border-slate-800 flex items-center gap-4 sm:gap-6">
        
        {/* Count Indicator */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-white">Compare List</div>
            <div className="text-[10px] text-slate-400 font-mono">{compareList.length} of 4 selected</div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="hidden sm:flex items-center gap-2 border-x border-slate-800 px-4">
          {selectedProperties.map(p => (
            <div key={p.id} className="relative group">
              <img
                src={p.images[0]?.url}
                alt={p.title}
                className="w-9 h-9 rounded-full object-cover border border-slate-700"
              />
              <button
                onClick={() => toggleCompare(p.id)}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-[10px]"
                title="Remove"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={clearCompare}
            className="p-2 rounded-full text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
            title="Clear comparison"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <Link
            href="/compare"
            className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
