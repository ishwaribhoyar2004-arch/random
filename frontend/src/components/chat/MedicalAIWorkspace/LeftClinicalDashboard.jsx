import React from 'react';
import { Activity, ShieldCheck, AlertTriangle, Heart, Droplet, User, Flame, TrendingUp } from 'lucide-react';

export default function LeftClinicalDashboard({ report, analysisData, organScores }) {
  const healthScore = analysisData?.overall_health_score || 90;
  const overallRisk = analysisData?.overall_risk || 'LOW';
  const conditions = analysisData?.conditions || analysisData?.detected_conditions || [];

  const scores = organScores || {
    Heart: 92,
    Kidney: 78,
    Liver: 94,
    Blood: 83
  };

  const getOrganColor = (score) => {
    if (score >= 90) return { text: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', dot: '🟢' };
    if (score >= 75) return { text: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', dot: '🟡' };
    return { text: 'text-rose-600', bg: 'bg-rose-50 border-rose-200', dot: '🔴' };
  };

  return (
    <div className="flex flex-col gap-4 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-2xs text-slate-800">
      {/* Patient Profile Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">{report?.original_filename || 'Patient Report'}</h3>
          <p className="text-[11px] text-slate-500 font-medium">Verified Lab Analysis · Active</p>
        </div>
      </div>

      {/* Overall Health Score Card */}
      <div className="bg-slate-900 text-white p-4 rounded-xl shadow-xs flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Overall Health Score</div>
          <div className="text-2xl font-black text-white mt-0.5">{healthScore}<span className="text-sm font-normal text-slate-400">/100</span></div>
          <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full ${
            overallRisk === 'LOW' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}>
            {overallRisk} RISK CATEGORY
          </span>
        </div>
        <div className="w-12 h-12 rounded-full border-4 border-emerald-400 flex items-center justify-center font-bold text-sm bg-slate-800 text-emerald-400">
          {healthScore}%
        </div>
      </div>

      {/* Radial Organ Progress Cards */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-indigo-500" />
          Organ System Health
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(scores).map(([organ, score]) => {
            const cfg = getOrganColor(score);
            return (
              <div key={organ} className={`p-2.5 rounded-xl border ${cfg.bg} flex flex-col justify-between`}>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-700">{organ}</span>
                  <span>{cfg.dot}</span>
                </div>
                <div className={`text-base font-black ${cfg.text} mt-1`}>{score}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detected Conditions */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Detected Conditions
        </h4>
        {conditions.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            {conditions.map((c, i) => (
              <div key={i} className="text-xs p-2 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 font-medium">
                {c.condition_name || str(c)}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-emerald-900 font-medium">
            Optimal Health (No pathological conditions)
          </div>
        )}
      </div>

      {/* Timeline Snapshot */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1 font-semibold">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
          Historical Trend
        </span>
        <span className="font-bold text-slate-700">3 Reports Logged</span>
      </div>
    </div>
  );
}
