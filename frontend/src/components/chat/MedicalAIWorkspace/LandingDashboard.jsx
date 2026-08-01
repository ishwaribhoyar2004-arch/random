import React from 'react';
import { Sparkles, Bot, ShieldCheck, Activity, ArrowRight, HelpCircle } from 'lucide-react';

export default function LandingDashboard({ patientSummary, starters = [], onSelectQuestion }) {
  const summaryText = patientSummary?.summary || 'Clinical Intelligence analyzed from Phase 4–6 deterministic engines.';

  return (
    <div className="flex flex-col gap-4 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-2xs text-slate-800">
      {/* Greeting Banner */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 rounded-xl shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-white shrink-0">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold">Good Morning — Clinical Intelligence Ready</h3>
          <p className="text-xs text-emerald-100 mt-0.5">
            GPT-5 Nano reasoning engine connected strictly to your validated lab dataset.
          </p>
        </div>
      </div>

      {/* Quick Summary Card */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-2">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Deterministic Health Summary
        </div>
        <p className="text-sm text-slate-800 leading-relaxed font-medium">
          {summaryText}
        </p>
      </div>

      {/* Copilot-Style Prompt Chips */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          Ask HealthLens AI Copilot:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {starters.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => onSelectQuestion(chip.query)}
              className="p-3 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all group flex items-center justify-between shadow-2xs"
            >
              <div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-800">{chip.label}</div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">{chip.query}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
