import React, { useState } from 'react';
import { useTraffic } from '../context/TrafficContext';
import { Settings as SettingsIcon, Sliders, Bell, User, Monitor, Save, CheckCircle2 } from 'lucide-react';

export const Settings = () => {
  const { addToast } = useTraffic();

  const [adaptiveAiMode, setAdaptiveAiMode] = useState(true);
  const [autoRerouteEmergency, setAutoRerouteEmergency] = useState(true);
  const [defaultGreenTime, setDefaultGreenTime] = useState(35);
  const [alertThreshold, setAlertThreshold] = useState(80);
  const [officerName, setOfficerName] = useState('Officer V. Sharma');
  const [badgeId, setBadgeId] = useState('Sakoli-TOC-904');
  const [highContrastMode, setHighContrastMode] = useState(true);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    addToast('System preferences saved successfully to local command center configuration.', 'success');
  };

  return (
    <div className="space-y-6 pb-8 select-none">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-wider text-slate-100 uppercase">
            Command Center Settings
          </h1>
          <p className="text-xs text-slate-400">
            Configure AI thresholds, default signal parameters, and officer credentials
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Section 1: System Settings */}
        <div className="command-card p-5 rounded-2xl border border-[#1f293d]">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1f293d] mb-4">
            <Sliders className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              AI Engine & System Settings
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#080c14] border border-[#1e293b]">
              <div>
                <span className="font-bold text-slate-200 block">Adaptive AI Auto-Optimization</span>
                <span className="text-[11px] text-slate-400">Allow DeepTraffic v2.1 to continuously recalculate junction green times.</span>
              </div>
              <input
                type="checkbox"
                checked={adaptiveAiMode}
                onChange={(e) => setAdaptiveAiMode(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#080c14] border border-[#1e293b]">
              <div>
                <span className="font-bold text-slate-200 block">Automatic Emergency Rerouting</span>
                <span className="text-[11px] text-slate-400">Automatically establish green corridor when an emergency is triggered.</span>
              </div>
              <input
                type="checkbox"
                checked={autoRerouteEmergency}
                onChange={(e) => setAutoRerouteEmergency(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Default Signal Settings */}
        <div className="command-card p-5 rounded-2xl border border-[#1f293d]">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1f293d] mb-4">
            <SettingsIcon className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Default Signal Parameters
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 uppercase mb-1">
                Default Green Signal Time ({defaultGreenTime}s)
              </label>
              <input
                type="range"
                min="15"
                max="60"
                value={defaultGreenTime}
                onChange={(e) => setDefaultGreenTime(e.target.value)}
                className="w-full accent-emerald-500 bg-[#080c14] h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase mb-1">
                High Density Alert Threshold ({alertThreshold}%)
              </label>
              <input
                type="range"
                min="50"
                max="95"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                className="w-full accent-rose-500 bg-[#080c14] h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Officer Profile */}
        <div className="command-card p-5 rounded-2xl border border-[#1f293d]">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1f293d] mb-4">
            <User className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Officer Profile & Credentials
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 uppercase mb-1">Officer Name</label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#080c14] border border-[#1e293b] text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase mb-1">Badge ID</label>
              <input
                type="text"
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#080c14] border border-[#1e293b] text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-900/30 transition-all"
          >
            <Save className="w-4 h-4" /> Save System Settings
          </button>
        </div>
      </form>
    </div>
  );
};
