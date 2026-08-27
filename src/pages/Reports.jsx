import React, { useState } from 'react';
import { availableReports } from '../data/mockData';
import { FileText, Download, Eye, Calendar, HardDrive, CheckCircle2, X } from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';

export const Reports = () => {
  const { addToast } = useTraffic();
  const [activeReportModal, setActiveReportModal] = useState(null);

  const handleExportPDF = (report) => {
    // Generate text/file blob and initiate actual file download!
    const fileContent = `========================================================================
MUNICIPAL TRAFFIC MANAGEMENT AUTHORITY - SAKOLI OPERATIONS CONTROL
OFFICIAL TRAFFIC REPORT
========================================================================
Report Title: ${report.title}
Report ID: ${report.id}
Date Generated: ${report.date}
Category: ${report.category}
Authority: Sakoli Municipal Traffic Control Center

SUMMARY:
${report.summary}

KEY PERFORMANCE INDICATORS:
- Average Traffic Flow Efficiency: 72%
- Total Monitored Vehicles: 12,458
- Fuel Saved Today: 128 Liters
- Carbon Emissions Reduced: 320 kg CO2
- Monitored Signal Corridors: 24 Corridors (DeepTraffic v2.1 Adaptive AI)

AUDIT SIGN-OFF:
Traffic Operations Officer: V. Sharma (Admin Badge #Sakoli-TOC-904)
========================================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.id}_${report.category.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast(`Exported ${report.title} successfully as official traffic report file.`, 'success');
  };

  return (
    <div className="space-y-6 pb-8 select-none">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-wider text-slate-100 uppercase">
            Official Traffic Audit & Executive Reports
          </h1>
          <p className="text-xs text-slate-400">
            Export official government traffic performance documents & environmental impact metrics
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {availableReports.map((report) => (
          <div key={report.id} className="command-card p-5 rounded-2xl border border-[#1f293d] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#1f293d] mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-bold text-blue-400 font-mono">{report.category}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {report.date}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-100 mb-2">{report.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{report.summary}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1f293d]">
              <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5" /> {report.size}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveReportModal(report)}
                  className="px-3 py-1.5 rounded-xl bg-[#080c14] hover:bg-[#111827] text-slate-300 text-xs font-semibold border border-[#1e293b] flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> View Report
                </button>
                <button
                  onClick={() => handleExportPDF(report)}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" /> Export PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {activeReportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="command-card w-full max-w-2xl rounded-2xl border border-[#1f293d] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#1f293d] mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-base font-bold text-slate-100">{activeReportModal.title}</h3>
                  <p className="text-xs text-slate-400">{activeReportModal.category} • Date: {activeReportModal.date}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveReportModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1f293d]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#080c14] p-4 rounded-xl border border-[#1e293b] font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto mb-4">
              {`MUNICIPAL TRAFFIC MANAGEMENT AUTHORITY - SAKOLI
REPORT DOCUMENT: ${activeReportModal.id}

SUBJECT: ${activeReportModal.title}
DATE: ${activeReportModal.date}

EXECUTIVE SUMMARY:
${activeReportModal.summary}

DETAILED TELEMETRY LOG:
1. Signal Timing Efficiency: DeepTraffic v2.1 optimized signal green duration by 15-20% during peak rush hours.
2. Fuel Savings: Estimated 128 L fuel saved per 10,000 vehicles processed through green wave corridors.
3. CO2 Emissions: 320 kg reduction in idle tailpipe emissions at Junction 4, Junction 7, and Junction 2.
4. Emergency Dispatch Response: Response time reduced from 8.5 minutes to 4.2 minutes using adaptive green corridor prioritization.

STATUS: APPROVED & SIGNED BY COMMAND CENTER`}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => handleExportPDF(activeReportModal)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Official File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
