import React, { useState } from 'react';
import { useTraffic } from '../context/TrafficContext';
import { AlertTriangle, Plus, ShieldAlert, CheckCircle2, Search, Filter } from 'lucide-react';
import { ReportIncidentModal } from '../components/modals/ReportIncidentModal';

export const Incidents = () => {
  const { incidents } = useTraffic();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');

  const filteredIncidents = incidents.filter(inc => {
    const matchesSearch = inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inc.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === 'All' || inc.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6 pb-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-wider text-slate-100 uppercase">
            Incident Management & Dispatch
          </h1>
          <p className="text-xs text-slate-400">
            Log, track, and dispatch traffic emergency response units across Sakoli
          </p>
        </div>

        <button
          onClick={() => setIsReportModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-900/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          Report New Incident
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="command-card p-4 rounded-2xl border border-[#1f293d] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search incident ID, type, location..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#080c14] border border-[#1e293b] text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 font-semibold">Severity:</span>
          {['All', 'Critical', 'High', 'Medium'].map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                severityFilter === sev
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-[#080c14] text-slate-400 hover:text-slate-200 border border-[#1e293b]'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Incidents Table */}
      <div className="command-card rounded-2xl p-5 border border-[#1f293d]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#080c14] text-slate-400 uppercase text-[10px] font-bold border-b border-[#1f293d]">
              <tr>
                <th className="p-3">Incident ID</th>
                <th className="p-3">Type</th>
                <th className="p-3">Location</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Reported Time</th>
                <th className="p-3">Assigned Team</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {filteredIncidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-[#111827] transition-colors">
                  <td className="p-3 font-bold text-rose-400 font-mono">{inc.id}</td>
                  <td className="p-3 font-semibold text-slate-200">{inc.type}</td>
                  <td className="p-3 text-slate-300">{inc.location}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      inc.severity === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      inc.severity === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {inc.severity}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 font-mono">{inc.reportedTime}</td>
                  <td className="p-3 font-semibold text-emerald-400">{inc.assignedTeam}</td>
                  <td className="p-3 text-right font-bold text-slate-200">{inc.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Incident Modal */}
      {isReportModalOpen && (
        <ReportIncidentModal onClose={() => setIsReportModalOpen(false)} />
      )}
    </div>
  );
};
