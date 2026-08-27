'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, ScheduledVisit, Enquiry } from '@/types';
import { MOCK_PROPERTIES, MOCK_VISITS, MOCK_ENQUIRIES } from '@/data/mockData';

type UserRole = 'Guest' | 'User' | 'Agent' | 'Admin';
export type Currency = 'USD' | 'INR';

const USD_TO_INR_RATE = 83.5;

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;

  user: UserProfile | null;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  login: (name: string, email: string) => void;
  logout: () => void;

  currency: Currency;
  setCurrency: (c: Currency) => void;
  currencySymbol: string;
  formatPrice: (usdAmount: number, compact?: boolean) => string;

  favorites: string[]; // Property IDs
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;

  compareList: string[]; // Property IDs (max 4)
  toggleCompare: (propertyId: string) => void;
  isInCompare: (propertyId: string) => boolean;
  clearCompare: () => void;

  visits: ScheduledVisit[];
  addVisit: (visit: Omit<ScheduledVisit, 'id'>) => void;

  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => void;

  properties: Property[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('User');
  const [currency, setCurrencyState] = useState<Currency>('USD');

  // Auth State
  const [user, setUser] = useState<UserProfile | null>({
    name: 'Alexander Drake',
    email: 'alex.drake@zenestate.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const [favorites, setFavorites] = useState<string[]>(['prop-101', 'prop-104']);
  const [compareList, setCompareList] = useState<string[]>(['prop-101', 'prop-102']);
  const [visits, setVisits] = useState<ScheduledVisit[]>(MOCK_VISITS);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(MOCK_ENQUIRIES);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('re_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedFavs = localStorage.getItem('re_favs');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedComp = localStorage.getItem('re_comp');
      if (savedComp) setCompareList(JSON.parse(savedComp));

      const savedCurr = localStorage.getItem('re_curr');
      if (savedCurr === 'INR' || savedCurr === 'USD') setCurrencyState(savedCurr);
    } catch {}
  }, []);

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (name: string, email: string) => {
    const newUser = {
      name: name || 'User',
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };
    setUser(newUser);
    setRole('User');
    try {
      localStorage.setItem('re_user', JSON.stringify(newUser));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('re_user');
    } catch {}
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('re_curr', c);
    } catch {}
  };

  const currencySymbol = currency === 'USD' ? '$' : '₹';

  const formatPrice = (usdAmount: number, compact: boolean = false): string => {
    if (currency === 'USD') {
      if (compact) {
        if (usdAmount >= 1000000) return `$${(usdAmount / 1000000).toFixed(2)}M`;
        if (usdAmount >= 1000) return `$${(usdAmount / 1000).toFixed(0)}k`;
        return `$${usdAmount}`;
      }
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(usdAmount);
    } else {
      const inrAmt = usdAmount * USD_TO_INR_RATE;
      if (compact) {
        if (inrAmt >= 10000000) return `₹${(inrAmt / 10000000).toFixed(2)} Cr`;
        if (inrAmt >= 100000) return `₹${(inrAmt / 100000).toFixed(1)} Lakh`;
        return `₹${Math.round(inrAmt).toLocaleString('en-IN')}`;
      }
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(inrAmt);
    }
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const next = prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId];
      try {
        localStorage.setItem('re_favs', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const toggleCompare = (propertyId: string) => {
    setCompareList(prev => {
      let next: string[];
      if (prev.includes(propertyId)) {
        next = prev.filter(id => id !== propertyId);
      } else {
        if (prev.length >= 4) {
          alert('You can compare up to 4 properties at a time.');
          return prev;
        }
        next = [...prev, propertyId];
      }
      try {
        localStorage.setItem('re_comp', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isInCompare = (propertyId: string) => compareList.includes(propertyId);

  const clearCompare = () => {
    setCompareList([]);
    try {
      localStorage.setItem('re_comp', JSON.stringify([]));
    } catch {}
  };

  const addVisit = (newVisitData: Omit<ScheduledVisit, 'id'>) => {
    const newVisit: ScheduledVisit = {
      ...newVisitData,
      id: `vis-${Date.now()}`,
    };
    setVisits(prev => [newVisit, ...prev]);
  };

  const addEnquiry = (newEnqData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: Enquiry = {
      ...newEnqData,
      id: `enq-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        user,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
        currency,
        setCurrency,
        currencySymbol,
        formatPrice,
        favorites,
        toggleFavorite,
        isFavorite,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        visits,
        addVisit,
        enquiries,
        addEnquiry,
        properties: MOCK_PROPERTIES,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
