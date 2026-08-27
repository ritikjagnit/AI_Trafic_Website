import React, { useState } from 'react';
import { 
  Building2, 
  CloudSun, 
  Clock, 
  Bell, 
  UserCheck, 
  ChevronDown, 
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useTraffic } from '../../context/TrafficContext';

export const Topbar = () => {
  const { currentTime, isEmergencyActive, toasts, incidents } = useTraffic();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Formatted date and live time
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <header className="h-16 bg-[#0d1322] border-b border-[#1a2436] px-6 flex items-center justify-between sticky top-0 z-20 shadow-md">
      {/* Left Info Group */}
      <div className="flex items-center gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            <h2 className="text-xs font-bold tracking-wider text-slate-200 uppercase">
              Municipal Traffic Management Authority
            </h2>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-0.5 font-medium">
            <span>City: <strong className="text-slate-200">Sakoli</strong></span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              28°C Sunny
            </span>
          </div>
        </div>

        {/* Live Clock Display */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#080c14] border border-[#1e293b]">
          <Clock className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <div className="font-mono text-xs font-semibold text-slate-200">
            <span>{formattedDate}</span>
            <span className="text-blue-400 mx-1.5">|</span>
            <span className="text-emerald-400">{formattedTime}</span>
          </div>
        </div>
      </div>

      {/* Emergency Global Alert Header Pill */}
      {isEmergencyActive && (
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-400 font-bold text-xs animate-pulse">
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          <span>CRITICAL TRAFFIC INCIDENT ACTIVE IN SAKOLI</span>
        </div>
      )}

      {/* Right Controls Group */}
      <div className="flex items-center gap-4">
        {/* Notification Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-lg bg-[#080c14] border border-[#1e293b] text-slate-300 hover:text-white hover:border-slate-700 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center border border-[#0d1322]">
              {incidents.length}
            </span>
          </button>

          {/* Notifications Modal / Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#111827] border border-[#1f293d] shadow-2xl z-50 p-3 overflow-hidden animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-[#1f293d] mb-2">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-blue-400" />
                  System Notifications
                </span>
                <span className="text-[10px] text-slate-400">{incidents.length} active</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-xs">
                {isEmergencyActive && (
                  <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300">
                    <div className="font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      Emergency Reroute Active
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Main Road (Junction 4) closed for rapid response.
                    </div>
                  </div>
                )}
                {incidents.slice(0, 4).map(inc => (
                  <div key={inc.id} className="p-2 rounded-lg bg-[#080c14] border border-[#1e293b]">
                    <div className="flex items-center justify-between text-slate-200 font-semibold">
                      <span>{inc.id}: {inc.type}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                        inc.severity === 'Critical' ? 'bg-rose-500/20 text-rose-400' :
                        inc.severity === 'High' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {inc.severity}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{inc.location} • {inc.reportedTime}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Traffic Officer Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#080c14] border border-[#1e293b] hover:border-slate-700 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 font-bold text-xs">
              <UserCheck className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-slate-200 leading-none">
                Officer V. Sharma
              </div>
              <div className="text-[10px] text-emerald-400 font-medium leading-tight mt-0.5">
                Role: Admin
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#111827] border border-[#1f293d] shadow-2xl z-50 p-2 text-xs">
              <div className="px-3 py-2 border-b border-[#1f293d] mb-1">
                <p className="font-bold text-slate-200">Officer V. Sharma</p>
                <p className="text-[10px] text-slate-400">Badge ID: Sakoli-TOC-904</p>
              </div>
              <a href="#/settings" className="block px-3 py-1.5 rounded hover:bg-[#1a2436] text-slate-300">
                Officer Settings
              </a>
              <a href="#/reports" className="block px-3 py-1.5 rounded hover:bg-[#1a2436] text-slate-300">
                Shift Log
              </a>
              <div className="border-t border-[#1f293d] mt-1 pt-1">
                <span className="block px-3 py-1.5 text-emerald-400 text-[11px] font-semibold">
                  ● Operational Duty Active
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
