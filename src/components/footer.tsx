'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ArrowRight } from 'lucide-react';

export function Footer() {
  const { openAuthModal } = useApp();

  return (
    <footer className="relative bg-[#F8F9FA] pt-12 pb-16 text-slate-600 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP CTA CONTAINER BANNER */}
        <div className="relative rounded-[2.5rem] bg-slate-950 text-white p-10 sm:p-16 text-center overflow-hidden shadow-2xl border border-slate-800">
          
          <div className="absolute inset-0 bg-radial from-slate-800/60 via-slate-950 to-slate-950 pointer-events-none" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Ready to transform your lifestyle?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-lg mx-auto">
              Join thousands of homeowners and investors discovering architect-designed sanctuaries in minutes.
            </p>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => openAuthModal('signup')}
                className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Start for free</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        </div>

        {/* MAIN FLOATING WHITE CARD CONTAINER */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl space-y-10 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Brand Column */}
            <div className="lg:col-span-5 space-y-5">
              <Link href="/" className="flex items-center gap-2.5">
                <img
                  src="/logo.png"
                  alt="ZenEstate Logo"
                  className="w-9 h-9 rounded-xl object-cover shadow-md"
                />
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  ZenEstate<span className="text-emerald-600 font-black">.</span>
                </span>
              </Link>

              <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-normal">
                ZenEstate empowers buyers, investors, and brokers to discover raw architectural potential — making high-end property insights easier to explore, evaluate, and act on.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4 text-slate-700 pt-2">
                <a href="#" className="p-2 rounded-full hover:bg-slate-100 transition-colors" title="X (Twitter)">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <a href="#" className="p-2 rounded-full hover:bg-slate-100 transition-colors" title="Instagram">
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                <a href="#" className="p-2 rounded-full hover:bg-slate-100 transition-colors" title="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                <a href="#" className="p-2 rounded-full hover:bg-slate-100 transition-colors" title="GitHub">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Link Columns */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs">
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs">Product</h4>
                <ul className="space-y-2 text-slate-500 font-medium">
                  <li><Link href="/properties" className="hover:text-slate-900 transition-colors">Features</Link></li>
                  <li><Link href="/calculator" className="hover:text-slate-900 transition-colors">Pricing</Link></li>
                  <li><Link href="/compare" className="hover:text-slate-900 transition-colors">Integrations</Link></li>
                  <li><Link href="/dashboard" className="hover:text-slate-900 transition-colors">Changelog</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs">Resources</h4>
                <ul className="space-y-2 text-slate-500 font-medium">
                  <li><Link href="/calculator" className="hover:text-slate-900 transition-colors">Documentation</Link></li>
                  <li><Link href="/properties" className="hover:text-slate-900 transition-colors">Tutorials</Link></li>
                  <li><Link href="/agents" className="hover:text-slate-900 transition-colors">Blog</Link></li>
                  <li><Link href="/dashboard" className="hover:text-slate-900 transition-colors">Support</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs">Company</h4>
                <ul className="space-y-2 text-slate-500 font-medium">
                  <li><Link href="/agents" className="hover:text-slate-900 transition-colors">About</Link></li>
                  <li><Link href="/agents" className="hover:text-slate-900 transition-colors">Careers</Link></li>
                  <li><Link href="/agents" className="hover:text-slate-900 transition-colors">Contact</Link></li>
                  <li><Link href="/agents" className="hover:text-slate-900 transition-colors">Partners</Link></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-500">
            <p>© {new Date().getFullYear()} ZenEstate. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy Portal</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Cookie Settings</a>
            </div>
          </div>

        </div>

        {/* GIANT WATERMARK TYPOGRAPHY */}
        <div className="w-full overflow-hidden select-none pointer-events-none -mt-16 pt-4 text-center">
          <span className="text-7xl sm:text-[9.5rem] font-black tracking-tighter text-slate-300/40 uppercase block leading-none">
            ZenEstate
          </span>
        </div>

      </div>
    </footer>
  );
}
