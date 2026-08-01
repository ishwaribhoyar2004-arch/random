import React, { useState } from 'react';
import { Search, Copy, Download, RefreshCw, ChevronUp, ChevronDown, Check, FileText, Code, FileCode } from 'lucide-react';

export const OCRToolbar = ({
  searchTerm = '',
  onSearchChange,
  matchCount = 0,
  currentMatchIndex = 0,
  onNextMatch,
  onPrevMatch,
  onCopyText,
  onExport,
  onRetry,
  isProcessing = false
}) => {
  const [copied, setCopied] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState('PyMuPDF');

  const handleCopy = () => {
    onCopyText();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportClick = (format) => {
    onExport(format);
    setShowExportMenu(false);
  };

  const handleConfirmRetry = () => {
    onRetry(selectedEngine);
    setShowRetryModal(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-lg">
      {/* Search Input & Navigation */}
      <div className="flex items-center gap-2 flex-1 min-w-[240px]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search OCR text, headers, tables..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-20 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />

          {searchTerm && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-slate-400">
              {matchCount > 0 ? `${currentMatchIndex + 1}/${matchCount}` : 'No matches'}
            </span>
          )}
        </div>

        {matchCount > 0 && (
          <div className="flex items-center gap-1">
            <button
              onClick={onPrevMatch}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Previous Match"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNextMatch}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Next Match"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons: Copy, Export, Retry */}
      <div className="flex items-center gap-2">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
          title="Copy Extracted Text"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
          {copied ? 'Copied!' : 'Copy Text'}
        </button>

        {/* Export Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            Export
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-30 py-1 text-xs">
              <button
                onClick={() => handleExportClick('txt')}
                className="w-full px-3 py-2 text-left text-slate-200 hover:bg-slate-800 flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                Plain Text (.txt)
              </button>
              <button
                onClick={() => handleExportClick('json')}
                className="w-full px-3 py-2 text-left text-slate-200 hover:bg-slate-800 flex items-center gap-2"
              >
                <Code className="w-4 h-4 text-amber-400" />
                Unified JSON (.json)
              </button>
              <button
                onClick={() => handleExportClick('md')}
                className="w-full px-3 py-2 text-left text-slate-200 hover:bg-slate-800 flex items-center gap-2"
              >
                <FileCode className="w-4 h-4 text-emerald-400" />
                LLM Markdown (.md)
              </button>
            </div>
          )}
        </div>

        {/* Retry OCR Button */}
        <button
          onClick={() => setShowRetryModal(true)}
          disabled={isProcessing}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg shadow transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
          Retry OCR
        </button>
      </div>

      {/* Retry Modal */}
      {showRetryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-left">
            <h4 className="text-sm font-bold text-slate-100">Reprocess Report OCR</h4>
            <p className="text-xs text-slate-400">Select extraction engine for reprocessing:</p>

            <select
              value={selectedEngine}
              onChange={(e) => setSelectedEngine(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg p-2.5 font-mono focus:outline-none focus:border-blue-500"
            >
              <option value="PyMuPDF">PyMuPDF Engine (Digital PDF)</option>
              <option value="SarvamDoc">Sarvam Document Intelligence (Scanned PDF)</option>
              <option value="SarvamVision">Sarvam Vision OCR (Image)</option>
              <option value="Tesseract">Tesseract Local OCR (Fallback)</option>
              <option value="PlainText">PlainText Reader (.txt)</option>
            </select>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRetryModal(false)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRetry}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg"
              >
                Start Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRToolbar;
