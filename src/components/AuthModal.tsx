'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  Lock,
  Mail,
  User
} from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode, login } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>(authModalMode);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('workmail@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('You must agree to the Terms & Privacy Policy.');
      return;
    }

    const displayName = mode === 'signup' ? (name || 'New Member') : (email.split('@')[0] || 'Member');
    
    login(displayName, email);
    setSuccessMsg(mode === 'signup' ? 'Account created successfully! Welcome to ZenEstate.' : 'Logged in successfully!');

    setTimeout(() => {
      setSuccessMsg('');
      closeAuthModal();
    }, 1200);
  };

  const handleSocialAuth = (provider: string) => {
    login(`${provider} User`, `user@${provider.toLowerCase()}.com`);
    setSuccessMsg(`Authenticated via ${provider}!`);
    setTimeout(() => {
      setSuccessMsg('');
      closeAuthModal();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Graphic Panel */}
        <div className="md:col-span-5 relative p-8 sm:p-10 bg-gradient-to-br from-indigo-900 via-indigo-700 to-blue-600 text-white flex flex-col justify-between overflow-hidden">
          
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-400/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-indigo-500/40 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="ZenEstate Logo"
                className="w-8 h-8 rounded-xl object-cover shadow-sm"
              />
              <span className="text-sm font-extrabold tracking-wider">ZenEstate</span>
            </div>

            <div className="space-y-3 pt-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-200 opacity-90">
                You can easily
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-white">
                Speed up your work with our Web App
              </h2>
              <p className="text-xs text-indigo-100/90 leading-relaxed font-light">
                Access 100% verified luxury compounds, real-time mortgage analytics, and instant broker tours.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/10 space-y-2">
            <span className="text-[10px] font-mono text-indigo-200 uppercase tracking-widest block opacity-75">Our partners</span>
            <div className="flex items-center gap-4 text-xs font-semibold text-white/80 opacity-90 overflow-x-auto">
              <span>Discord</span>
              <span>•</span>
              <span>Instagram</span>
              <span>•</span>
              <span>Spotify</span>
              <span>•</span>
              <span>YouTube</span>
              <span>•</span>
              <span>TikTok</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Auth Form Panel */}
        <div className="md:col-span-7 p-8 sm:p-10 bg-white flex flex-col justify-between space-y-6">
          
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {mode === 'signup' ? 'Create Your Account' : 'Get Started Now'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {mode === 'signup' ? 'Fill in details to set up your ZenEstate portal.' : 'Please log in to your account to continue.'}
            </p>
          </div>

          {successMsg ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <div className="text-sm font-bold text-emerald-900">{successMsg}</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Enter your name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Email address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="workmail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-700">Password</label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset link sent to ' + (email || 'your email'))}
                      className="text-indigo-600 hover:underline text-[11px] font-semibold"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <label htmlFor="terms" className="text-xs text-slate-600">
                  Agree to the <span className="text-indigo-600 font-semibold cursor-pointer">Terms & Privacy</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all mt-2"
              >
                {mode === 'signup' ? 'Create Account' : 'Login'}
              </button>

              <div className="text-center text-xs text-slate-500 pt-1">
                {mode === 'signup' ? (
                  <span>Already have an account? <button type="button" onClick={() => setMode('signin')} className="text-indigo-600 font-bold hover:underline">Sign in</button></span>
                ) : (
                  <span>Don&apos;t have an account? <button type="button" onClick={() => setMode('signup')} className="text-indigo-600 font-bold hover:underline">Sign up</button></span>
                )}
              </div>

              <div className="pt-3 space-y-3">
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200" />
                  <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-mono">Or</span>
                  <div className="flex-grow border-t border-slate-200" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialAuth('Google')}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Login with Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialAuth('Apple')}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 transition-all"
                  >
                    <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.09c.68-.82 1.13-1.96.99-3.09-1 .04-2.21.67-2.91 1.48-.62.72-1.16 1.88-1.01 2.99 1.12.09 2.25-.56 2.93-1.38z" />
                    </svg>
                    <span>Login with Apple</span>
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
