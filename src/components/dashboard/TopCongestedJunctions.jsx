import React from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { AlertCircle, ChevronRight, Activity } from 'lucide-react';

export const TopCongestedJunctions = () => {
  const { junctions, selectedJunctionId, selectJunction } = useTraffic();

  // Sort junctions descending by density percentage
  const sortedJunctions = [...junctions].sort((a, b) => b.density - a.density);

  return (
    <div className="command-card p-5 rounded-2xl border border-[#1f293d] flex flex-col justify-between h-full select-none">
      <div className="flex items-center justify-between pb-3 border-b border-[#1f293d] mb-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-400" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Top Congested Junctions
          </h3>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Ranked by Load</span>
      </div>

      <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
        {sortedJunctions.map((j, index) => {
          const isSelected = j.id === selectedJunctionId;
          let barBg = 'bg-emerald-500';
          let textColor = 'text-emerald-400';

          if (j.density > 80) {
            barBg = 'bg-rose-500';
            textColor = 'text-rose-400';
          } else if (j.density > 60) {
            barBg = 'bg-amber-500';
            textColor = 'text-amber-400';
          } else if (j.density > 40) {
            barBg = 'bg-blue-500';
            textColor = 'text-blue-400';
          }

          return (
            <div
              key={j.id}
              onClick={() => selectJunction(j.id)}
              className={`p-3 rounded-xl border transition-all duration-150 cursor-pointer flex items-center justify-between group ${
                isSelected
                  ? 'bg-blue-600/15 border-blue-500/50 shadow-md'
                  : 'bg-[#080c14] border-[#1e293b] hover:bg-[#111827] hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                <span className="w-6 h-6 rounded-lg bg-[#0d1322] border border-[#1e293b] text-slate-400 font-mono text-xs font-bold flex items-center justify-center">
                  #{index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 truncate">
                      {j.code} — <span className="text-slate-400 font-normal">{j.name}</span>
                    </span>
                    <span className={`text-xs font-extrabold font-mono ${textColor}`}>
                      {j.density}%
                    </span>
                  </div>

                  {/* Congestion Load Bar */}
                  <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barBg}`}
                      style={{ width: `${j.density}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                isSelected ? 'text-blue-400' : 'text-slate-600'
              }`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
