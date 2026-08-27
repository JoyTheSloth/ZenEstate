'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_AGENTS, MOCK_PROPERTIES } from '@/data/mockData';
import { PropertyCard } from '@/components/PropertyCard';
import { ContactAgentModal } from '@/components/ContactAgentModal';
import { ShieldCheck, Star, PhoneCall } from 'lucide-react';

export default function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const agent = MOCK_AGENTS.find((a) => a.id === id);

  if (!agent) {
    notFound();
  }

  const [isContactOpen, setIsContactOpen] = useState(false);
  const agentProperties = MOCK_PROPERTIES.filter((p) => p.agentId === agent.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-[#F8F9FA]">
      
      <div className="flex items-center gap-2">
        <Link href="/agents" className="text-xs font-mono font-bold text-slate-700 hover:underline">
          ← Back to Agent Directory
        </Link>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-24 h-24 rounded-3xl object-cover border-2 border-emerald-500/30 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Premier Broker
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{agent.rating} ({agent.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl font-extrabold text-slate-900">{agent.name}</h1>
              <p className="text-sm text-slate-500 mt-0.5">{agent.agencyName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href={`tel:${agent.phone}`}
              className="flex-1 md:flex-none px-4 py-3 rounded-full bg-slate-100 text-xs font-bold text-slate-800 hover:bg-slate-200 flex items-center justify-center gap-2 border border-slate-200"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Call Broker</span>
            </a>
            <button
              onClick={() => setIsContactOpen(true)}
              className="flex-1 md:flex-none px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
            >
              Direct Message
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed font-normal border-t border-slate-100 pt-6">
          {agent.bio}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs font-medium">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="text-slate-400 font-mono text-[10px] uppercase font-bold">Experience</div>
            <div className="text-slate-900 font-extrabold text-base mt-0.5">{agent.experienceYears} Years</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="text-slate-400 font-mono text-[10px] uppercase font-bold">Active Portfolio</div>
            <div className="text-emerald-700 font-extrabold text-base mt-0.5">{agentProperties.length} Estates</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="text-slate-400 font-mono text-[10px] uppercase font-bold">Estates Sold</div>
            <div className="text-slate-900 font-extrabold text-base mt-0.5">{agent.totalSold} Sales</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="text-slate-400 font-mono text-[10px] uppercase font-bold">Rating Score</div>
            <div className="text-amber-600 font-extrabold text-base mt-0.5">{agent.rating} / 5.0</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">Exclusive Portfolio</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Active Listings by {agent.name} ({agentProperties.length})</h2>
        </div>

        {agentProperties.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            No active public listings currently available for this broker.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agentProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>

      <ContactAgentModal
        agent={agent}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
