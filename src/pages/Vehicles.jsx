import React, { useState } from 'react';
import { vehicleCategoryStats, sampleVehicleList } from '../data/mockData';
import { Car, Bike, Bus, Truck, Search, Filter, ShieldCheck } from 'lucide-react';

export const Vehicles = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredVehicles = sampleVehicleList.filter(v => {
    const matchesSearch = v.id.toLowerCase().includes(search.toLowerCase()) ||
                          v.plate.toLowerCase().includes(search.toLowerCase()) ||
                          v.junction.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || v.type === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-8 select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-wider text-slate-100 uppercase">
            Vehicle Fleet Telemetry & ANPR
          </h1>
          <p className="text-xs text-slate-400">
            Automatic Number Plate Recognition & vehicle category analytics for Sakoli
          </p>
        </div>
        <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          ANPR Stream 100% Operational
        </div>
      </div>

      {/* Fleet Breakdown KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="command-card p-4 rounded-xl border border-[#1f293d]">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Active</span>
          <div className="text-xl font-extrabold text-slate-100 font-mono mt-1">
            {vehicleCategoryStats.total.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400">Live Traffic Count</span>
        </div>

        <div className="command-card p-4 rounded-xl border border-[#1f293d]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Cars</span>
            <Car className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-extrabold text-blue-400 font-mono mt-1">
            {vehicleCategoryStats.cars.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400">62.9% fleet share</span>
        </div>

        <div className="command-card p-4 rounded-xl border border-[#1f293d]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Bikes</span>
            <Bike className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-extrabold text-emerald-400 font-mono mt-1">
            {vehicleCategoryStats.bikes.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400">31.4% fleet share</span>
        </div>

        <div className="command-card p-4 rounded-xl border border-[#1f293d]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Buses</span>
            <Bus className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-extrabold text-amber-400 font-mono mt-1">
            {vehicleCategoryStats.buses.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400">3.3% public transport</span>
        </div>

        <div className="command-card p-4 rounded-xl border border-[#1f293d] col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Trucks</span>
            <Truck className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl font-extrabold text-rose-400 font-mono mt-1">
            {vehicleCategoryStats.trucks.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400">2.4% heavy freight</span>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="command-card p-4 rounded-2xl border border-[#1f293d] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search license plate, vehicle ID, junction..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#080c14] border border-[#1e293b] text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 font-semibold">Category:</span>
          {['All', 'Car', 'Bike', 'Bus', 'Truck'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                category === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#080c14] text-slate-400 hover:text-slate-200 border border-[#1e293b]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="command-card rounded-2xl p-5 border border-[#1f293d]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#080c14] text-slate-400 uppercase text-[10px] font-bold border-b border-[#1f293d]">
              <tr>
                <th className="p-3">Flow ID</th>
                <th className="p-3">License Plate</th>
                <th className="p-3">Type</th>
                <th className="p-3">Telemetry Speed</th>
                <th className="p-3">Detected Junction</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {filteredVehicles.map((v) => (
                <tr key={v.id} className="hover:bg-[#111827] transition-colors">
                  <td className="p-3 font-bold text-blue-400 font-mono">{v.id}</td>
                  <td className="p-3 font-mono font-bold text-slate-100">{v.plate}</td>
                  <td className="p-3 text-slate-300 font-semibold">{v.type}</td>
                  <td className="p-3 font-mono text-emerald-400">{v.speed}</td>
                  <td className="p-3 text-slate-300">{v.junction}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      v.status === 'Rerouted' ? 'bg-purple-500/20 text-purple-400' :
                      v.status === 'Congested' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono text-slate-400">{v.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
