import React, { useState } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { X, AlertTriangle, Send } from 'lucide-react';

export const ReportIncidentModal = ({ onClose }) => {
  const { reportIncident } = useTraffic();

  const [type, setType] = useState('Accident');
  const [location, setLocation] = useState('Main Road (Junction 4)');
  const [severity, setSeverity] = useState('High');
  const [assignedTeam, setAssignedTeam] = useState('Unit TR-04');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    reportIncident({
      type,
      location,
      severity,
      assignedTeam,
      description
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="command-card w-full max-w-lg rounded-2xl border border-[#1f293d] p-6 shadow-2xl animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1f293d] mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              + Report New Traffic Incident
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1f293d]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 uppercase mb-1">
                Incident Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#080c14] border border-[#1e293b] text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="Accident">Accident Collision</option>
                <option value="Traffic Congestion">Severe Traffic Congestion</option>
                <option value="Signal Failure">Signal Light Hardware Failure</option>
                <option value="Road Construction">Road Construction Obstruction</option>
                <option value="Vehicle Breakdown">Vehicle Breakdown Blockage</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase mb-1">
                Severity Level
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#080c14] border border-[#1e293b] text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
                <option value="Critical">Critical Emergency</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 uppercase mb-1">
                Junction / Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#080c14] border border-[#1e293b] text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="Main Road (Junction 4)">Main Road (Junction 4)</option>
                <option value="Market Road (Junction 7)">Market Road (Junction 7)</option>
                <option value="Station Road (Junction 2)">Station Road (Junction 2)</option>
                <option value="College Road (Junction 1)">College Road (Junction 1)</option>
                <option value="Bypass Road (Junction 9)">Bypass Road (Junction 9)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase mb-1">
                Assigned Dispatch Team
              </label>
              <select
                value={assignedTeam}
                onChange={(e) => setAssignedTeam(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#080c14] border border-[#1e293b] text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="Unit TR-01">Unit TR-01 (Patrol)</option>
                <option value="Unit TR-02">Unit TR-02 (Patrol)</option>
                <option value="Unit TR-04">Unit TR-04 (Accident Response)</option>
                <option value="Unit TR-07">Unit TR-07 (Emergency Dispatch)</option>
                <option value="Tech Crew A">Tech Crew A (Signals)</option>
                <option value="Tech Crew B">Tech Crew B (Hardware)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 uppercase mb-1">
              Incident Description & Notes
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter specific details reported by field officer or CCTV monitoring..."
              className="w-full p-2.5 rounded-xl bg-[#080c14] border border-[#1e293b] text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
              required
            ></textarea>
          </div>

          <div className="pt-3 border-t border-[#1f293d] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#080c14] text-slate-300 font-semibold hover:bg-[#1a2436]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-blue-900/30"
            >
              <Send className="w-4 h-4" />
              Dispatch Incident Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
