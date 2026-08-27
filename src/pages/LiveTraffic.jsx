import React, { useState } from 'react';
import { useTraffic } from '../context/TrafficContext';
import { TrafficMap } from '../components/map/TrafficMap';
import { Activity, Gauge, Car, Filter, RefreshCw, Layers } from 'lucide-react';

export const LiveTraffic = () => {
  const { junctions, kpis, selectJunction } = useTraffic();
  const [filter, setFilter] = useState('All');

  const filteredJunctions = junctions.filter(j => {
    if (filter === 'All') return true;
    if (filter === 'Low') return j.density <= 30;
    if (filter === 'Moderate') return j.density > 30 && j.density <= 60;
    if (filter === 'High') return j.density > 60 && j.density <= 80;
    if (filter === 'Critical') return j.density > 80;
    return true;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-wider text-slate-100 uppercase">
            Live Traffic Monitoring
          </h1>
          <p className="text-xs text-slate-400">
            Real-time vehicle flow rates and junction speed telemetry across Sakoli
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Telemetry Stream Active
          </span>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="command-card p-4 rounded-xl border border-[#1f293d]">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Active Vehicles</span>
          <div className="text-xl font-extrabold text-blue-400 font-mono mt-1">12,458</div>
          <span className="text-[10px] text-emerald-400">+3.4% from peak hour</span>
        </div>

        <div className="command-card p-4 rounded-xl border border-[#1f293d]">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Average Corridor Speed</span>
          <div className="text-xl font-extrabold text-emerald-400 font-mono mt-1">28 km/h</div>
          <span className="text-[10px] text-slate-400">Target: 32 km/h</span>
        </div>

        <div className="command-card p-4 rounded-xl border border-[#1f293d]">
          <span className="text-[10px] font-bold text-slate-400 uppercase">City Density Index</span>
          <div className="text-xl font-extrabold text-amber-400 font-mono mt-1">72%</div>
          <span className="text-[10px] text-amber-400">Moderate Load</span>
        </div>

        <div className="command-card p-4 rounded-xl border border-[#1f293d]">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active Monitored Nodes</span>
          <div className="text-xl font-extrabold text-purple-400 font-mono mt-1">05 Junctions</div>
          <span className="text-[10px] text-emerald-400">100% Signal Coverage</span>
        </div>
      </div>

      {/* Visual Live Road Map */}
      <div>
        <div className="text-xs font-bold text-slate-300 uppercase mb-2 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          Interactive Sakoli Road Network Feed
        </div>
        <TrafficMap />
      </div>

      {/* Filter Tabs & Vehicle Flow Table */}
      <div className="command-card rounded-2xl p-5 border border-[#1f293d]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1f293d] mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Junction Flow Breakdown
            </h3>
          </div>

          {/* Density Filters */}
          <div className="flex items-center gap-1.5 bg-[#080c14] p-1 rounded-xl border border-[#1e293b] text-xs">
            {['All', 'Low', 'Moderate', 'High', 'Critical'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filter === f
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Live Junction Telemetry Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#080c14] text-slate-400 uppercase text-[10px] font-bold border-b border-[#1f293d]">
              <tr>
                <th className="p-3">Junction Code</th>
                <th className="p-3">Location Name</th>
                <th className="p-3">Vehicles / min</th>
                <th className="p-3">Average Speed</th>
                <th className="p-3">Density %</th>
                <th className="p-3">Current Phase</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {filteredJunctions.map((j) => (
                <tr
                  key={j.id}
                  onClick={() => selectJunction(j.id)}
                  className="hover:bg-[#111827] cursor-pointer transition-colors"
                >
                  <td className="p-3 font-bold text-blue-400 font-mono">{j.code}</td>
                  <td className="p-3 font-semibold text-slate-200">{j.name}</td>
                  <td className="p-3 font-mono text-slate-300">{j.vehiclesPerMin} v/m</td>
                  <td className="p-3 font-mono text-slate-300">{j.avgSpeed}</td>
                  <td className="p-3 font-mono font-bold text-slate-100">{j.density}%</td>
                  <td className="p-3 text-slate-400">{j.phaseName}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      j.density > 80 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      j.density > 60 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {j.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
