import React from 'react';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';

export const PageNavigator = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  currentVersion = 1,
  onVersionChange
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2 text-xs">
      {/* Page controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition-colors"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-slate-300 font-medium px-1">
          Page <strong className="text-blue-400">{currentPage}</strong> of <strong className="text-slate-200">{totalPages}</strong>
        </span>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition-colors"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Version Selector */}
      {onVersionChange && (
        <div className="flex items-center gap-2">
          <Bookmark className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-400">OCR Version:</span>
          <select
            value={currentVersion}
            onChange={(e) => onVersionChange(Number(e.target.value))}
            className="bg-slate-950 border border-slate-800 text-blue-400 text-xs rounded-lg px-2 py-1 font-mono focus:outline-none focus:border-blue-500"
          >
            {Array.from({ length: currentVersion }, (_, i) => i + 1).map((v) => (
              <option key={v} value={v}>
                v{v} {v === currentVersion ? '(Latest)' : ''}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default PageNavigator;
