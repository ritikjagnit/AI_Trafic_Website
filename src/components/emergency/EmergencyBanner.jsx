import React from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { ShieldAlert, Radio, Clock, MapPin, Navigation, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmergencyBanner = () => {
  const { isEmergencyActive, emergencyData, resolveEmergency } = useTraffic();

  if (!isEmergencyActive || !emergencyData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6 p-4 rounded-2xl border bg-rose-950/30 border-rose-500/60 shadow-glow-rose emergency-bg-flash select-none"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Title & Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-lg animate-bounce">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                🚨 EMERGENCY RESPONSE ACTIVE
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white uppercase">
                CRITICAL DISPATCH
              </span>
            </div>
            <p className="text-xs text-rose-200 mt-0.5">
              Major accident detected at Main Road. Emergency green wave priority engaged.
            </p>
          </div>
        </div>

        {/* Center Details Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs w-full md:w-auto">
          <div className="p-2 rounded-lg bg-[#0d1322] border border-rose-500/30">
            <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
              <Radio className="w-3 h-3 text-rose-400" />
              Response Team
            </span>
            <span className="font-bold text-slate-100">{emergencyData.responseTeam.split(' ')[0]} {emergencyData.responseTeam.split(' ')[1]}</span>
          </div>

          <div className="p-2 rounded-lg bg-[#0d1322] border border-rose-500/30">
            <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              ETA Countdown
            </span>
            <span className="font-bold text-amber-400 font-mono">{emergencyData.eta}</span>
          </div>

          <div className="p-2 rounded-lg bg-[#0d1322] border border-rose-500/30 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-400" />
              Affected Zone
            </span>
            <span className="font-bold text-rose-400">Junction 4 (Main Rd)</span>
          </div>
        </div>

        {/* Right Action Button */}
        <button
          onClick={resolveEmergency}
          className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-all duration-150"
        >
          <CheckCircle2 className="w-4 h-4" />
          Resolve Emergency
        </button>
      </div>

      {/* AI Recommendation Reroute Text Line */}
      <div className="mt-3 pt-2 border-t border-rose-500/30 flex items-center gap-2 text-xs text-rose-200">
        <Navigation className="w-4 h-4 text-blue-400 flex-shrink-0" />
        <span><strong>AI Reroute Recommendation:</strong> {emergencyData.aiRecommendation}</span>
      </div>
    </motion.div>
  );
};
