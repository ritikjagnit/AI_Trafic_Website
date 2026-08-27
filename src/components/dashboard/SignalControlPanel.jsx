import React, { useState } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { Cpu, CheckCircle2, Sliders, Timer, Zap, AlertTriangle, ArrowRight } from 'lucide-react';
import { ManualOverrideModal } from '../modals/ManualOverrideModal';

export const SignalControlPanel = () => {
  const { selectedJunction, applyRecommendation, isEmergencyActive } = useTraffic();
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);

  if (!selectedJunction) return null;

  return (
    <div className="command-card rounded-2xl p-5 border border-[#1f293d] flex flex-col justify-between h-full select-none">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1f293d] mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              AI Signal Control
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            ● Live
          </span>
        </div>

        {/* Selected Junction Details */}
        <div className="p-3 rounded-xl bg-[#080c14] border border-[#1e293b] mb-4">
          <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            Optimizing Signal
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <div className="text-lg font-bold text-slate-100">
              {selectedJunction.code} — <span className="text-blue-400">{selectedJunction.name}</span>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              selectedJunction.density > 80 ? 'bg-rose-500/20 text-rose-400' :
              selectedJunction.density > 60 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {selectedJunction.density}% Density
            </span>
          </div>
        </div>

        {/* Phase & Countdown Block */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-xl bg-[#0d1322] border border-[#1a2436]">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Current Phase</div>
            <div className="text-base font-extrabold text-emerald-400 font-mono mt-1">
              Phase {selectedJunction.currentPhase}
            </div>
            <div className="text-[11px] text-slate-300 truncate mt-0.5">
              {selectedJunction.phaseName}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0d1322] border border-[#1a2436]">
            <div className="text-[10px] text-slate-400 font-semibold uppercase flex items-center justify-between">
              <span>Green Countdown</span>
              <Timer className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-extrabold text-blue-400 font-mono mt-0.5">
              {selectedJunction.countdown} <span className="text-xs font-normal text-slate-400">sec</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Green Duration: {selectedJunction.greenTime}s
            </div>
          </div>
        </div>

        {/* AI Recommendation Section */}
        <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 mb-1.5">
            <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
            AI Adaptive Recommendation
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            "{selectedJunction.recommendation}"
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2 border-t border-[#1f293d]">
        <button
          onClick={() => applyRecommendation(selectedJunction.id)}
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 transition-all duration-150"
        >
          <CheckCircle2 className="w-4 h-4" />
          Apply Recommendation
        </button>

        <button
          onClick={() => setIsOverrideModalOpen(true)}
          className="w-full py-2 px-4 rounded-xl bg-[#080c14] hover:bg-[#111827] text-slate-300 hover:text-white font-semibold text-xs border border-[#1e293b] flex items-center justify-center gap-2 transition-all duration-150"
        >
          <Sliders className="w-4 h-4 text-amber-400" />
          Manual Override
        </button>
      </div>

      {/* Manual Override Modal */}
      {isOverrideModalOpen && (
        <ManualOverrideModal
          junction={selectedJunction}
          onClose={() => setIsOverrideModalOpen(false)}
        />
      )}
    </div>
  );
};
