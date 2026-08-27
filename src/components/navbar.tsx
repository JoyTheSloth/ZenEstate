'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Heart, 
  UserCheck, 
  Menu, 
  X, 
  ChevronDown,
  LogOut,
  PlusCircle,
  Building2
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { 
    role, 
    setRole, 
    user, 
    logout, 
    openAuthModal, 
    currency, 
    setCurrency, 
    favorites, 
    compareList 
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const roles = [
    { key: 'Guest', label: 'Guest Explorer' },
    { key: 'User', label: 'Registered Buyer' },
    { key: 'Agent', label: 'Listing Agent' },
    { key: 'Admin', label: 'Platform Admin' },
  ] as const;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Property List' },
    { href: '/compare', label: 'Compare', badge: compareList.length },
    { href: '/calculator', label: 'Calculator' },
    { href: '/agents', label: 'Agents' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Uploaded Brand Image */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="ZenEstate Logo"
              className="w-9 h-9 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                ZenEstate<span className="text-emerald-600 font-black">.</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Center Pill */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200 shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge !== undefined && link.badge > 0 && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-emerald-500 text-white">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Currency Toggle Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 text-xs">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all ${
                  currency === 'USD' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                $ USD
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all ${
                  currency === 'INR' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ₹ INR
              </button>
            </div>

            {/* Favorites Icon Button */}
            <button
              onClick={() => openAuthModal('signin')}
              className="relative p-2.5 rounded-full text-slate-600 hover:text-rose-500 hover:bg-slate-100 transition-colors"
              title="Saved Favorites"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold rounded-full bg-rose-500 text-white flex items-center justify-center shadow">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-200/70 transition-all"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{role}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-2xl shadow-xl border border-slate-200 z-50">
                  <div className="px-3 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Switch Demo View
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r.key}
                      onClick={() => {
                        setRole(r.key);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        role === r.key ? 'text-emerald-600 font-bold bg-emerald-50' : 'text-slate-700'
                      }`}
                    >
                      <span>{r.label}</span>
                      {role === r.key && <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile Avatar vs Sign In CTA Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-bold text-slate-800 transition-all"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-emerald-500"
                  />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 py-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 space-y-1">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900 truncate">{user.name}</div>
                      <div className="text-[10px] text-slate-500 truncate font-mono">{user.email}</div>
                    </div>

                    <Link
                      href="/about"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                    >
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      <span>About ZenEstate</span>
                    </Link>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        openAuthModal('signup');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                    >
                      <PlusCircle className="w-4 h-4 text-emerald-600" />
                      <span>List Property</span>
                    </button>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-bold"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('signin')}
                className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#84CC16] hover:bg-[#65A30D] text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Sign In / List</span>
              </button>
            )}

          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
              className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
            >
              {currency === 'USD' ? '$ USD' : '₹ INR'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-500 text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-3">
            {user ? (
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} className="w-8 h-8 rounded-full border border-emerald-500 object-cover" />
                  <span className="text-xs font-bold text-slate-900">{user.name}</span>
                </div>
                <button onClick={logout} className="text-xs font-bold text-rose-600">Sign Out</button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('signin');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#84CC16] text-slate-950 font-bold text-sm shadow"
              >
                <span>Sign In / List Property</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
