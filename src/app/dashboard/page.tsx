'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { MOCK_PROPERTIES } from '@/data/mockData';
import { PropertyCard } from '@/components/PropertyCard';
import { 
  LayoutDashboard, 
  Heart, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  UserCheck, 
  ShieldCheck,
  Plus
} from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'saved';

  const { role, setRole, favorites, visits, enquiries } = useApp();
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newType, setNewType] = useState('Apartment');
  const [newBeds, setNewBeds] = useState('3');
  const [newBaths, setNewBaths] = useState('2');
  const [newArea, setNewArea] = useState('1800');
  const [newLocality, setNewLocality] = useState('Marina Harbour District');
  const [postedSuccess, setPostedSuccess] = useState(false);

  const favProperties = MOCK_PROPERTIES.filter(p => favorites.includes(p.id));

  const handlePostProperty = (e: React.FormEvent) => {
    e.preventDefault();
    setPostedSuccess(true);
    setTimeout(() => setPostedSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F8F9FA]">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
            <LayoutDashboard className="w-4 h-4" /> Workspace Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            {role === 'Agent' ? 'Broker Portal' : role === 'Admin' ? 'Platform Audit Hub' : 'Member Workspace'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your saved estates, scheduled VIP tours, listing pipelines, and account preferences.
          </p>
        </div>

        {/* Role Switcher Pill */}
        <div className="p-1 rounded-full bg-slate-100 border border-slate-200 flex items-center gap-1 self-start md:self-auto">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-500 px-3">
            Role:
          </span>
          {(['User', 'Agent', 'Admin'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                role === r
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {r === 'User' ? 'Buyer' : r === 'Agent' ? 'Broker' : 'Admin'}
            </button>
          ))}
        </div>
      </div>

      {/* BUYER / USER DASHBOARD VIEW */}
      {(role === 'User' || role === 'Guest') && (
        <div className="space-y-6">
          
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'saved' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Saved Properties ({favorites.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('visits')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'visits' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Scheduled Tours ({visits.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'enquiries' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Sent Inquiries ({enquiries.length})</span>
            </button>
          </div>

          {activeTab === 'saved' && (
            <div>
              {favProperties.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3 shadow-sm">
                  <Heart className="w-10 h-10 text-slate-400 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-900">No Saved Properties Yet</h3>
                  <Link href="/properties" className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs inline-block shadow">
                    Explore Properties
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {favProperties.map(p => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'visits' && (
            <div className="space-y-4">
              {visits.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-xs text-slate-500">
                  No VIP viewing tours scheduled yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visits.map(vis => (
                    <div key={vis.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                      <img src={vis.propertyImage} alt="" className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0" />
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> Tour {vis.status}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 truncate">{vis.propertyTitle}</h4>
                        <div className="text-xs text-slate-600 font-mono">
                          📅 {vis.date} • ⏰ {vis.timeSlot}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">Broker: {vis.agentName}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'enquiries' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Sent Inquiries</h3>
              <div className="divide-y divide-slate-100 text-xs">
                {enquiries.map(enq => (
                  <div key={enq.id} className="py-4 space-y-1">
                    <div className="flex justify-between text-slate-900 font-bold">
                      <span>{enq.propertyTitle}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-800 font-mono border border-emerald-100">
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs italic">&ldquo;{enq.message}&rdquo;</p>
                    <div className="text-[10px] text-slate-400 font-mono">Agent: {enq.agentName} • Sent {new Date(enq.createdAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* AGENT PORTAL VIEW */}
      {role === 'Agent' && (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <div className="text-xs text-slate-500 font-mono">Active Listings</div>
              <div className="text-3xl font-black text-slate-900 mt-1">14</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <div className="text-xs text-slate-500 font-mono">Total Listing Views</div>
              <div className="text-3xl font-black text-emerald-700 mt-1">18,420</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <div className="text-xs text-slate-500 font-mono">Inbound Leads</div>
              <div className="text-3xl font-black text-amber-600 mt-1">42</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <div className="text-xs text-slate-500 font-mono">Conversion Rate</div>
              <div className="text-3xl font-black text-indigo-600 mt-1">8.4%</div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-4 py-2 rounded-full text-xs font-bold ${activeTab === 'listings' || activeTab === 'saved' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-700'}`}
            >
              My Listings (14)
            </button>
            <button
              onClick={() => setActiveTab('post')}
              className={`px-4 py-2 rounded-full text-xs font-bold ${activeTab === 'post' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-700'}`}
            >
              + Post New Property
            </button>
          </div>

          {activeTab === 'post' && (
            <form onSubmit={handlePostProperty} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 max-w-3xl">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900">List a New Property</h3>
                <p className="text-xs text-slate-500">Fill in details for instant platform review.</p>
              </div>

              {postedSuccess && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  ✓ Success! Property submitted to platform moderation.
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Property Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. The Glasshouse Villa"
                    className="glass-input-light w-full px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Price ($ USD)</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="3500000"
                      className="glass-input-light w-full px-3.5 py-2.5 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Property Type</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="glass-input-light w-full px-3.5 py-2.5 rounded-xl text-sm"
                    >
                      <option value="Penthouse">Penthouse</option>
                      <option value="Villa">Villa</option>
                      <option value="Apartment">Apartment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Locality</label>
                    <select
                      value={newLocality}
                      onChange={(e) => setNewLocality(e.target.value)}
                      className="glass-input-light w-full px-3.5 py-2.5 rounded-xl text-sm"
                    >
                      <option value="Marina Harbour District">Marina Harbour District</option>
                      <option value="Bellevue Heights">Bellevue Heights</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          )}

        </div>
      )}

      {/* ADMIN HUB VIEW */}
      {role === 'Admin' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> Platform Moderation Queue
              </h3>
              <p className="text-xs text-slate-500">Review pending property submissions.</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-50 text-emerald-800 font-bold border border-emerald-100">
              2 Pending Audits
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">The Waterfront Pavilion Compound</h4>
                <p className="text-slate-500">Broker: Elena Rostova • Submitted 2 hours ago</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-xs">
                  Approve Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
