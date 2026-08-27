import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { hourlyTrafficData, trafficDensityDistribution } from '../../data/mockData';
import { BarChart3, PieChart as PieIcon, TrendingUp } from 'lucide-react';

export const TrafficAnalyticsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
      {/* Line Chart: Today vs Yesterday Traffic Flow */}
      <div className="lg:col-span-2 command-card p-5 rounded-2xl border border-[#1f293d] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Traffic Flow Analytics
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Today
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 rounded-full bg-slate-600"></span>
              Yesterday
            </span>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyTrafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit="%" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0d1322',
                  borderColor: '#1e293b',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  fontSize: '12px',
                  color: '#e2e8f0'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="today" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#3b82f6' }}
                activeDot={{ r: 7, fill: '#60a5fa' }} 
              />
              <Line 
                type="monotone" 
                dataKey="yesterday" 
                stroke="#475569" 
                strokeWidth={2} 
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart: Traffic Density Distribution */}
      <div className="command-card p-5 rounded-2xl border border-[#1f293d] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Traffic Density
            </h3>
          </div>
          <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
            72% Moderate
          </span>
        </div>

        <div className="h-44 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={trafficDensityDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {trafficDensityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#0d1322" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0d1322',
                  borderColor: '#1e293b',
                  borderRadius: '10px',
                  fontSize: '11px',
                  color: '#e2e8f0'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-extrabold text-slate-100 font-mono">72%</span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Avg Density</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-[#1f293d]">
          {trafficDensityDistribution.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-1.5 rounded bg-[#080c14] border border-[#1e293b]">
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-300 truncate">{item.name.split(' ')[0]}</span>
              </div>
              <span className="font-bold font-mono text-slate-200">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
