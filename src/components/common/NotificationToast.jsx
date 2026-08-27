import React from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { CheckCircle2, AlertTriangle, ShieldAlert, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const NotificationToast = () => {
  const { toasts, removeToast } = useTraffic();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          let bgClass = 'bg-slate-900 border-slate-700 text-slate-200';
          let Icon = Info;
          let iconColor = 'text-blue-400';

          if (toast.type === 'success') {
            bgClass = 'bg-[#062c1e] border-emerald-500/50 text-emerald-100 shadow-glow-emerald';
            Icon = CheckCircle2;
            iconColor = 'text-emerald-400';
          } else if (toast.type === 'warning') {
            bgClass = 'bg-[#332005] border-amber-500/50 text-amber-100 shadow-glow-amber';
            Icon = AlertTriangle;
            iconColor = 'text-amber-400';
          } else if (toast.type === 'emergency') {
            bgClass = 'bg-[#3b0d0d] border-rose-500 text-rose-100 shadow-glow-rose emergency-bg-flash';
            Icon = ShieldAlert;
            iconColor = 'text-rose-400';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className={`p-3.5 rounded-xl border shadow-xl flex items-start gap-3 pointer-events-auto backdrop-blur-md ${bgClass}`}
            >
              <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColor}`} />
              <div className="flex-1 text-xs font-medium leading-relaxed">
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-0.5 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
