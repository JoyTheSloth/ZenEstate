'use client';

import React, { useState } from 'react';
import { Property, Agent } from '@/types';
import { useApp } from '@/context/AppContext';
import { Calendar, Clock, X, CheckCircle2 } from 'lucide-react';

interface ScheduleVisitModalProps {
  property: Property;
  agent?: Agent;
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleVisitModal({ property, agent, isOpen, onClose }: ScheduleVisitModalProps) {
  const { addVisit } = useApp();
  const [date, setDate] = useState('2026-09-02');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 12:00 PM');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '04:30 PM - 05:30 PM (Sunset VIP)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVisit({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: property.images[0]?.url || '',
      agentName: agent?.name || 'Listing Agent',
      date,
      timeSlot,
      status: 'Confirmed',
      notes,
    });
    setIsSuccess(true);
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

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">VIP Tour Scheduled!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Your appointment for <strong>{property.title}</strong> on <strong>{date} ({timeSlot})</strong> has been confirmed.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md"
              >
                Close & View Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">VIP Property Tour</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 line-clamp-1">{property.title}</h3>
              <p className="text-xs text-slate-500">{property.address}, {property.city}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="glass-input-light w-full px-3.5 py-2.5 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`p-2.5 text-xs rounded-xl border text-center font-medium transition-all ${
                        timeSlot === slot
                          ? 'bg-slate-900 border-slate-900 text-white font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special preferences or access requirements..."
                  className="glass-input-light w-full px-3.5 py-2 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md"
              >
                Confirm Tour
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
