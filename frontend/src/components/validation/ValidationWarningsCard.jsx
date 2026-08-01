/**
 * ValidationWarningsCard — Phase 5
 * Shows all warnings emitted by the validation engine.
 * Warning types: Missing Reference, Unknown Unit, Negative Value,
 *                Duplicate Parameter, Unknown Parameter, Invalid Unit, Missing Metadata.
 */
import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

const TYPE_COLORS = {
  'Missing Reference':   'text-amber-400  bg-amber-950/40  border-amber-900/50',
  'Unknown Unit':        'text-orange-400 bg-orange-950/40 border-orange-900/50',
  'Negative Value':      'text-red-400    bg-red-950/40    border-red-900/50',
  'Duplicate Parameter': 'text-purple-400 bg-purple-950/40 border-purple-900/50',
  'Unknown Parameter':   'text-slate-400  bg-slate-800/60  border-slate-700/50',
  'Invalid Unit':        'text-orange-400 bg-orange-950/40 border-orange-900/50',
  'Missing Metadata':    'text-yellow-400 bg-yellow-950/40 border-yellow-900/50',
  'Validation Warning':  'text-amber-300  bg-amber-950/30  border-amber-900/40',
};

export function ValidationWarningsCard({ warnings }) {
  const [expanded, setExpanded] = useState(true);

  if (!warnings || warnings.length === 0) return null;

  return (
    <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl overflow-hidden">
      {/* Header (collapsible) */}
      <button
        onClick={() => setExpanded(x => !x)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-amber-950/30 transition"
      >
        <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
          <AlertTriangle className="w-4 h-4" />
          Validation Engine Warnings ({warnings.length})
          <span className="text-[11px] font-normal text-amber-500/80">— Review these before AI analysis</span>
        </div>
        {expanded
          ? <ChevronUp className="w-4 h-4 text-amber-500" />
          : <ChevronDown className="w-4 h-4 text-amber-500" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-1.5 max-h-56 overflow-y-auto">
          {warnings.map((w, idx) => {
            const typeClass = TYPE_COLORS[w.warning_type] || TYPE_COLORS['Validation Warning'];
            return (
              <div
                key={idx}
                className={`flex items-start justify-between gap-3 text-xs border rounded-lg p-2.5 ${typeClass}`}
              >
                <div className="min-w-0">
                  <span className="font-bold">[{w.warning_type || 'Warning'}]</span>
                  {' '}
                  <span className="opacity-90">{w.message}</span>
                  {w.parameter_name && (
                    <span className="ml-1 font-mono opacity-70">({w.parameter_name})</span>
                  )}
                </div>
                {w.page_number && (
                  <span className="shrink-0 text-[10px] opacity-60">pg {w.page_number}</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
