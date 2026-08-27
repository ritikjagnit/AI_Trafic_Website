import React from 'react';
import { useTraffic } from '../context/TrafficContext';
import { 
  Activity, 
  Cpu, 
  Car, 
  AlertTriangle, 
  Fuel, 
  Leaf, 
  Zap 
} from 'lucide-react';
import { KpiCard } from '../components/dashboard/KpiCard';
import { TrafficMap } from '../components/map/TrafficMap';
import { SignalControlPanel } from '../components/dashboard/SignalControlPanel';
import { TrafficAnalyticsSection } from '../components/dashboard/TrafficAnalyticsSection';
import { TopCongestedJunctions } from '../components/dashboard/TopCongestedJunctions';
import { EmergencyBanner } from '../components/emergency/EmergencyBanner';

export const Dashboard = () => {
  const { kpis } = useTraffic();

  return (
    <div className="space-y-6 pb-8">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-wider text-slate-100 uppercase">
            Traffic Overview
          </h1>
          <p className="text-xs text-slate-400">
            Real-time Sakoli Municipal Operations Control Command Center
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-[#0d1322] px-3 py-1.5 rounded-lg border border-[#1a2436]">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Status: <strong>System Nominal</strong></span>
        </div>
      </div>

      {/* Emergency Active Alert Banner */}
      <EmergencyBanner />

      {/* 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard
          title="Average Traffic Flow"
          value={`${kpis.avgFlow}%`}
          subtext="Moderate"
          icon={Activity}
          color="blue"
        />
        <KpiCard
          title="Active Signals"
          value={kpis.activeSignals}
          subtext="Online"
          icon={Cpu}
          color="emerald"
        />
        <KpiCard
          title="Total Vehicles"
          value={kpis.totalVehicles.toLocaleString()}
          subtext="Live Count"
          icon={Car}
          color="cyan"
        />
        <KpiCard
          title="Incidents"
          value={`0${kpis.incidentsCount}`}
          subtext="Active"
          icon={AlertTriangle}
          color="rose"
        />
        <KpiCard
          title="Fuel Saved"
          value={`${kpis.fuelSaved} L`}
          subtext="Today"
          icon={Fuel}
          color="amber"
        />
        <KpiCard
          title="Emission Reduced"
          value={`${kpis.emissionReduced} kg`}
          subtext="Today"
          icon={Leaf}
          color="purple"
        />
      </div>

      {/* Main Section: Interactive Live Traffic Map (2 cols) & AI Signal Control Panel (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrafficMap />
        </div>
        <div className="lg:col-span-1">
          <SignalControlPanel />
        </div>
      </div>

      {/* Analytics Section & Top Congested List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrafficAnalyticsSection />
        </div>
        <div className="lg:col-span-1">
          <TopCongestedJunctions />
        </div>
      </div>
    </div>
  );
};
