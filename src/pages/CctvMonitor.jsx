import React, { useState, useEffect, useRef } from 'react';
import { useTraffic } from '../context/TrafficContext';
import { Video, Maximize2, Radio, Eye, Camera, ShieldCheck, X } from 'lucide-react';

// Canvas-based dynamic CCTV road feed rendering component
const CctvCanvasFeed = ({ camera, isModal = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let cars = [
      { x: 30, y: 120, speed: 2, color: '#3b82f6', width: 35, height: 18, label: 'Car #104' },
      { x: 180, y: 120, speed: 1.5, color: '#10b981', width: 45, height: 20, label: 'Bus #02' },
      { x: 320, y: 120, speed: 2.2, color: '#f59e0b', width: 30, height: 16, label: 'Bike #88' },
      { x: 280, y: 70, speed: -1.8, color: '#8b5cf6', width: 35, height: 18, label: 'Car #212' },
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark asphalt road background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Perspective Road Lanes
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 50, canvas.width, 100);

      // Lane Divider Dashes
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([12, 8]);
      ctx.beginPath();
      ctx.moveTo(0, 100);
      ctx.lineTo(canvas.width, 100);
      ctx.stroke();

      // Sidewalk / Buildings Background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, 50);
      ctx.fillRect(0, 150, canvas.width, canvas.height - 150);

      // Render Cars with AI Bounding Boxes
      cars.forEach(car => {
        car.x += car.speed;
        if (car.x > canvas.width + 50) car.x = -60;
        if (car.x < -60) car.x = canvas.width + 50;

        // Vehicle body
        ctx.fillStyle = car.color;
        ctx.fillRect(car.x, car.y, car.width, car.height);

        // AI Computer Vision Bounding Box Overlay
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
        ctx.strokeRect(car.x - 4, car.y - 4, car.width + 8, car.height + 8);

        // Vehicle Detection Label Badge
        ctx.fillStyle = '#22c55e';
        ctx.font = '9px monospace';
        ctx.fillText(`${car.label}`, car.x - 4, car.y - 8);
      });

      // OSD Camera Metadata Header
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(10, 10, 220, 24);
      ctx.fillStyle = '#22c55e';
      ctx.font = '10px monospace';
      ctx.fillText(`[REC] ${camera.id} • ${camera.fps} FPS • LIVE`, 18, 26);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [camera]);

  return (
    <canvas 
      ref={canvasRef} 
      width={isModal ? 640 : 400} 
      height={isModal ? 320 : 200} 
      className="w-full h-full object-cover rounded-lg border border-[#1e293b]"
    />
  );
};

export const CctvMonitor = () => {
  const { cctvCameras } = useTraffic();
  const [activeModalCamera, setActiveModalCamera] = useState(null);

  return (
    <div className="space-y-6 pb-8 select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-wider text-slate-100 uppercase">
            CCTV Optical Surveillance Monitor
          </h1>
          <p className="text-xs text-slate-400">
            Automated Computer Vision & Vehicle Detection Grid (Sakoli Municipal Feeds)
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Radio className="w-4 h-4 animate-pulse" />
          4 / 4 Feeds Online
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cctvCameras.map(cam => (
          <div key={cam.id} className="command-card p-4 rounded-2xl border border-[#1f293d] flex flex-col justify-between">
            {/* Top Info */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1f293d] mb-3">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-400" />
                <div>
                  <span className="text-xs font-bold text-slate-200">{cam.name}</span>
                  <p className="text-[10px] text-slate-400">{cam.location}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ● {cam.status}
              </span>
            </div>

            {/* Video Feed Canvas */}
            <div className="relative group cursor-pointer" onClick={() => setActiveModalCamera(cam)}>
              <CctvCanvasFeed camera={cam} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                <span className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-2">
                  <Maximize2 className="w-4 h-4" /> Expand Feed
                </span>
              </div>
            </div>

            {/* Camera Metrics */}
            <div className="grid grid-cols-3 gap-2 text-[11px] mt-3 pt-3 border-t border-[#1f293d]">
              <div>
                <span className="text-slate-400 text-[9px] uppercase">State</span>
                <p className="font-bold text-slate-200">{cam.trafficState}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] uppercase">AI Vehicles</span>
                <p className="font-bold text-blue-400 font-mono">{cam.vehiclesDetected} detected</p>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] uppercase">Avg Speed</span>
                <p className="font-bold text-emerald-400 font-mono">{cam.speedAvg}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enlarged Monitoring Modal */}
      {activeModalCamera && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="command-card w-full max-w-3xl rounded-2xl border border-[#1f293d] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#1f293d] mb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider">
                    {activeModalCamera.name} High-Resolution Analysis
                  </h3>
                  <p className="text-xs text-slate-400">{activeModalCamera.location}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModalCamera(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1f293d]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-80 w-full mb-4">
              <CctvCanvasFeed camera={activeModalCamera} isModal={true} />
            </div>

            <div className="grid grid-cols-4 gap-3 text-xs bg-[#080c14] p-3 rounded-xl border border-[#1e293b]">
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Status</span>
                <p className="font-bold text-emerald-400">● LIVE BROADCAST</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Telemetry FPS</span>
                <p className="font-bold text-slate-200 font-mono">{activeModalCamera.fps} FPS</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Active Vehicles</span>
                <p className="font-bold text-blue-400 font-mono">{activeModalCamera.vehiclesDetected}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase">License AI</span>
                <p className="font-bold text-purple-400">ANPR Enabled</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
