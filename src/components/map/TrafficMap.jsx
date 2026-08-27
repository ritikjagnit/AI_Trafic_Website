import React, { useState } from 'react';
import { useTraffic } from '../../context/TrafficContext';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Radio, 
  AlertOctagon, 
  ShieldAlert, 
  Navigation,
  CheckCircle,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export const TrafficMap = () => {
  const { junctions, selectedJunctionId, selectJunction, isEmergencyActive, emergencyData } = useTraffic();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 1.8));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.7));
  const handleResetZoom = () => setZoomLevel(1);

  // Helper color function based on density percentage
  const getDensityColor = (density) => {
    if (density <= 30) return { bg: 'bg-emerald-500', hex: '#10b981', label: 'Low' };
    if (density <= 60) return { bg: 'bg-amber-500', hex: '#f59e0b', label: 'Moderate' };
    if (density <= 80) return { bg: 'bg-orange-500', hex: '#f97316', label: 'High' };
    return { bg: 'bg-rose-500', hex: '#ef4444', label: 'Very High' };
  };

  return (
    <div className={`relative command-card rounded-2xl overflow-hidden border border-[#1f293d] flex flex-col ${
      isFullscreen ? 'fixed inset-4 z-50 shadow-2xl bg-[#080c14]' : 'h-[460px]'
    }`}>
      {/* Map Control Bar Header */}
      <div className="p-3 bg-[#0d1322] border-b border-[#1a2436] flex items-center justify-between z-10 select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Real-time Live Feed
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium">
            <Zap className="w-3.5 h-3.5" />
            AI Mode: Adaptive
          </div>
        </div>

        {/* Zoom & Fullscreen Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg bg-[#111827] border border-[#1e293b] text-slate-300 hover:text-white hover:bg-[#1a2436]"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg bg-[#111827] border border-[#1e293b] text-slate-300 hover:text-white hover:bg-[#1a2436]"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg bg-[#111827] border border-[#1e293b] text-slate-300 hover:text-white hover:bg-[#1a2436]"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-[#111827] border border-[#1e293b] text-slate-300 hover:text-white hover:bg-[#1a2436]"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Map View Canvas */}
      <div className="relative flex-1 bg-[#090d16] overflow-hidden flex items-center justify-center">
        <div 
          className="transition-transform duration-300 ease-out origin-center w-full h-full"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg className="w-full h-full min-w-[700px] min-h-[380px]" viewBox="0 0 800 520">
            <defs>
              {/* Grid Background Pattern */}
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111827" strokeWidth="1" />
              </pattern>
              
              {/* Glow Filter for Selected Junction */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              
              {/* Emergency Pulsing Glow */}
              <filter id="emergencyGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Grid */}
            <rect width="800" height="520" fill="#070a12" />
            <rect width="800" height="520" fill="url(#grid)" />

            {/* City Blocks & Building Layout Visuals */}
            <rect x="50" y="40" width="130" height="190" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <text x="115" y="140" fill="#334155" fontSize="12" textAnchor="middle" fontWeight="bold">Residential Zone A</text>

            <rect x="250" y="40" width="120" height="190" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <text x="310" y="140" fill="#334155" fontSize="12" textAnchor="middle" fontWeight="bold">College Campus</text>

            <rect x="470" y="40" width="280" height="100" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <text x="610" y="95" fill="#334155" fontSize="12" textAnchor="middle" fontWeight="bold">Commercial Market District</text>

            <rect x="50" y="320" width="320" height="150" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <text x="210" y="400" fill="#334155" fontSize="12" textAnchor="middle" fontWeight="bold">Railway Station Logistics</text>

            <rect x="470" y="320" width="280" height="150" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <text x="610" y="400" fill="#334155" fontSize="12" textAnchor="middle" fontWeight="bold">Outer Highway Industrial Park</text>

            {/* ROADS LAYOUT */}

            {/* Major Horizontal Road (Main Road / Bypass) */}
            <rect x="0" y="250" width="800" height="60" fill="#1e293b" />
            {/* Lane Dividers */}
            <line x1="0" y1="280" x2="800" y2="280" stroke="#f59e0b" strokeWidth="2" strokeDasharray="12 8" className="road-dash" />
            <text x="70" y="240" fill="#64748b" fontSize="11" fontWeight="bold" letterSpacing="1">MAIN ROAD CORRIDOR</text>

            {/* Major Vertical Road (College Rd x Bypass Rd) */}
            <rect x="370" y="0" width="60" height="520" fill="#1e293b" />
            <line x1="400" y1="0" x2="400" y2="520" stroke="#94a3b8" strokeWidth="2" strokeDasharray="12 8" className="road-dash" />
            <text x="440" y="30" fill="#64748b" fontSize="11" fontWeight="bold" letterSpacing="1">STATION - COLLEGE AVENUE</text>

            {/* Secondary Connectors (Market Rd & Station Rd branches) */}
            <rect x="590" y="0" width="40" height="520" fill="#172033" />
            <rect x="190" y="0" width="40" height="520" fill="#172033" />

            {/* Emergency Reroute Overlay Vector Path */}
            {isEmergencyActive && (
              <g className="animate-pulse">
                {/* Highlight Main Road Incident Segment in Red */}
                <rect x="250" y="252" width="300" height="56" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2" />
                {/* Alternate Reroute Path (Divert south via Junction 9 Bypass) */}
                <path 
                  d="M 220 280 L 220 460 L 400 460" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="5" 
                  strokeDasharray="10 6" 
                  className="road-dash"
                />
                <text x="290" y="450" fill="#60a5fa" fontSize="12" fontWeight="extrabold">
                  AI EMERGENCY REROUTE CORRIDOR
                </text>
              </g>
            )}

            {/* PEDESTRIAN CROSSWALKS */}
            <g fill="#94a3b8" opacity="0.6">
              {/* Junction 4 Crosswalks */}
              <rect x="345" y="250" width="20" height="60" rx="1" />
              <rect x="435" y="250" width="20" height="60" rx="1" />
              <rect x="370" y="225" width="60" height="20" rx="1" />
              <rect x="370" y="315" width="60" height="20" rx="1" />
            </g>

            {/* ANIMATED VEHICLES TRAVERSING THE ROADS */}
            {/* Eastbound Vehicles */}
            <g>
              <motion.rect
                animate={{ x: [0, 800] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                y="262" width="18" height="10" rx="2" fill="#3b82f6"
              />
              <motion.rect
                animate={{ x: [0, 800] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear', delay: 4 }}
                y="262" width="28" height="12" rx="3" fill="#10b981" // Bus
              />
              <motion.rect
                animate={{ x: [0, 800] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 7 }}
                y="262" width="14" height="8" rx="2" fill="#f59e0b"
              />
            </g>

            {/* Westbound Vehicles */}
            <g>
              <motion.rect
                animate={{ x: [800, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear', delay: 1 }}
                y="288" width="18" height="10" rx="2" fill="#8b5cf6"
              />
              <motion.rect
                animate={{ x: [800, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 6 }}
                y="288" width="14" height="8" rx="2" fill="#3b82f6"
              />
            </g>

            {/* Northbound / Southbound Vehicles */}
            <g>
              <motion.rect
                animate={{ y: [0, 520] }}
                transition={{ duration: 13, repeat: Infinity, ease: 'linear', delay: 2 }}
                x="380" width="10" height="18" rx="2" fill="#10b981"
              />
              <motion.rect
                animate={{ y: [520, 0] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'linear', delay: 5 }}
                x="408" width="10" height="18" rx="2" fill="#f97316"
              />
            </g>

            {/* Emergency Vehicle Animation (when emergency active) */}
            {isEmergencyActive && (
              <motion.g
                animate={{ x: [50, 370] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              >
                <rect x="0" y="272" width="24" height="16" rx="3" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="12" cy="280" r="4" fill="#3b82f6" className="animate-ping" />
              </motion.g>
            )}

            {/* TRAFFIC SIGNALS & SELECTABLE JUNCTIONS NODES */}
            {junctions.map((j) => {
              const isSelected = j.id === selectedJunctionId;
              const isEmergencyTarget = isEmergencyActive && j.id === 'j4';
              const densityMeta = getDensityColor(j.density);

              return (
                <g 
                  key={j.id} 
                  transform={`translate(${j.mapX}, ${j.mapY})`}
                  className="cursor-pointer group"
                  onClick={() => selectJunction(j.id)}
                >
                  {/* Outer Pulsing Glow Circle */}
                  <circle 
                    r={isSelected ? "32" : "24"} 
                    fill={isEmergencyTarget ? "rgba(239, 68, 68, 0.4)" : densityMeta.hex}
                    opacity={isSelected ? "0.3" : "0.15"} 
                    className={isSelected || isEmergencyTarget ? "animate-ping" : ""}
                  />

                  {/* Junction Node Base Circle */}
                  <circle 
                    r={isSelected ? "22" : "18"} 
                    fill="#0f172a" 
                    stroke={isEmergencyTarget ? "#ef4444" : isSelected ? "#3b82f6" : densityMeta.hex} 
                    strokeWidth={isSelected ? "3.5" : "2"}
                    filter={isSelected ? "url(#glow)" : undefined}
                  />

                  {/* Signal Light Indicator (Red or Green dot inside) */}
                  <circle 
                    r="6" 
                    fill={isEmergencyTarget ? "#ef4444" : j.density > 80 ? "#ef4444" : "#10b981"} 
                  />

                  {/* Junction Label Box */}
                  <rect 
                    x="-48" 
                    y={isSelected ? "26" : "22"} 
                    width="96" 
                    height="24" 
                    rx="6" 
                    fill="#0b0f19" 
                    stroke={isSelected ? "#3b82f6" : "#1e293b"} 
                    strokeWidth="1.5"
                  />
                  <text 
                    x="0" 
                    y={isSelected ? "42" : "38"} 
                    fill={isSelected ? "#60a5fa" : "#f1f5f9"} 
                    fontSize="10" 
                    fontWeight="bold" 
                    textAnchor="middle"
                  >
                    {j.code} ({j.density}%)
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend Box Overlay */}
        <div className="absolute bottom-3 left-3 p-2.5 rounded-xl bg-[#0d1322]/90 border border-[#1a2436] backdrop-blur-md text-[11px] select-none shadow-lg">
          <div className="font-bold text-slate-300 mb-1.5 text-[10px] uppercase tracking-wider">Density Legend</div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-300">Low (0-30%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-slate-300">Mod (31-60%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <span className="text-slate-300">High (61-80%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="text-slate-300">Very High (81-100%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
