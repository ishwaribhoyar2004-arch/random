import React from 'react';
import { ShieldAlert, AlertCircle } from 'lucide-react';

export function CriticalValuesCard({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-rose-950/40 border-2 border-rose-600/80 rounded-xl p-5 shadow-xl mb-6 text-slate-200 animate-pulse">
      <div className="flex items-center gap-3 mb-3 border-b border-rose-800/60 pb-3">
        <div className="p-2 bg-rose-900/80 text-rose-200 rounded-lg">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-md font-extrabold text-rose-200 tracking-wide uppercase">
            🚨 Critical Clinical Alert ({items.length})
          </h3>
          <p className="text-xs text-rose-300">
            Immediate safety threshold exceedance detected by Phase 5 Critical Rules Engine
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {items.map((item, idx) => (
          <div key={idx} className="bg-slate-900/90 border border-rose-800/80 rounded-lg p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>{item.parameter_name}</span>
                <span className="text-xs font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                  {item.raw_value} {item.normalized_unit}
                </span>
              </div>
              {item.validation_notes && (
                <p className="text-xs text-rose-300 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {item.validation_notes}
                </p>
              )}
            </div>
            <span className="px-2.5 py-1 bg-rose-900 text-rose-100 text-xs font-bold rounded uppercase border border-rose-700">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
