'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_AGENTS, MOCK_PROPERTIES } from '@/data/mockData';
import { ContactAgentModal } from '@/components/ContactAgentModal';
import { Agent } from '@/types';
import { Star, Award, ArrowUpRight, Search } from 'lucide-react';

export default function AgentsDirectoryPage() {
  const [search, setSearch] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const filteredAgents = MOCK_AGENTS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.agencyName.toLowerCase().includes(search.toLowerCase()) ||
    a.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-[#F8F9FA]">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
            <Award className="w-4 h-4" /> Vetted Premier Brokers
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Premier Agent Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Connect directly with top 1% luxury brokers, estate advisors, and commercial managers.
          </p>
        </div>

        <div className="glass-input-light px-3.5 py-2 rounded-2xl flex items-center gap-2.5 w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter agent or specialty..."
            className="bg-transparent w-full text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredAgents.map((agent) => {
          return (
            <div key={agent.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-18 h-18 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{agent.rating} ({agent.reviewCount})</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{agent.name}</h3>
                    <p className="text-xs text-slate-500">{agent.agencyName}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                  {agent.bio}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {agent.specialties.map(spec => (
                    <span key={spec} className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono py-2 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <div className="text-slate-400">Listings</div>
                    <div className="text-slate-900 font-bold">{agent.activeListingsCount}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Sold</div>
                    <div className="text-emerald-700 font-bold">{agent.totalSold}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Exp</div>
                    <div className="text-slate-900 font-bold">{agent.experienceYears} yrs</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/agents/${agent.id}`}
                    className="flex-1 py-2.5 rounded-full bg-slate-100 text-xs text-slate-800 font-bold hover:bg-slate-200 flex items-center justify-center gap-1 border border-slate-200"
                  >
                    <span>Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => setSelectedAgent(agent)}
                    className="py-2.5 px-5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm"
                  >
                    Contact
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {selectedAgent && (
        <ContactAgentModal
          agent={selectedAgent}
          isOpen={!!selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}

    </div>
  );
}
