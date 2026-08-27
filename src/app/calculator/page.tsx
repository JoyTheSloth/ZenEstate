'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Calculator, PieChart, ArrowUpRight, Printer, TrendingDown } from 'lucide-react';

function CalculatorContent() {
  const searchParams = useSearchParams();
  const initialPrice = Number(searchParams.get('price')) || 3200000;
  const { formatPrice } = useApp();

  const [propertyPrice, setPropertyPrice] = useState(initialPrice);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [tenureYears, setTenureYears] = useState(30);

  const downPaymentAmt = propertyPrice * (downPaymentPct / 100);
  const principalLoan = propertyPrice - downPaymentAmt;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenureYears * 12;

  const monthlyEMI = useMemo(() => {
    if (monthlyRate === 0) return principalLoan / totalMonths;
    return (principalLoan * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }, [principalLoan, monthlyRate, totalMonths]);

  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = totalPayment - principalLoan;

  const principalPct = Math.round((principalLoan / totalPayment) * 100) || 50;
  const interestPct = 100 - principalPct;

  const amortizationSchedule = useMemo(() => {
    let balance = principalLoan;
    const schedule = [];

    for (let yr = 1; yr <= Math.min(tenureYears, 10); yr++) {
      let interestForYear = 0;
      let principalForYear = 0;

      for (let m = 1; m <= 12; m++) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = monthlyEMI - interestForMonth;
        interestForYear += interestForMonth;
        principalForYear += principalForMonth;
        balance -= principalForMonth;
      }

      schedule.push({
        year: yr,
        principalPaid: Math.round(principalForYear),
        interestPaid: Math.round(interestForYear),
        remainingBalance: Math.max(0, Math.round(balance)),
      });
    }

    return schedule;
  }, [principalLoan, monthlyRate, monthlyEMI, tenureYears]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-[#F8F9FA]">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
            <Calculator className="w-4 h-4" /> Mortgage & Wealth Suite
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">EMI & Mortgage Calculator</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time monthly repayment breakdown, total interest payload, and annual amortization schedule.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-full bg-slate-100 text-xs text-slate-700 hover:bg-slate-200 font-semibold flex items-center gap-2 border border-slate-200 self-start md:self-auto"
        >
          <Printer className="w-4 h-4" /> Print Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Sliders Column */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Loan Inputs & Adjustments</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Property Price</span>
              <span className="text-slate-900 font-black text-base">{formatPrice(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min="200000"
              max="15000000"
              step="100000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-slate-900"
            />
            <div className="flex gap-2 pt-1">
              {[1500000, 3200000, 4850000, 8500000].map(val => (
                <button
                  key={val}
                  onClick={() => setPropertyPrice(val)}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-all ${
                    propertyPrice === val ? 'bg-slate-900 text-white font-bold' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {formatPrice(val, true)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Down Payment ({downPaymentPct}%)</span>
              <span className="text-slate-900 font-bold">{formatPrice(downPaymentAmt)}</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-full accent-slate-900"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Annual Interest Rate</span>
              <span className="text-slate-900 font-bold">{interestRate}% Fixed</span>
            </div>
            <input
              type="range"
              min="2.0"
              max="12.0"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-slate-900"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Loan Duration (Tenure)</span>
              <span className="text-slate-900 font-bold">{tenureYears} Years</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[10, 15, 20, 30].map(yr => (
                <button
                  key={yr}
                  onClick={() => setTenureYears(yr)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    tenureYears === yr
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {yr} Yrs
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Main EMI Highlight Box */}
          <div className="bg-emerald-50 border border-emerald-200/80 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
            <div>
              <span className="text-xs font-mono uppercase font-bold tracking-widest text-emerald-800">Estimated Monthly EMI</span>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 mt-1">
                {formatPrice(monthlyEMI)}
                <span className="text-base text-slate-600 font-normal"> / month</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-200/60 text-xs">
              <div>
                <div className="text-slate-600 font-mono text-[10px] uppercase font-bold">Principal</div>
                <div className="text-slate-900 font-extrabold text-sm mt-0.5">{formatPrice(principalLoan)}</div>
              </div>
              <div>
                <div className="text-slate-600 font-mono text-[10px] uppercase font-bold">Total Interest</div>
                <div className="text-amber-800 font-extrabold text-sm mt-0.5">{formatPrice(totalInterest)}</div>
              </div>
              <div>
                <div className="text-slate-600 font-mono text-[10px] uppercase font-bold">Total Repayment</div>
                <div className="text-emerald-900 font-extrabold text-sm mt-0.5">{formatPrice(totalPayment)}</div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-emerald-800">Principal ({principalPct}%)</span>
                <span className="text-amber-800">Interest ({interestPct}%)</span>
              </div>
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex border border-slate-300">
                <div style={{ width: `${principalPct}%` }} className="bg-emerald-600 h-full" />
                <div style={{ width: `${interestPct}%` }} className="bg-amber-500 h-full" />
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/properties"
                className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <span>Find Properties In Your Budget</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* LOAN BALANCE PAYOFF CURVE CHART */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-600" /> Loan Balance Payoff Curve
              </h3>
              <span className="text-[11px] font-mono text-slate-400">10-Year Trajectory</span>
            </div>

            {/* Visual Bar Payoff Chart */}
            <div className="grid grid-cols-10 gap-2 pt-2 items-end h-32 border-b border-slate-100 pb-2">
              {amortizationSchedule.map((row) => {
                const balanceRatio = Math.max(10, Math.round((row.remainingBalance / principalLoan) * 100));
                return (
                  <div key={row.year} className="flex flex-col items-center gap-1 h-full justify-end group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-8 hidden group-hover:block bg-slate-900 text-white text-[9px] font-mono px-2 py-0.5 rounded shadow z-10 whitespace-nowrap">
                      Yr {row.year}: {formatPrice(row.remainingBalance, true)}
                    </div>
                    <div
                      style={{ height: `${balanceRatio}%` }}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 rounded-t transition-all"
                    />
                    <span className="text-[9px] font-mono text-slate-400">Y{row.year}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Amortization Schedule Table */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-600" /> Amortization Preview (First 10 Years)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-200 font-mono text-[10px] uppercase font-bold">
                    <th className="py-2">Year</th>
                    <th className="py-2">Principal Paid</th>
                    <th className="py-2">Interest Paid</th>
                    <th className="py-2 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {amortizationSchedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50">
                      <td className="py-2 font-bold text-emerald-700">Year {row.year}</td>
                      <td className="py-2 text-slate-800">{formatPrice(row.principalPaid)}</td>
                      <td className="py-2 text-amber-700">{formatPrice(row.interestPaid)}</td>
                      <td className="py-2 text-right font-bold text-slate-900">{formatPrice(row.remainingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Calculator...</div>}>
      <CalculatorContent />
    </Suspense>
  );
}
