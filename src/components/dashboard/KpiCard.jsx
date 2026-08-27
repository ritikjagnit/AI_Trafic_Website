import React from 'react';
import { motion } from 'framer-motion';

export const KpiCard = ({ title, value, subtext, icon: Icon, color = 'blue', badgeColor = 'emerald' }) => {
  const colorStyles = {
    blue: 'border-blue-500/20 text-blue-400 bg-blue-500/10',
    emerald: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/10',
    amber: 'border-amber-500/20 text-amber-400 bg-amber-500/10',
    rose: 'border-rose-500/20 text-rose-400 bg-rose-500/10',
    purple: 'border-purple-500/20 text-purple-400 bg-purple-500/10',
    cyan: 'border-cyan-500/20 text-cyan-400 bg-cyan-500/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="command-card p-4 rounded-xl border command-card-hover flex flex-col justify-between"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2 rounded-lg border ${colorStyles[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-2xl font-extrabold text-slate-100 tracking-tight font-mono">
          {value}
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
          subtext.includes('Critical') || subtext.includes('Active')
            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            : subtext.includes('Moderate') || subtext.includes('High')
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
        }`}>
          {subtext}
        </span>
      </div>
    </motion.div>
  );
};
