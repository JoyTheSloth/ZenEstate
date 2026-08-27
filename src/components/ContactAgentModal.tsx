'use client';

import React, { useState } from 'react';
import { Agent, Property } from '@/types';
import { useApp } from '@/context/AppContext';
import { X, CheckCircle2, Send, PhoneCall } from 'lucide-react';

interface ContactAgentModalProps {
  agent: Agent;
  property?: Property;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactAgentModal({ agent, property, isOpen, onClose }: ContactAgentModalProps) {
  const { addEnquiry } = useApp();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [message, setMessage] = useState(
    property ? `Hello ${agent.name}, I am interested in inquiring about ${property.title}.` : `Hello ${agent.name}, I would like to consult on real estate options.`
  );
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      propertyId: property?.id || 'general',
      propertyTitle: property?.title || 'General Consultation',
      agentId: agent.id,
      agentName: agent.name,
      userName,
      userEmail,
      userPhone,
      message,
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Message Delivered</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you {userName}. <strong>{agent.name}</strong> will respond within 2 business hours.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
              />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Verified House Broker
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{agent.name}</h3>
                <p className="text-xs text-slate-500">{agent.agencyName}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Alexander Vance"
                  className="glass-input-light w-full px-3.5 py-2 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="alex@domain.com"
                    className="glass-input-light w-full px-3.5 py-2 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="glass-input-light w-full px-3.5 py-2 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="glass-input-light w-full px-3.5 py-2 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <a
                href={`tel:${agent.phone}`}
                className="px-4 py-2.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200 flex items-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Call Agent</span>
              </a>

              <button
                type="submit"
                className="flex-1 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
