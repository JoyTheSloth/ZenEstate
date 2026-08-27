'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Globe2,
  CheckCircle2,
  Compass
} from 'lucide-react';

export default function AboutPage() {
  const { openAuthModal } = useApp();

  const values = [
    {
      title: 'Architectural Integrity',
      desc: 'We curate only verified luxury compounds, glass pavilions, and modern sanctuaries that meet 42 rigorous design standards.',
      icon: Building2
    },
    {
      title: 'Transparent Security',
      desc: 'Every deed and title undergoes deep legal audits, structural safety checks, and cross-border escrow protection.',
      icon: ShieldCheck
    },
    {
      title: 'Global Reach',
      desc: 'Seamless foreign investor support, multi-currency conversion ($ USD and ₹ INR), and private VIP broker concierges.',
      icon: Globe2
    },
    {
      title: 'Unrivaled Value',
      desc: 'Direct developer partnerships ensure price transparency and zero hidden intermediary markups for our buyers.',
      icon: Award
    }
  ];

  const team = [
    {
      name: 'Alexander Wright',
      role: 'Founder & Chief Architect',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      bio: 'Former principal architect at Studio Arch, with 18+ years designing high-end waterfront compounds.'
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Global Concierge',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Specializes in cross-border acquisitions and private VIP compound walkthroughs for international clients.'
    },
    {
      name: 'Marcus Vance',
      role: 'Lead Valuation & Legal Counsel',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      bio: 'Over 15 years in real estate title law, structural compliance auditing, and escrow advisory.'
    }
  ];

  return (
    <div className="space-y-16 pb-20 bg-[#F8F9FA]">
      
      {/* FANCY HERO CONTAINER CARD (SAME STYLE AS FOOTER CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-[2.5rem] bg-slate-950 text-white p-10 sm:p-16 text-center overflow-hidden shadow-2xl border border-slate-800 min-h-[480px] flex flex-col justify-center items-center">
          
          <div className="absolute inset-0 bg-radial from-slate-800/60 via-slate-950 to-slate-950 pointer-events-none" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" /> OUR PHILOSOPHY & VISION
            </span>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Redefining Modern Living Through Architectural Distinction.
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-xl mx-auto">
              ZenEstate was built to connect discerning buyers with hand-picked architectural sanctuaries, transparent valuation analytics, and seamless global acquisition tools.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/properties"
                className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs shadow-xl transition-all hover:scale-105 flex items-center gap-2"
              >
                <span>Explore Our Portfolio</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>

              <button
                onClick={() => openAuthModal('signup')}
                className="px-7 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white font-extrabold text-xs shadow-xl border border-slate-700 transition-all"
              >
                Join Private Concierge
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* METRICS & ACHIEVEMENTS CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-md space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">Track Record</span>
            <h2 className="text-3xl font-black text-slate-900">Empowering High-Value Real Estate</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900">$2.4B+</div>
              <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Total Estate Volume</div>
            </div>
            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900">1,500+</div>
              <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Verified Compounds</div>
            </div>
            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900">99.4%</div>
              <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Title Audit Pass Rate</div>
            </div>
            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900">18+</div>
              <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Metropolitan Hubs</div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES GRID (FANCY WHITE CONTAINER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-md space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Core Principles
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">What sets ZenEstate apart</h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              We bridge the gap between complex legal verification and effortless luxury property acquisition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXECUTIVE LEADERSHIP SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-md space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">Leadership Team</span>
              <h2 className="text-3xl font-black text-slate-900 mt-1">Guided by Senior Advisory</h2>
            </div>
            <Link href="/agents" className="text-xs font-bold text-slate-900 hover:text-emerald-600">
              Meet All Premier Agents →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 group hover:shadow-xl transition-all">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 shadow">
                    {member.role}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900">{member.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FANCY BOTTOM BANNER (SAME STYLE AS FOOTER WATERMARK) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-slate-900 rounded-[2.5rem] p-10 sm:p-16 text-white text-center relative overflow-hidden shadow-2xl space-y-6">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Begin your journey to exceptional real estate today.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Explore curated compounds, calculate mortgage scenarios, and connect with senior brokers.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/properties"
                className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-xl transition-all flex items-center gap-2"
              >
                <span>Browse Premier Estates</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full overflow-hidden select-none pointer-events-none opacity-10 text-center absolute -bottom-10 left-0 right-0">
            <span className="text-8xl sm:text-[12rem] font-black tracking-tighter text-white uppercase block leading-none">
              ZENESTATE
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
