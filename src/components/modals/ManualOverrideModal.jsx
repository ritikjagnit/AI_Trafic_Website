import React, { useState } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { X, Sliders, Save, RotateCcw } from 'lucide-react';

export const ManualOverrideModal = ({ junction, onClose }) => {
  const { manualOverride } = useTraffic();
  const [greenTime, setGreenTime] = useState(junction.greenTime);
  const [yellowTime, setYellowTime] = useState(junction.yellowTime);
  const [redTime, setRedTime] = useState(junction.redTime);

  const handleSave = (e) => {
    e.preventDefault();
    manualOverride(junction.id, greenTime, yellowTime, redTime);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="command-card w-full max-w-md rounded-2xl border border-[#1f293d] p-6 shadow-2xl animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1f293d] mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Manual Signal Override
              </h3>
              <p className="text-xs text-slate-400">{junction.code} — {junction.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1f293d]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Green Signal Duration (seconds)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="10"
                max="90"
                value={greenTime}
                onChange={(e) => setGreenTime(e.target.value)}
                className="flex-1 accent-emerald-500 bg-[#080c14] h-2 rounded-lg cursor-pointer"
              />
              <span className="w-12 text-center font-mono font-bold text-emerald-400 bg-[#080c14] px-2 py-1 rounded border border-[#1e293b] text-sm">
                {greenTime}s
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Yellow Caution Duration (seconds)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="3"
                max="10"
                value={yellowTime}
                onChange={(e) => setYellowTime(e.target.value)}
                className="flex-1 accent-amber-500 bg-[#080c14] h-2 rounded-lg cursor-pointer"
              />
              <span className="w-12 text-center font-mono font-bold text-amber-400 bg-[#080c14] px-2 py-1 rounded border border-[#1e293b] text-sm">
                {yellowTime}s
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Red Clearance Duration (seconds)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="10"
                max="90"
                value={redTime}
                onChange={(e) => setRedTime(e.target.value)}
                className="flex-1 accent-rose-500 bg-[#080c14] h-2 rounded-lg cursor-pointer"
              />
              <span className="w-12 text-center font-mono font-bold text-rose-400 bg-[#080c14] px-2 py-1 rounded border border-[#1e293b] text-sm">
                {redTime}s
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1f293d] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#080c14] text-slate-300 text-xs font-semibold hover:bg-[#1a2436]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-900/30"
            >
              <Save className="w-4 h-4" />
              Save Signal Timings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
