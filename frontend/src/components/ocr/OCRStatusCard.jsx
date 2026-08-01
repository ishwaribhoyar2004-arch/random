import React from 'react';
import { Cpu, Clock, Layers, FileText, CheckCircle, RefreshCw } from 'lucide-react';
import ConfidenceBadge from './ConfidenceBadge';

export const OCRStatusCard = ({ ocrData, onRetry }) => {
  if (!ocrData) return null;

  const { status, engine, confidence, page_count, processing_time, version } = ocrData;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Side: Status & Engine info */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-slate-100">
                Engine: <span className="text-blue-400 font-mono">{engine || 'Document Intelligence'}</span>
              </h4>
              <span className="px-2 py-0.5 text-[10px] font-mono font-medium bg-slate-800 text-slate-300 rounded border border-slate-700">
                v{version || 1}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
              <span className="capitalize text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> {status || 'completed'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" /> {processing_time ? `${processing_time}s` : 'Instant'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-slate-500" /> {page_count || 1} {page_count === 1 ? 'Page' : 'Pages'}
              </span>
            </p>
          </div>
        </div>

        {/* Right Side: Confidence & Retry */}
        <div className="flex items-center gap-3">
          <ConfidenceBadge confidence={confidence} />

          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry OCR
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OCRStatusCard;
