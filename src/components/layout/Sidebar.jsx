import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  Cpu, 
  Video, 
  BarChart3, 
  AlertTriangle, 
  Car, 
  FileText, 
  Settings, 
  ShieldAlert,
  Radio,
  Zap
} from 'lucide-react';
import { useTraffic } from '../../context/TrafficContext';

export const Sidebar = () => {
  const { isEmergencyActive, simulateEmergency, resolveEmergency } = useTraffic();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Live Traffic', path: '/live-traffic', icon: Activity },
    { name: 'AI Signal Control', path: '/signal-control', icon: Cpu },
    { name: 'CCTV Monitor', path: '/cctv', icon: Video },
    { name: 'Traffic Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Incidents', path: '/incidents', icon: AlertTriangle },
    { name: 'Vehicles', path: '/vehicles', icon: Car },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#080c14] border-r border-[#1a2436] flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#1a2436] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-900/30 border border-blue-400/30">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-extrabold text-sm tracking-wider text-slate-100 uppercase">
            AI SMART TRAFFIC
          </h1>
          <p className="text-[10px] font-semibold tracking-widest text-blue-400 uppercase">
            CONTROL SYSTEM
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
          Operations Hub
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#111827]'
                }`
              }
            >
              <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Emergency Trigger Button Section */}
      <div className="p-3 border-t border-[#1a2436] bg-[#0c101c]">
        {isEmergencyActive ? (
          <button
            onClick={resolveEmergency}
            className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-all duration-200 animate-bounce"
          >
            <ShieldAlert className="w-4 h-4" />
            RESOLVE EMERGENCY
          </button>
        ) : (
          <button
            onClick={simulateEmergency}
            className="w-full py-2.5 px-3 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-950/60 border border-rose-500/50 transition-all duration-200 group"
          >
            <ShieldAlert className="w-4 h-4 text-rose-200 group-hover:animate-ping" />
            🚨 SIMULATE EMERGENCY
          </button>
        )}
      </div>

      {/* AI Engine Status Card */}
      <div className="p-3 m-3 rounded-xl bg-[#0f172a] border border-[#1e293b] text-xs">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-bold text-slate-300 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            AI Engine
          </span>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Online
          </span>
        </div>
        <div className="text-[11px] text-slate-400">
          Mode: <span className="text-slate-200 font-medium">Adaptive AI</span>
        </div>
        <div className="text-[10px] text-slate-500 mt-1 font-mono">
          Model: DeepTraffic v2.1
        </div>
      </div>
    </aside>
  );
};
