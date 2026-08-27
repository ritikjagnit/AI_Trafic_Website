import React, { useState } from 'react';
import { useTraffic } from '../context/TrafficContext';
import { Cpu, Zap, Sliders, CheckCircle2, RefreshCw, Eye } from 'lucide-react';
import { ManualOverrideModal } from '../components/modals/ManualOverrideModal';

export const SignalControl = () => {
  const { junctions, applyRecommendation, optimizeAllSignals, selectJunction } = useTraffic();
  const [selectedForOverride, setSelectedForOverride] = useState(null);

  return (
    <div className="space-y-6 pb-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-wider text-slate-100 uppercase">
            AI Signal Adaptive Control
          </h1>
          <p className="text-xs text-slate-400">
            DeepTraffic v2.1 automated signal duration optimization & override management
          </p>
        </div>

        <button
          onClick={optimizeAllSignals}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-900/30 transition-all"
        >
          <Zap className="w-4 h-4 text-yellow-300" />
          Optimize All Signals Across City
        </button>
      </div>

      {/* Junction Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {junctions.map((j) => (
          <div key={j.id} className="command-card p-5 rounded-2xl border border-[#1f293d] flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1f293d] mb-3">
                <div>
                  <span className="text-xs font-bold text-blue-400 font-mono">{j.code}</span>
                  <h3 className="text-base font-bold text-slate-100">{j.name}</h3>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                  j.density > 80 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                  j.density > 60 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {j.density}% Density
                </span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="p-2 rounded-lg bg-[#080c14] border border-[#1e293b]">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Green Signal</span>
                  <div className="text-base font-extrabold text-emerald-400 font-mono mt-0.5">{j.greenTime}s</div>
                </div>
                <div className="p-2 rounded-lg bg-[#080c14] border border-[#1e293b]">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Active Phase</span>
                  <div className="text-sm font-bold text-slate-200 truncate mt-0.5">{j.currentPhase}</div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 mb-4 text-xs">
                <span className="font-bold text-blue-400 block mb-1">AI Recommendation:</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">"{j.recommendation}"</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-[#1f293d]">
              <button
                onClick={() => applyRecommendation(j.id)}
                className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Optimize
              </button>
              <button
                onClick={() => setSelectedForOverride(j)}
                className="py-2 px-3 rounded-xl bg-[#080c14] hover:bg-[#111827] text-amber-400 font-semibold text-xs border border-[#1e293b]"
                title="Manual Control"
              >
                <Sliders className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Override Modal */}
      {selectedForOverride && (
        <ManualOverrideModal
          junction={selectedForOverride}
          onClose={() => setSelectedForOverride(null)}
        />
      )}
    </div>
  );
};
